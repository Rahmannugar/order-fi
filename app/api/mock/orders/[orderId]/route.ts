import { NextResponse } from "next/server";
import { getOrder } from "@/lib/server/getOrder";

export async function GET(
  request: Request,
  context: { params: Record<string, string> }
) {
  try {
    const orderId = context.params.orderId;
    const order = getOrder(orderId);

    if (!order) {
      return NextResponse.json(
        { error: "order_not_found", message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { error: "internal_error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
