"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  filter?: Record<string, string>;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  filter = {},
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // Get Products
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      where: { ...filter },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // Get total pages
    const totalCount = await prisma.product.count({ where: { ...filter } });
    const totalPages = Math.ceil(totalCount / take);

    return {
      totalPages,
      currentPage: page,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error("The products could not be loaded");
  }
};
