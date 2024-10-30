"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const productBySlug = await prisma.product.findFirst({
      where: { slug },
      include: {
        ProductImage: true,
      },
    });

    if (!productBySlug) {
      return null;
    }

    const { ProductImage, ...restProduct } = productBySlug;

    return {
      ...restProduct,
      images: ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Could not load the product requested!");
  }
};
