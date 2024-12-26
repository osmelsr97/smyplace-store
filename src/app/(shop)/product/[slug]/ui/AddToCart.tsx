"use client";
import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { CartProduct } from "../../../../../interfaces/product.interface";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const { addProductToCart } = useCartStore();

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      quantity,
      size,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500">You must select a size*</span>
      )}
      {/* Sizer selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeSelected={setSize}
      />
      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      {/* Add Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};
