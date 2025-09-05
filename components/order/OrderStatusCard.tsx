"use client";

import { useGetOrderStatus } from "@/lib/hooks/useGetOrderStatus";
import { useOrderStore } from "@/lib/stores/orderStore";

const OrderStatusCard = () => {
  const { order, reset, finalized } = useOrderStore();
  const { isPolling } = useGetOrderStatus();

  if (!order) return null;

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Order Status</h2>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Order ID:</span> {order.order_id}
        </p>
        <p>
          <span className="font-medium">Amount:</span> {order.amount}{" "}
          {order.currency}
        </p>
        <p>
          <span className="font-medium">Token:</span> {order.token}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={
              order.status === "settled"
                ? "text-green-600"
                : order.status === "failed"
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {order.status}
          </span>
        </p>
      </div>

      {isPolling && !finalized && (
        <p className="text-sm text-gray-500">Polling status...</p>
      )}

      {finalized && (
        <button
          onClick={reset}
          className="mt-4 w-full rounded-md bg-gray-200 py-2 text-gray-800 hover:bg-gray-300"
        >
          Create New Order
        </button>
      )}
    </div>
  );
};

export default OrderStatusCard;
