"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChange = (value: number) => {
    setCount((prevState) => Math.max(1, prevState + value));
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onQuantityChange(-1)} aria-label="Remove item">
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {count}
      </span>
      <button onClick={() => onQuantityChange(+1)} aria-label="Add item">
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
