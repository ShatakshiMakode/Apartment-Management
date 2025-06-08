import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { vendorId } = await req.json();
  const today = new Date().toISOString().slice(0, 10);

  const existing = await db.vendorLog.findFirst({
    where: {
      vendorId,
      date: {
        gte: new Date(today + "T00:00:00"),
        lte: new Date(today + "T23:59:59"),
      },
    },
  });

  if (!existing) {
    const entry = await db.vendorLog.create({
      data: {
        vendorId,
        entryTime: new Date(),
      },
    });
    return NextResponse.json({ message: "✅ Entry recorded", entry });
  } else if (!existing.exitTime) {
    const updated = await prisma.vendorLog.update({
      where: { id: existing.id },
      data: { exitTime: new Date() },
    });
    return NextResponse.json({ message: "✅ Exit recorded", updated });
  } else {
    return NextResponse.json({
      message: "✅ Already checked in and out today",
    });
  }
}
