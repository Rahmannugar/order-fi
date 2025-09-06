import { NextResponse } from "next/server";
import { createOrder } from "@/lib/server/createOrder";

export async function POST(req: Request) {
  const body = await req.json();
  const order = createOrder(body);
  return NextResponse.json(order);
}
