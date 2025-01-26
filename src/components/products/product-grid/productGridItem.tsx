import Link from "next/link";

import { ProductImage } from "@/components";
import { Product } from "@/interfaces";
import { formatPrice } from "@/utils";
import clsx from "clsx";
interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow fade-in group">
      {product.images.map((image, key) => (
        <ProductImage
          key={image}
          src={image}
          alt={product.title}
          className={clsx(
            product.images.length > 1
              ? {
                  "hidden group-hover:block": key === 1,
                  "group-hover:hidden": key !== 1,
                }
              : {},
            "w-full object-cover rounded"
          )}
          width={500}
          height={500}
        />
      ))}

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">{formatPrice(product.price)}</span>
      </div>
    </div>
  );
};
