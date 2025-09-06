import { NextResponse } from "next/server";
import { getOrder } from "@/lib/server/getOrder";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = getOrder(params.orderId);

    if (!order) {
      return NextResponse.json(
        {
          error: "order_not_found",
          message: `No order with id ${params.orderId}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "internal_error", message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
