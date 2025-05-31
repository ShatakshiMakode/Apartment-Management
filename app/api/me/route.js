import { NextResponse } from "next/server";
import { checkUserFromRequest } from "@/lib/checkUser";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    // Get database user
    const user = await checkUserFromRequest(request);

    if (!user) {
      console.warn("⚠️ No user found in database");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Get Clerk user directly using currentUser
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      console.warn("⚠️ No Clerk user found");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Get role from Clerk user metadata
    const userRole = (clerkUser.publicMetadata?.role || "resident").toUpperCase();
    console.log("✅ Clerk user role:", userRole);
    
    // Combine database user data with Clerk role information
    const userWithRole = {
      ...user,
      role: userRole
    };

    console.log("✅ Returning user with role:", userWithRole.role);
    return NextResponse.json({ user: userWithRole });
  } catch (error) {
    console.error("Error in /api/me route:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: "Internal server error", user: null },
      { status: 500 }
    );
  }
}
