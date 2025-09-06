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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl p-4">
        {!isConnected ? (
          <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600">
              Please connect your wallet to access OrderFi features
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Create Order</h2>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <OrderForm onSuccess={handleNewOrder} />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">Recent Orders</h2>
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
