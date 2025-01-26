import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: React.HTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
}

export const ProductImage = ({ src, alt, ...imgProps }: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return <Image {...imgProps} src={localSrc} alt={alt} />;
};
