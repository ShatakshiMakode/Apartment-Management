// app/api/users/route.js

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ clerkUserId }).populate(
      "societyId buildingId flatId"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await req.json();

    let user = await User.findOne({ clerkUserId });

    if (user) {
      user = await User.findOneAndUpdate({ clerkUserId }, body, {
        new: true,
        runValidators: true,
      });

      return NextResponse.json({
        success: true,
        data: user,
        message: "User updated.",
      });
    } else {
      const newUser = await User.create({
        ...body,
        clerkUserId,
      });

      return NextResponse.json(
        { success: true, data: newUser, message: "User created." },
        { status: 201 }
      );
    }
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Email already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
