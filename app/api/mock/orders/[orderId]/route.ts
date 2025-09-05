import { NextResponse } from "next/server";
import { getOrder } from "@/lib/server/mockDb";

export async function GET(
  _: Request,
  { params }: { params: { orderId: string } }
) {
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
}
