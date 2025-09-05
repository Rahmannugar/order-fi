"use client";

import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "@/lib/stores/orderStore";
import type { Order } from "@/lib/types/order";
import axios from "axios";

const getOrderStatus = async (orderId: string): Promise<Order> => {
  const { data } = await axios.get<Order>(`/api/mock/orders/${orderId}`);
  return data;
};

export const useGetOrderStatus = () => {
  const { order, finalized, updateStatus } = useOrderStore();

  const query = useQuery<Order>({
    queryKey: ["order-status", order?.order_id],
    queryFn: () => getOrderStatus(order!.order_id),
    enabled: !!order && !finalized,
    refetchInterval: 3000, // polling
    retry: false,
  });

  if (query.data) {
    updateStatus(query.data.status);
  }

  return {
    isPolling: query.isFetching,
  };
};
