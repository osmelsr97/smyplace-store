"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;

  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onValueChange = (value: number) => {
    onQuantityChange(Math.max(1, quantity + value));
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onValueChange(-1)} aria-label="Remove item">
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onValueChange(+1)} aria-label="Add item">
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
