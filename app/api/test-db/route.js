// app/api/test-db/route.js
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      success: true,
      message: "MongoDB connected ✅",
    });
  } catch (error) {
    console.error("MongoDB test error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
