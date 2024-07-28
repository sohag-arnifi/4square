import { NextResponse } from "next/server";

export async function GET() {
  console.log("corn jobs working successfully");
  return NextResponse.json({ ok: true });
}
