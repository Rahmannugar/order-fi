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
      const currentStatus = polledOrder.status;

      updateOrder(order.order_id, { status: currentStatus });

      if (currentStatus === "settled" || currentStatus === "failed") {
        setShowReceipt(true);
        setTimeout(onClose, 3000);
      }
    }
  }, [polledOrder, order, updateOrder, onClose, showReceipt, isTimedOut]);

  // Handle retry
  const handleRetry = useCallback(() => {
    if (onRetry) {
      setIsTimedOut(false);
      onRetry();
    }
  }, [onRetry]);

  const getStepStatus = (
    currentStatus: Order["status"],
    step: "created" | "processing" | "settled"
  ) => {
    const statusOrder = ["created", "processing", "settled", "failed"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(step);

    if (currentStatus === "failed") {
      return step === "settled" ? "failed" : "complete";
    }

    if (currentIndex >= stepIndex) return "complete";
    if (currentIndex + 1 === stepIndex) return "current";
    return "pending";
  };

  const renderStatusIcon = (
    status: "complete" | "current" | "pending" | "failed"
  ) => {
    switch (status) {
      case "complete":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-md shadow-green-500/20">
            <svg
              className="h-5 w-5 text-white"
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
        );
      case "current":
        return (
          <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-blue-500 shadow-md shadow-blue-500/20">
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
        );
      case "failed":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 shadow-md shadow-red-500/20">
            <svg
              className="h-5 w-5 text-white"
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
        );
      default:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-sm">
            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
          </div>
        );
    }
  };

  if (!order) return null;

  const currentStatus = polledOrder?.status || order.status;

  if (isTimedOut) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="p-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-yellow-100 p-2">
              <svg
                className="h-12 w-12 text-yellow-600"
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
            <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
              Order Timed Out
            </h3>
            <p className="mt-2 text-center text-sm text-gray-600">
              The order is taking longer than expected to process. Would you
              like to try again?
            </p>
          </div>
          <div className="flex border-t border-gray-100">
            <button
              onClick={handleRetry}
              className="flex-1 bg-white px-4 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Retry Order
            </button>
            <div className="w-px bg-gray-100"></div>
            <button
              onClick={onClose}
              className="flex-1 bg-white px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        <div className="space-y-6">
          {/* Timeline */}
          <div className="space-y-8">
            {["created", "processing", "settled"].map((step, index, arr) => {
              const status = getStepStatus(currentStatus, step as any);
              const isLast = index === arr.length - 1;

              return (
                <div key={step} className="relative flex items-start">
                  {/* Icon + Connector */}
                  <div className="relative flex flex-col items-center">
                    {renderStatusIcon(status)}
                    {!isLast && (
                      <div className="absolute top-10 left-1/2 h-full w-px -translate-x-1/2 bg-gray-300" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="ml-6">
                    <p className="font-medium text-gray-900">
                      {step.charAt(0).toUpperCase() + step.slice(1)} order
                    </p>
                    <p className="text-sm text-gray-500">
                      {status === "complete"
                        ? "Completed"
                        : status === "current"
                        ? "In Progress..."
                        : status === "failed"
                        ? "Failed"
                        : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order details */}
          <div className="rounded-xl bg-gray-50/80 p-4 backdrop-blur-sm">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Order ID</dt>
                <dd className="font-medium text-gray-900">{order.order_id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Amount</dt>
                <dd className="font-medium text-gray-900">
                  {order.amount} {order.currency}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Token</dt>
                <dd className="font-medium text-gray-900">{order.token}</dd>
              </div>
              {order.note && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Note</dt>
                  <dd className="font-medium text-gray-900">{order.note}</dd>
                </div>
              )}
            </dl>
          </div>

          {showReceipt && (
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;
