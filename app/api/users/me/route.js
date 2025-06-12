// app/api/users/me/route.js

import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"; // We still need auth for the userId

export async function GET() {
  try {
    const { userId } =await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        society: true,
      },
    });

    if (!dbUser) {
      return new NextResponse("User not found in database", { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
