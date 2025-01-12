"use server";

import { auth } from "@/auth.config";

import prisma from "@/lib/prisma";

import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verify user session
  if (!userId) {
    return {
      ok: false,
      message: "User not authenticated!",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calculate price
  const itemsInOrder = productIds.reduce((qty, p) => qty + p.quantity, 0);

  // Tax | Subtotal | Total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} doesn't exist - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Update products stock
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} doesn't have quantity defined`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verify products out of stock
      updatedProducts.forEach((product) => {
        if (product.inStock <= 0) {
          throw new Error(`${product.title} out of stock`);
        }
      });

      // 2. Create the header order and details
      const order = await tx.order.create({
        data: {
          tax,
          total,
          userId,
          itemsInOrder,
          subTotal,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Create address order
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          orderId: order.id,
          countryId: country,
        },
      });

      return {
        order,
        updatedProducts: [],
        orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    };
  } catch (error) {
    const err = error as { message: string };
    return {
      ok: false,
      message: err?.message,
    };
  }
};
