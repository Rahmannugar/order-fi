"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Order } from "@/lib/types/order";
import { useOrderStore } from "@/lib/stores/orderStore";

const fetchOrder = async (orderId: string): Promise<Order> => {
  const { data } = await axios.get<Order>(`/api/mock/orders/${orderId}`);
  return data;
};

export const useOrderPolling = (orderId: string | null) => {
  const { updateOrder } = useOrderStore();

  return useQuery<Order>({
    queryKey: ["order", orderId],
    queryFn: () =>
      orderId ? fetchOrder(orderId) : Promise.reject("No orderId"),
    enabled: !!orderId,
    refetchInterval: (query) => {
      const data = query.state.data as Order;

      // Stop if we already have a final status
      if (data?.status === "settled" || data?.status === "failed") {
        return false;
      }

      // Stop after 60 seconds
      const startTime = query.state.dataUpdatedAt || Date.now();
      if (Date.now() - startTime > 60000) {
        return false;
      }

      return 3000; // Poll every 3 seconds
    },
    onSuccess: (data) => {
      if (orderId) {
        updateOrder(orderId, { status: data.status });
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 3,
    gcTime: 0,
  });
};
