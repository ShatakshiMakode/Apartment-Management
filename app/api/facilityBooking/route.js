import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const { userId: clerkUserId } = await auth();

    const user = await db.user.findUnique({
      where: { clerkUserId },
    })

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { facility, startDateTime, endDateTime, reason } = body;

    if (!facility || !startDateTime || !endDateTime) {
      return NextResponse.json(
        { error: "Missing booking fields" },
        { status: 400 }
      );
    }
    if (!startDateTime || !endDateTime) {
      return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
    }
    const startTime = new Date(startDateTime);
    const endTime = new Date(endDateTime);

    if (startTime >= endTime) {
      return NextResponse.json(
        { error: "Start time must be before end time" },
        { status: 400 }
      );
    }

    const existingBooking = await db.booking.findFirst({
      where: {
        facility, // 🛠️ use the enum value
        startTime: { lte: endTime },
        endTime: { gte: startTime },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 409 }
      );
    }

    const newBooking = await db.booking.create({
      data: {
        facility,
        userId: user.id,
        startTime,
        endTime,
        reason: reason || "No reason provided",
        status: "BOOKED",
      }
    });

    return NextResponse.json(
      { success: true, booking: newBooking },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
