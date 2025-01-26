"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
// import { v2 as cloudinary } from "cloudinary";
import { Gender, Product, Size } from "@prisma/client";

import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().min(3),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...restProduct } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let productToSave: Product;
      const tagsArray = restProduct.tags.split(",");

      if (id) {
        // update
        productToSave = await tx.product.update({
          where: { id },
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // create

        productToSave = await tx.product.create({
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("Error uploading images");
        }

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: productToSave.id,
          })),
        });
      }

      return {
        product: productToSave,
      };
    });

    // Revalidate paths
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);
    revalidatePath(`/admin/products`);

    return { ok: true, product: prismaTx.product };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error creating/updating product" };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((result) => {
            return result.secure_url;
          });
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);

    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};
