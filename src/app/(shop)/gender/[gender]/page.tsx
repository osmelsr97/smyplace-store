import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { capitalizeFirstLetter } from "@/utils";

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const gender = (await params).gender;
  return {
    title: capitalizeFirstLetter(gender),
    description: `The best selected products only for ${gender}.`,
  };
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
