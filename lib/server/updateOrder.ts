import { mockOrders } from "@/lib/db/orders";
import type { OrderStatus } from "@/lib/types/order";

export const updateOrder = (orderId: string, status: OrderStatus) => {
  if (!mockOrders[orderId]) return null;
  mockOrders[orderId].status = status;
  return mockOrders[orderId];
};
