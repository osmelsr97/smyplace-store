"use server";

import prisma from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return { ok: true, categories };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Error fetching categories", categories: [] };
  }
};
