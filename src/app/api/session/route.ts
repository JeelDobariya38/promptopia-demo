import { verifySession, type VerifySessionResult } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const session: VerifySessionResult = await verifySession();

    if (session.isAuth) {
      return NextResponse.json({ isAuth: true, userId: session.userId });
    } else {
      return NextResponse.json({
        isAuth: false,
        message: "You are not authenticated",
      });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
