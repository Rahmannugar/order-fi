import { NextResponse } from "next/server";
import { getOrder } from "@/lib/server/getOrder";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId;
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
