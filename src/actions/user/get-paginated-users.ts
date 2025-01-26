import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "You are not authorized to access this page" };
  }

  const users = await prisma.user.findMany();

  return { ok: true, users };
};
