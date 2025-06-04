// ✅ 4. /api/visitor/list/route.js
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const visitors = await db.visitor.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      visitingFlat: {
        include: {
          resident: {
            select: { name: true }, //name of the resident
          },
        },
      },
    },
  });
  return NextResponse.json({ visitors });
}
