import { Order, OrderStatus } from "../types/order";
import { orders } from "./createOrder";

export const getOrder = (orderId: string): Order | null => {
  const order = orders[orderId];
  if (!order) return null;

  const elapsed = (Date.now() - new Date(order.created_at).getTime()) / 1000;
  let status: OrderStatus = "created";
  if (elapsed >= 18) status = Math.random() < 0.8 ? "settled" : "failed";
  else if (elapsed >= 8) status = "processing";

  return { ...order, status };
};
