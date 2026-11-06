import { NextResponse } from "next/server";
import {
  listAllOrders,
  updateOrderStatus,
  getInventoryStatus,
  updateInventoryStock,
  listNewsletterSubscribers,
  listContactMessages,
} from "@/lib/commerce/store";
import { POPULAR_PRODUCTS } from "@/data/products";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "kavero2026";

function verifyAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, "");
  return token === ADMIN_SECRET;
}

export async function GET(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized admin access." }, { status: 401 });
  }

  const orders = listAllOrders();
  const inventory = getInventoryStatus();
  const subscribers = listNewsletterSubscribers();
  const messages = listContactMessages();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return NextResponse.json({
    success: true,
    stats: {
      totalOrders: orders.length,
      totalRevenue,
      totalSubscribers: subscribers.length,
      unreadInquiries: messages.filter((m) => m.status === "unread").length,
    },
    orders,
    inventory,
    products: POPULAR_PRODUCTS,
    subscribers,
    messages,
  });
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized admin access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === "update_order_status") {
      const { orderId, fulfillmentStatus, paymentStatus } = payload;
      const updated = updateOrderStatus(orderId, { fulfillmentStatus, paymentStatus });
      return NextResponse.json({ success: true, order: updated });
    }

    if (action === "update_stock") {
      const { productId, stock } = payload;
      updateInventoryStock(productId, stock);
      return NextResponse.json({ success: true, inventory: getInventoryStatus() });
    }

    return NextResponse.json({ success: false, message: "Unknown action." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Action failed.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
