import { NextResponse } from "next/server";
import { createOrderServerSide } from "@/lib/commerce/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { customer, items, paymentMethod, notes } = body;

    // Validate Customer Details
    if (!customer?.fullName?.trim()) {
      return NextResponse.json({ success: false, message: "Full name is required." }, { status: 400 });
    }
    if (!customer?.email?.includes("@")) {
      return NextResponse.json({ success: false, message: "Valid email address is required." }, { status: 400 });
    }
    if (!customer?.phone?.trim() || customer.phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ success: false, message: "Valid 10-digit mobile number is required." }, { status: 400 });
    }
    if (!customer?.addressLine1?.trim()) {
      return NextResponse.json({ success: false, message: "Delivery address is required." }, { status: 400 });
    }
    if (!customer?.pincode?.replace(/\D/g, "") || customer.pincode.replace(/\D/g, "").length !== 6) {
      return NextResponse.json({ success: false, message: "Valid 6-digit Indian PIN code is required." }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: "Your cart is empty." }, { status: 400 });
    }

    // Determine actual payment mode
    const selectedMethod = paymentMethod === "razorpay" && !process.env.RAZORPAY_KEY_ID ? "demo" : paymentMethod || "demo";

    const order = createOrderServerSide({
      customer,
      items,
      paymentMethod: selectedMethod,
      notes,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: order.total,
      paymentMethod: order.paymentMethod,
      estimatedDelivery: order.estimatedDelivery,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to process order.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
