"use client";

import { useOrderStore } from "@/lib/stores/orderStore";
import OrderStatusCard from "./OrderStatusCard";

const Orders = () => {
  const { orders } = useOrderStore();
  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (orders.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-gray-500">No orders yet. Create your first order!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedOrders.map((order) => (
        <OrderStatusCard key={order.order_id} order={order} />
      ))}
    </div>
  );
};

export default Orders;