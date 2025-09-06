import { mockOrders } from "@/lib/db/orders";
import type { Order } from "@/lib/types/order";

export const createOrder = (
  data: Omit<Order, "order_id" | "status" | "created_at">
): Order => {
  const order: Order = {
    order_id: `ord_${Math.random().toString(36).slice(2, 10)}`,
    status: "created",
    created_at: new Date().toISOString(),
    ...data,
  };

  mockOrders[order.order_id] = order;

  // Step 1: move to "processing" after 2–5s
  setTimeout(() => {
    const current = mockOrders[order.order_id];
    if (current && !["settled", "failed"].includes(current.status)) {
      current.status = "processing";
    }
  }, Math.floor(Math.random() * 3000) + 2000);

  // Step 2: finalize after 18s
  setTimeout(() => {
    const current = mockOrders[order.order_id];
    if (current && !["settled", "failed"].includes(current.status)) {
      const roll = Math.random();
      current.status = roll < 0.8 ? "settled" : "failed";
    }
  }, 18000 + Math.floor(Math.random() * 5000)); // 18–23s

  return order;
};
