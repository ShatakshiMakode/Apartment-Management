// app/api/society-admin/pending/route.js

import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    // Case 1: User is not logged in
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to continue." },
        { status: 401 }
      );
    }

    // Check if the logged-in user is a SUPER_ADMIN
    const currentUser = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    // Case 2: User is logged in but not a SUPER_ADMIN
    if (currentUser?.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Forbidden. You do not have permission to view this page." },
        { status: 403 }
      );
    }

    // Happy path: User is authorized, fetch the data
    const pendingRequests = await db.pendingAdmin.findMany({
      where: { status: "PENDING" },
      orderBy: {
        createdAt: "asc", // Optional: show oldest requests first
      },
    });

    return NextResponse.json(pendingRequests);
  } catch (error) {
    console.error("Error fetching pending admin requests:", error);
    // Case 3: Any other server-side error
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
