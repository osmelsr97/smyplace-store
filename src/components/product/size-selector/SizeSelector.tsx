import clsx from "clsx";
import type { Size } from "@/interfaces";

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">Available Sizes</h2>

      <ul className="flex">
        {availableSizes.map((size) => (
          <li key={size}>
            <button
              className={clsx("mx-2 hover:underline text-lg", {
                underline: size === selectedSize,
              })}
            >
              {size}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
