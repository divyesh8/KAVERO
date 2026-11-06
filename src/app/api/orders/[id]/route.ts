import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/commerce/store";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve order." },
      { status: 500 }
    );
  }
}
