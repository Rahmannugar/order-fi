import { NextResponse } from "next/server";
import crypto from "crypto";

const secret = process.env.WEBHOOK_SECRET || "shh_super_secret";

const verifySig = (raw: string, header: string) => {
  const [tPart, v1Part] = header.split(",").map((p) => p.trim());
  const t = tPart.split("=")[1];
  const v1 = v1Part.split("=")[1];

  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;

  const mac = crypto
    .createHmac("sha256", secret)
    .update(`${t}.${raw}`)
    .digest("base64");

  return crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(mac));
};

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-webhook-signature");
  if (!sig || !verifySig(raw, sig)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
