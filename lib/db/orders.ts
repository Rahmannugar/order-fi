import type { Order } from "@/lib/types/order";

declare global {
  var mockOrders: Record<string, Order>;
}

// Initialize if not exists
if (!global.mockOrders) {
  global.mockOrders = {};
}

// Export the global version
export const mockOrders = global.mockOrders;
