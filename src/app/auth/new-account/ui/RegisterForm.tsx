"use client";

import { useState } from "react";

import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";

import { login, registerUser } from "@/actions";

import { InputText } from "@/components";

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

    if (!response.ok) {
      setErrorMessage(response.message ?? "");
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <InputText
        {...register("name", { required: true })}
        label="Full Name"
        error={errors.name?.type}
        autoFocus
      />
      <InputText
        {...register("email", {
          required: true,
          pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        })}
        label="Email"
        type="email"
        error={errors.email?.type}
        autoFocus
      />
      <InputText
        {...register("password", { required: true, minLength: 6 })}
        label="Password"
        type="password"
        error={errors.password?.type}
        autoFocus
      />

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
