import { create } from "zustand";

type OrderStatus = "created" | "processing" | "settled" | "failed";

type OrderState = {
  currentOrderId?: string;
  status?: OrderStatus;
  setOrder: (id: string, status: OrderStatus) => void;
  finalizeOrder: (status: OrderStatus) => void;
  reset: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  currentOrderId: undefined,
  status: undefined,
  setOrder: (id, status) => set({ currentOrderId: id, status }),
  finalizeOrder: (status) => set({ status }),
  reset: () => set({ currentOrderId: undefined, status: undefined }),
}));
