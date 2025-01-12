"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import { formatPrice } from "@/utils";
import { useCartStore } from "@/store";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Items */}
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded object-cover"
          />

          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">
              {formatPrice(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
