import { create } from "zustand";
import type { Order, OrderStatus } from "@/lib/types/order";

interface OrderState {
  order: Order | null;
  finalized: boolean; // true when settled/failed
  setOrder: (order: Order) => void;
  updateStatus: (status: OrderStatus) => void;
  reset: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  finalized: false,

  setOrder: (order) => set({ order, finalized: false }),

  updateStatus: (status) =>
    set((state) => {
      if (!state.order) return state;
      if (state.finalized) return state;

      const isFinal = status === "settled" || status === "failed";
      return {
        order: { ...state.order, status },
        finalized: isFinal,
      };
    }),

  reset: () => set({ order: null, finalized: false }),
}));
