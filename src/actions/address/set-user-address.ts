"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      address: "It couldn't save the user address!",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const { country, ...restAddress } = address;

    const addressToSave = {
      ...restAddress,
      countryId: country,
      userId,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updateAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return updateAddress;
  } catch (error) {
    console.log(error);
    throw new Error("It couldn't save the user address!");
  }
};
