import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("🔁 Booking API called");

    const { userId: clerkUserId } = await auth();

    const user = await db.user.findUnique({
      where: { clerkUserId },
    })

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { facility, date, timeSlot } = body;

    if (!facility || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Missing booking fields" },
        { status: 400 }
      );
    }

    const timeRanges = {
      Morning: ["08:00", "12:00"],
      Afternoon: ["12:00", "16:00"],
      Evening: ["16:00", "20:00"],
      Night: ["20:00", "23:00"],
    };

    const [start, end] = timeRanges[timeSlot] || [];

    if (!start || !end) {
      return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
    }

    const startTime = new Date(`${date}T${start}:00`);
    const endTime = new Date(`${date}T${end}:00`);

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
        userId: user.id,
        facility, // 🛠️ enum string like 'GYM'
        startTime,
        endTime,
        status: "BOOKED",
      },
    });

    return NextResponse.json(
      { success: true, booking: newBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Booking Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
