import { redirect } from "next/navigation";

import { getCategories, getProductBySlug } from "@/actions";

import { ProductForm } from "./ui/ProductForm";
import { Title } from "@/components/ui/title/title";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, { categories }] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "New Product" : "Edit Product";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
