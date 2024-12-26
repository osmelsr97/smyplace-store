"use client";

import { useEffect, useState } from "react";

import { formatPrice } from "@/utils/currency";
import { useCartStore } from "@/store";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>N. Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 product" : `${itemsInCart} products`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{formatPrice(subTotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right ">{formatPrice(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{formatPrice(total)}</span>
    </div>
  );
};
