"use server";

import prisma from "@/lib/prisma";
import { PaypalOrderStatusResponse } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const accessToken = await getPaypalAccessToken();

  if (!accessToken) {
    return {
      ok: false,
      message: "Error getting paypal access token",
    };
  }

  const paypalOrder = await verifyPaypalPayment(
    paypalTransactionId,
    accessToken
  );

  if (!paypalOrder) {
    return {
      ok: false,
      message: "Error verifying paypal payment",
    };
  }

  const { status, purchase_units } = paypalOrder;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Payment not completed",
    };
  }

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error updating order status",
    };
  }
};

const getPaypalAccessToken = async (): Promise<string | null> => {
  const session = await auth();

  const isSandboxMode = session?.user?.sandboxMode;

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauthUrl =
    (isSandboxMode
      ? process.env.PAYPAL_OAUTH_URL_SANDBOX
      : process.env.PAYPAL_OAUTH_URL_PRODUCTION) || "";

  const base64ClientId = Buffer.from(
    PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64ClientId}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(oauthUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());

    return response.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  accessToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const session = await auth();

  const isSandboxMode = session?.user?.sandboxMode;

  const paypalOrderUrl =
    `${
      isSandboxMode
        ? process.env.PAYPAL_ORDERS_URL_SANDBOX
        : process.env.PAYPAL_ORDERS_URL_PRODUCTION
    }/${paypalTransactionId}` || "";

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
