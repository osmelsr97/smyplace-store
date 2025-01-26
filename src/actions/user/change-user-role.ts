"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "You are not authorized to access this page" };
  }

  const newRole = role === "admin" ? "admin" : "user";

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    if (!user) {
      return { ok: false, message: "Cannot find user" };
    }

    revalidatePath("/admin/users");

    return { ok: true, message: "User role changed successfully" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Cannot change user role" };
  }
};
