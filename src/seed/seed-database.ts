import prisma from "../lib/prisma";

import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function optimizedSeed() {
  const { products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.country.createMany({
    data: countries,
  });

  for (const product of products) {
    const { images, type: categoryName, ...restProduct } = product;

    await prisma.product.create({
      data: {
        ...restProduct,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
        ProductImage: {
          createMany: {
            data: images.map((url) => ({ url })),
          },
        },
      },
    });
  }
}

async function main() {
  /* Clean all records */

  // Delete everything related to user order
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  // Delete everything related to the personal information of the user
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  // Delete everything related to products
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  /*  Seed DataBase */
  await optimizedSeed();

  console.log("✅ Seed executed successfully!");
}

(() => {
  main();
})();
