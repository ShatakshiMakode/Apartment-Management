// ✅ 5. /api/visitor/[id]/route.js
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;
  await db.visitor.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
