export const revalidate = 120;

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;
  const pageNumber = parseInt(page ?? 1);

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: pageNumber,
    filter: { gender },
  });

  const labels: Record<string, string> = {
    men: "men's items",
    women: "women's items",
    kid: "kids' items",
    unisex: "All items",
  };

  return (
    <div>
      <Title title={labels[gender]} subtitle="All Products" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
