"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount.toString(),
            currency_code: "USD",
          },
        },
      ],
      intent: "CAPTURE",
    });

    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("Error setting transaction id");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) {
      throw new Error("Error capturing order");
    }

    await paypalCheckPayment(details.id!);
  };

  if (isPending) {
    return (
      <div className="animate-pulse mb-9">
        <div className="w-full h-11 bg-gray-300 rounded-md" />
        <div className="w-full h-11 bg-gray-300 rounded-md mt-4" />
      </div>
    );
  }

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
