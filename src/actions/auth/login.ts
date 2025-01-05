"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if (error instanceof AuthError && error.type) return error.type as string;
    return "UnknownError";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "Authentication has failed!",
    };
    console.log(error);
  }
};
