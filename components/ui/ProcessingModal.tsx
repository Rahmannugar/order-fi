"use client";

import { useEffect, useState } from "react";
import { Order } from "@/lib/types/order";
import { useOrderPolling } from "@/lib/hooks/useGetOrderStatus";
import { useOrderStore } from "@/lib/stores/orderStore";

interface ProcessingModalProps {
  order: Order | null;
  onClose: () => void;
}

const ProcessingModal = ({ order, onClose }: ProcessingModalProps) => {
  const { data: polledOrder } = useOrderPolling(order?.order_id || null);
  const { updateOrder } = useOrderStore();
  const [showReceipt, setShowReceipt] = useState(false);

  // Handle order status updates and finalization
  useEffect(() => {
    if (polledOrder && order) {
      updateOrder(order.order_id, { status: polledOrder.status });

      if (polledOrder.status === "settled" || polledOrder.status === "failed") {
        setShowReceipt(true);
        const timer = setTimeout(onClose, 3000); // Show receipt for 3 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [polledOrder, order, updateOrder, onClose]);

  if (!order) return null;

  const currentStatus = polledOrder?.status || order.status;
  const isFinalized = currentStatus === "settled" || currentStatus === "failed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-lg">
        {showReceipt ? (
          // Receipt card
          <div className="space-y-4">
            <div className="text-center">
              {currentStatus === "settled" ? (
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 p-2">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="mx-auto h-12 w-12 rounded-full bg-red-100 p-2">
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
              <h3 className="mt-2 text-lg font-medium">
                Order {currentStatus === "settled" ? "Complete" : "Failed"}
              </h3>
            </div>

            <div className="rounded-md bg-gray-50 p-4">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Order ID</dt>
                  <dd className="font-medium">{order.order_id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Amount</dt>
                  <dd className="font-medium">
                    {order.amount} {order.currency}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Token</dt>
                  <dd className="font-medium">{order.token}</dd>
                </div>
                {order.note && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Note</dt>
                    <dd className="font-medium">{order.note}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        ) : (
          // Processing view
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">Processing Order</h3>
              <p className="mt-1 text-sm text-gray-500">
                Please wait while we process your order...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingModal;
