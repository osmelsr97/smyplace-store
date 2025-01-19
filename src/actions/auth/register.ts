"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

const isSandboxMode = process.env.SANDBOX_MODE === "true";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  sandboxMode = isSandboxMode
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password),
        sandboxMode,
      },
      select: {
        id: true,
        name: true,
        email: true,
        sandboxMode: true,
      },
    });

    return {
      ok: true,
      user,
    };
  } catch (error) {
    return {
      ok: false,
      message: "The creation process failed, try again later!",
    };
    console.log(error);
  }
};
