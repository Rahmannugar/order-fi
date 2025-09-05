import { Order } from "@/lib/types/order";

export const orders: Record<string, Order> = {};

export const createOrder = (
  data: Omit<Order, "order_id" | "status" | "created_at">
): Order => {
  const order: Order = {
    order_id: `ord_${Math.random().toString(36).slice(2, 10)}`,
    status: "created",
    created_at: new Date().toISOString(),
    ...data,
  };
  orders[order.order_id] = order;
  return order;
};
