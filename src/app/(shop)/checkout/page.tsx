import Link from "next/link";
import Image from "next/image";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { formatPrice } from "@/utils";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Cart items</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded object-cover"
                />

                <div>
                  <p>{product.title}</p>
                  <p>
                    {formatPrice(product.price)} x {3}
                  </p>
                  <p className="font-bold">
                    Subtotal: {formatPrice(product.price * 3)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">John Doe</p>
              <p>18570 Bishop St</p>
              <p>Mount Vernon</p>
              <p>Alabama (AL)</p>
              <p>Zip 35072</p>
              <p> (251) 268-8057</p>
            </div>

            <div className="rounded w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2 mb-5">
              <span>N. Products</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">{formatPrice(100)}</span>

              <span>Taxes (15%)</span>
              <span className="text-right ">{formatPrice(100)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {formatPrice(100)}
              </span>
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

            <div className="mt-5 mb-2 w-full">
              <Link
                href="/orders/123"
                className="flex btn-primary justify-center"
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
