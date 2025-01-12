"use client";

import { useEffect, useState } from "react";

import { useAddressStore, useCartStore } from "@/store";

import { formatPrice } from "@/utils";
import clsx from "clsx";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderErrorMessage, setOrderErrorMessage] = useState("");

  const router = useRouter();

  const address = useAddressStore((state) => state.address);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setOrderErrorMessage("");
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const response = await placeOrder(productsToOrder, address);

    if (!response.ok) {
      setIsPlacingOrder(false);
      setOrderErrorMessage(response.message);
      return;
    }

    clearCart();
    router.replace("/orders/" + response.order?.id);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="rounded w-full h-0.5 bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order Summary</h2>

      <div className="grid grid-cols-2 mb-5">
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

      <p className="mb-5">
        <span className="text-xs">
          By clicking in &quot;Place order&quot;, you agree to our{" "}
          <a href="" className="underline">
            terms and conditions
          </a>{" "}
          and{" "}
          <a href="" className="underline">
            privacy policy
          </a>
        </span>
      </p>

      <button
        onClick={onPlaceOrder}
        className={clsx("w-full mb-2", {
          "btn-primary": !isPlacingOrder,
          "btn-disabled": isPlacingOrder,
        })}
      >
        Place order
      </button>

      {orderErrorMessage && (
        <section className="text-red-500 text-xs text-center">
          <p>There was an error creating you order!</p>
          <p>{orderErrorMessage}</p>
        </section>
      )}
    </div>
  );
};
