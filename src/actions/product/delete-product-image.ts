"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("https")) {
    return { ok: false, message: "Only images from cloudinary can be deleted" };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);

    return { ok: true, message: "Image deleted" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error deleting image" };
  }
};
