import { create } from "zustand";
import type { Order } from "@/lib/types/order";

type OrderState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  reset: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [
        order,
        ...state.orders.filter((o) => o.order_id !== order.order_id),
      ],
    })),
  updateOrder: (id, updates) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.order_id === id ? { ...o, ...updates } : o
      ),
    })),
  reset: () => set({ orders: [] }),
}));
