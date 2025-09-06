import { mockOrders } from "@/lib/db/orders";
import type { Order } from "@/lib/types/order";

export const getOrder = (orderId: string): Order | null => {
  return mockOrders[orderId] || null;
}
