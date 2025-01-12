"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
      message: "User address deleted successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "It couldn't remove the user address",
    };
  }
};
