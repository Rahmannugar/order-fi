"use client";

import { useEffect, useState, useCallback } from "react";
import { Order } from "@/lib/types/order";
import { useOrderPolling } from "@/lib/hooks/useGetOrderStatus";
import { useOrderStore } from "@/lib/stores/orderStore";

interface ProcessingModalProps {
  order: Order | null;
  onClose: () => void;
  onRetry?: () => void;
}

const ProcessingModal = ({ order, onClose, onRetry }: ProcessingModalProps) => {
  const { data: polledOrder, isError } = useOrderPolling(
    order?.order_id || null
  );
  const { updateOrder } = useOrderStore();
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  // Handle errors by showing timeout screen
  useEffect(() => {
    if (isError && order && !isTimedOut) {
      updateOrder(order.order_id, { status: "failed" });
      setIsTimedOut(true);
    }
  }, [isError, order, updateOrder, isTimedOut]);

  // Reset states when order changes
  useEffect(() => {
    if (order) {
      setIsTimedOut(false);
      setShowReceipt(false);
    }
  }, [order?.order_id]);

  // Handle timeout
  useEffect(() => {
    if (!order || showReceipt || isTimedOut) return;

    const timeoutId = setTimeout(() => {
      if (order) {
        updateOrder(order.order_id, { status: "failed" });
        setIsTimedOut(true);
      }
    }, 60000);

    return () => clearTimeout(timeoutId);
  }, [order, showReceipt, isTimedOut, updateOrder]);

  // Handle order updates
  useEffect(() => {
    if (polledOrder && order && !showReceipt && !isTimedOut) {
      // Only update if not already in final state
      const currentOrder = order;
      if (
        currentOrder.status !== "settled" &&
        currentOrder.status !== "failed"
      ) {
        updateOrder(order.order_id, { status: polledOrder.status });
      }

      if (polledOrder.status === "settled" || polledOrder.status === "failed") {
        setShowReceipt(true);
        setTimeout(onClose, 3000);
      }
    }
  }, [polledOrder, order, updateOrder, onClose, showReceipt, isTimedOut]);

  // Handle retry with timeout reset
  const handleRetry = useCallback(() => {
    if (onRetry) {
      setIsTimedOut(false);
      onRetry();
    }
  }, [onRetry]);

  if (!order) return null;

  const currentStatus = polledOrder?.status || order.status;

  // Show timeout screen
  if (isTimedOut) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-yellow-100 p-2">
              <svg
                className="h-8 w-8 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium">Timed out – try again</h3>
            <p className="mt-1 text-sm text-gray-500">
              The order took too long to process.
            </p>
            <div className="mt-4 space-x-3">
              <button
                onClick={handleRetry}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Retry
              </button>
              <button
                onClick={onClose}
                className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!showReceipt && !isTimedOut) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-lg">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium">Loading Order Status...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-lg">
        {showReceipt ? (
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