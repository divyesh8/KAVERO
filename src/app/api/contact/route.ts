import { NextResponse } from "next/server";
import { addContactMessage } from "@/lib/commerce/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim() || !email?.includes("@") || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide your name, valid email, and message." },
        { status: 400 }
      );
    }

    const savedMsg = addContactMessage({
      name,
      email,
      phone,
      subject: subject || "Customer Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received by our estate team. We will get back to you within 24 hours.",
      id: savedMsg.id,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
