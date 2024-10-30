/* 
 TODO: Review, why this not work?
 https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate)
*/
export const revalidate = 60;

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Store" subtitle="All products" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
