"use client";

import Link from "next/link";

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registerUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { name, email, password } = data;
    const response = await registerUser(name, email, password);

    console.log(response);

    if (!response.ok) {
      setErrorMessage(response.message ?? "");
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="flex flex-col">
        Full Name
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
            "border-red-500": !!errors.name,
          })}
          type="text"
          autoFocus
          {...register("name", { required: true })}
        />
        {errors.name?.type === "required" && (
          <em className="text-red-500 text-xs">* Name is required</em>
        )}
      </label>

      <label className="flex flex-col">
        Email
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
            "border-red-500": !!errors.email,
          })}
          type="email"
          {...register("email", {
            required: true,
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          })}
        />
        {errors.email?.type === "required" && (
          <em className="text-red-500 text-xs">* Email is required</em>
        )}
        {errors.email?.type === "pattern" && (
          <em className="text-red-500 text-xs">* Invalid email</em>
        )}
      </label>

      <label className="flex flex-col">
        Password
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
            "border-red-500": !!errors.password,
          })}
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && (
          <em className="text-red-500 text-xs">* Password is required</em>
        )}
        {errors.password?.type === "minLength" && (
          <em className="text-red-500 text-xs">
            * Password must contain at least 6 characters
          </em>
        )}
      </label>

      {errorMessage && <em className="text-red-500 text-xs">{errorMessage}</em>}

      <button className="btn-primary">Create</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Sign in
      </Link>
    </form>
  );
};
