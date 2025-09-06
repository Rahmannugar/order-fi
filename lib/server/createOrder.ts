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

  setTimeout(() => {
    const current = mockOrders[order.order_id];
    if (current && current.status === "created") {
      current.status = "processing";
    }
  }, 7000);

  setTimeout(() => {
    const current = mockOrders[order.order_id];
    if (current && current.status === "processing") {
      current.status = Math.random() < 0.8 ? "settled" : "failed";
    }
  }, 17000);

  return order;
};
