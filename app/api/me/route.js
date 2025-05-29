import { NextResponse } from "next/server";
import { checkUser, checkUserFromRequest } from "@/lib/checkUser";

export async function GET(request) {
  const user = await checkUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
