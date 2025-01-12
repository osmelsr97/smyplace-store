import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { formatPrice } from "@/utils";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  const { ok, order, message } = await getOrderById(id);

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
            <div
              className={clsx(
                "flex items-center rounded-lg px-2 py-3.5 text-white mb-5",
                {
                  "bg-red-500": !order?.isPaid,
                  "bg-green-700": order?.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">
                {order?.isPaid ? "Paid" : "Pending Payment"}
              </span>
            </div>

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

            <div
              className={clsx(
                "flex items-center rounded-lg px-2 py-3.5 text-white mb-5",
                {
                  "bg-red-500": !order?.isPaid,
                  "bg-green-700": order?.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">
                {order?.isPaid ? "Paid" : "Pending Payment"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
