"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Order } from "@/lib/types/order";

const fetchOrder = async (orderId: string): Promise<Order> => {
  const { data } = await axios.get(`/api/mock/orders/${orderId}`);
  return data;
};

export const useOrderPolling = (orderId: string | null) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => (orderId ? fetchOrder(orderId) : null),
    enabled: !!orderId,
    refetchInterval: (query) => {
      const data = query.state.data as Order | null;
      if (data?.status === "settled" || data?.status === "failed") {
        return false;
      }
      return 3000;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: true,
    gcTime: 60000,
  });
};
