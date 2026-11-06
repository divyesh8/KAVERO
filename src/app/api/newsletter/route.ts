import { NextResponse } from "next/server";
import { addNewsletterSubscriber } from "@/lib/commerce/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    addNewsletterSubscriber(email, body.source || "footer");

    return NextResponse.json({
      success: true,
      message: "Welcome to KAVERO estate chronicles! Check your inbox for your welcome note.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
