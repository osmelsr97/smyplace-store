"use client";

import { useForm } from "react-hook-form";
import clsx from "clsx";

import { createUpdateProduct, deleteProductImage } from "@/actions/product";

import type {
  ProductCategory,
  Product,
  Size,
  ProductImage as IProductImage,
} from "@/interfaces";

import { ProductImage } from "@/components";
import { useRouter } from "next/navigation";

interface Props {
  product: Partial<Product> & { ProductImage?: IProductImage[] };
  categories: ProductCategory[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  sizes: string[];
  inStock: number;
  images: FileList;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const { register, handleSubmit, getValues, setValue, watch } =
    useForm<FormInputs>({
      defaultValues: {
        ...product,
        tags: product.tags?.join(","),
        sizes: product.sizes || [],
        images: undefined,
      },
    });

  watch("sizes");

  const onSizeChange = (size: Size) => {
    const sizes = new Set(getValues("sizes"));
    if (sizes.has(size)) {
      sizes.delete(size);
    } else sizes.add(size);

    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    console.log(data);

    const { images, ...productToSave } = data;

    const formData = new FormData();
    if (product.id) {
      formData.append("id", product.id);
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("tags", productToSave.tags);
    formData.append("gender", productToSave.gender);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("inStock", productToSave.inStock.toString());

    if (images) {
      for (const image of images) {
        formData.append("images", image);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      //   router.push(`/admin/product/${productToSave.slug}`);
      return;
    }

    console.log(updatedProduct);

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            {...register("title", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            {...register("slug", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            {...register("description", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            {...register("price", { required: true, min: 0 })}
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            {...register("tags", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            {...register("gender", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            {...register("categoryId", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Save</button>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            {...register("inStock", { required: true, min: 0 })}
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => onSizeChange(size as Size)}
                className={clsx(
                  "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center hover:scale-105",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(
                      size as Size
                    ),
                  }
                )}
              >
                <span>{size}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Photos</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  src={image.url}
                  alt={product.title ?? "unnamed_product"}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger rounded-b-xl w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
