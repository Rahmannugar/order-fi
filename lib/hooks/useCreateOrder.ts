"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Order } from "@/lib/types/order";
import { useOrderStore } from "@/lib/stores/orderStore";

type Payload = Omit<Order, "order_id" | "status" | "created_at">;

const createOrder = async (payload: Payload): Promise<Order> => {
  const { data } = await axios.post("/api/mock/orders/create", payload);
  return data;
};

export const useCreateOrder = () => {
  const { addOrder, updateOrder } = useOrderStore();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      addOrder(order);
    },
  });
};
