"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import Header from "@/components/ui/Header";
import OrderForm from "@/components/order/OrderForm";
import Orders from "@/components/order/Orders";
import ProcessingModal from "@/components/ui/ProcessingModal";
import type { Order } from "@/lib/types/order";
import { useCreateOrder } from "@/lib/hooks/useCreateOrder";

const Page = () => {
  const { isConnected } = useAccount();
  const [processingOrder, setProcessingOrder] = useState<Order | null>(null);
  const { mutate: createOrder } = useCreateOrder();

  const handleNewOrder = (order: Order) => {
    setProcessingOrder(order);
  };

  const handleRetry = () => {
    if (!processingOrder) return;

    // Create a new order with the same parameters if timeout
    createOrder(
      {
        amount: processingOrder.amount,
        currency: processingOrder.currency,
        token: processingOrder.token,
        note: processingOrder.note,
      },
      {
        onSuccess: (newOrder) => {
          setProcessingOrder(newOrder);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl py-4 px-7">
        {!isConnected ? (
          <div className="rounded-2xl mt-32 border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-50 p-3">
              <svg
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"
                />
                <circle cx="16" cy="13" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <h2 className="mb-2 md:text-xl font-semibold text-gray-700">
              Connect Your Wallet
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              Please connect your wallet using the button in the header to start
              creating orders
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl text-gray-700 font-bold">
                Create Order
              </h2>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <OrderForm onSuccess={handleNewOrder} />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-gray-700 text-xl font-bold">
                Recent Orders
              </h2>
              <Orders />
            </div>
          </div>
        )}
      </main>

      <ProcessingModal
        order={processingOrder}
        onClose={() => setProcessingOrder(null)}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default Page;
