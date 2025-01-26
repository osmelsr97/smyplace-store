"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { formatPrice } from "@/utils";
import { useCartStore } from "@/store";

import { ProductImage, QuantitySelector } from "@/components";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);
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
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded object-cover"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.size} {product.title}
            </Link>
            <p>{formatPrice(product.price)}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              onClick={() => removeProduct(product)}
              className="underline mt-3"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
