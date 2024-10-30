import Image from "next/image";
import { Product } from "@/interfaces";
import Link from "next/link";
import { formatPrice } from "@/utils";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow fade-in group">
      {product.images.map((image, key) => (
        <Image
          key={image}
          src={`/products/${image}`}
          alt={product.title}
          className={`${
            key === 1 ? "hidden group-hover:block" : "group-hover:hidden"
          } w-full object-cover  rounded`}
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
