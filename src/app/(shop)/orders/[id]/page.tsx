import Image from "next/image";
import { redirect } from "next/navigation";

import { formatPrice } from "@/utils";

import { getOrderById } from "@/actions";

import { OrderStatus, PayPalButton, Title } from "@/components";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-", 1).toString()}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div key={item.product.slug} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5 rounded object-cover"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {formatPrice(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>
            <div className="rounded w-full h-0.5 bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2 mb-5">
              <span>N. Products</span>
              <span className="text-right">
                {order!.itemsInOrder === 1
                  ? "1 product"
                  : `${order!.itemsInOrder} products`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{formatPrice(order!.subTotal)}</span>

              <span>Taxes (15%)</span>
              <span className="text-right ">{formatPrice(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {formatPrice(order!.total)}
              </span>
            </div>

            {!order?.isPaid ? (
              <PayPalButton amount={order!.total} orderId={order!.id} />
            ) : (
              <OrderStatus isPaid={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
