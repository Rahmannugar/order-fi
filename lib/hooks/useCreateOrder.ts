"use client";

import { useMutation } from "@tanstack/react-query";
import { useOrderStore } from "@/lib/stores/orderStore";
import type { Order } from "@/lib/types/order";
import axios from "axios";

type CreateOrderPayload = Omit<Order, "order_id" | "status" | "created_at">;

const createOrderRequest = async (
  payload: CreateOrderPayload
): Promise<Order> => {
  const { data } = await axios.post<Order>("/api/mock/orders/create", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const useCreateOrder = () => {
  const { setOrder } = useOrderStore();

  return useMutation({
    mutationFn: createOrderRequest,
    onSuccess: (data) => setOrder(data),
    retry: false,
  });
};
