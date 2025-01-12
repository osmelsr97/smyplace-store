import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react";

import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const InputText = forwardRef(
  (
    { error, label, type, ...inputProps }: Props,
    ref: LegacyRef<HTMLInputElement>
  ) => (
    <label className="flex flex-col">
      {label}
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
          "border-red-500": !!error,
        })}
        type={type}
        ref={ref}
        {...inputProps}
      />

      {/* TODO: Update the errors handle */}
      {error === "required" && (
        <em className="text-red-500 text-xs">* {label} is required</em>
      )}
      {error === "pattern" ||
        (error === "minLength" && (
          <em className="text-red-500 text-xs">Invalid {label}</em>
        ))}
    </label>
  )
);

InputText.displayName = "InputText";
