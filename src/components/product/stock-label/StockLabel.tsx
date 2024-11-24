"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useCallback, useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  return (
    <>
      {!isLoading ? (
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          Stock: {stock}
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} antialiased font-bold text-xl bg-gray-200 animate-pulse rounded-md`}
        >
          &nbsp;
        </h1>
      )}
    </>
  );
};
