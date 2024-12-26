import clsx from "clsx";
import type { Size } from "@/interfaces";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeSelected: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeSelected,
}: Props) => {
  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">Available Sizes</h2>

      <ul className="flex">
        {availableSizes.map((size) => (
          <li key={size}>
            <button
              onClick={() => onSizeSelected(size)}
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
