import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { userId } = await auth();
  const body = await req.json();
  const { status } = body;

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user || user.role !== "SOCIETY_SECRETARY") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await db.complaint.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
