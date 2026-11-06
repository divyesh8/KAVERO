"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Package,
  IndianRupee,
  Users,
  MessageSquare,
  RefreshCw,
  LogOut,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Order, NewsletterSubscriber, ContactMessage } from "@/lib/commerce/store";
import { Product } from "@/data/products";

interface AdminDashboardData {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    totalSubscribers: number;
    unreadInquiries: number;
  };
  orders: Order[];
  inventory: Record<string, number>;
  products: Product[];
  subscribers: NewsletterSubscriber[];
  messages: ContactMessage[];
}

export default function AdminDashboardPage() {
  const [token, setToken] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<"orders" | "inventory" | "subscribers" | "messages">("orders");
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${inputPass.trim()}` },
      });
      const resData = await res.json();

      if (res.ok && resData.success) {
        setToken(inputPass.trim());
        setIsAuthenticated(true);
        setData(resData);
      } else {
        setError("Invalid owner access passcode.");
      }
    } catch {
      setError("Network error connecting to admin server.");
    } finally {
      setLoading(false);
    }
  };

  const reloadData = async () => {
    if (!token) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setData(resData);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, fulfillmentStatus: string) => {
    setActionLoading(true);
    try {
      await fetch("/api/admin/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "update_order_status",
          payload: { orderId, fulfillmentStatus },
        }),
      });
      await reloadData();
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    setActionLoading(true);
    try {
      await fetch("/api/admin/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "update_stock",
          payload: { productId, stock: newStock },
        }),
      });
      await reloadData();
    } finally {
      setActionLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 max-w-md mx-auto px-4 py-20 sm:py-28 w-full">
          <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-8 space-y-6 shadow-luxury text-center">
            <div className="w-12 h-12 rounded-2xl bg-copper/15 border border-copper/30 flex items-center justify-center text-copper-light mx-auto">
              <Lock className="w-6 h-6 stroke-[1.8]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold block">
                Authorized Personnel Only
              </span>
              <h1 className="font-serif text-2xl text-cream-light font-normal">
                KAVERO Roastery Admin
              </h1>
              <p className="text-xs text-cream-secondary/80 font-light">
                Enter your administrative key to manage dispatch, live stock, and customer orders.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1 text-xs">
                <label className="text-cream-secondary/80 font-medium">Access Passcode</label>
                <input
                  type="password"
                  required
                  value={inputPass}
                  onChange={(e) => setInputPass(e.target.value)}
                  placeholder="Enter administrator passcode (default: kavero2026)"
                  className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light font-mono text-xs focus:outline-none focus:border-copper"
                />
              </div>

              {error && <div className="text-xs text-roasted-red">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-xs font-semibold py-3 px-4 rounded-xl transition-all shadow-copper flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Verify & Access Dashboard</span>}
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Admin Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#3E2619] gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest-light animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-copper-light font-semibold">
                Live Store Operations
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-cream-light font-medium mt-1">
              Estate Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={reloadData}
              disabled={actionLoading}
              className="p-2.5 rounded-xl bg-[#24160E] border border-[#3E2619] text-cream-secondary hover:text-cream-light hover:border-copper transition-all cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${actionLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setToken("");
              }}
              className="p-2.5 rounded-xl bg-[#24160E] border border-[#3E2619] text-roasted-red hover:bg-roasted-red/10 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        {data && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-5 space-y-1">
              <div className="flex items-center justify-between text-copper-light">
                <Package className="w-5 h-5" />
                <span className="text-[10px] font-mono text-cream-secondary/60">LIFETIME</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-cream-light">
                {data.stats.totalOrders}
              </div>
              <div className="text-xs text-cream-secondary/70 font-light">Total Customer Orders</div>
            </div>

            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-5 space-y-1">
              <div className="flex items-center justify-between text-copper-light">
                <IndianRupee className="w-5 h-5" />
                <span className="text-[10px] font-mono text-cream-secondary/60">GROSS REVENUE</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-copper-light">
                ₹{data.stats.totalRevenue}
              </div>
              <div className="text-xs text-cream-secondary/70 font-light">Total Processed Value</div>
            </div>

            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-5 space-y-1">
              <div className="flex items-center justify-between text-copper-light">
                <Users className="w-5 h-5" />
                <span className="text-[10px] font-mono text-cream-secondary/60">SUBSCRIBERS</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-copper-light">
                {data.stats.totalSubscribers}
              </div>
              <div className="text-xs text-cream-secondary/70 font-light">Estate Newsletter Audience</div>
            </div>

            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-5 space-y-1">
              <div className="flex items-center justify-between text-copper-light">
                <MessageSquare className="w-5 h-5" />
                <span className="text-[10px] font-mono text-cream-secondary/60">MESSAGES</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-cream-light">
                {data.stats.unreadInquiries}
              </div>
              <div className="text-xs text-cream-secondary/70 font-light">Customer Care Inquiries</div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#3E2619] pb-4 mb-6 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-copper text-white shadow-copper"
                : "text-cream-secondary hover:text-cream-light"
            }`}
          >
            Orders ({data?.orders?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "inventory"
                ? "bg-copper text-white shadow-copper"
                : "text-cream-secondary hover:text-cream-light"
            }`}
          >
            Inventory & Stock
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "subscribers"
                ? "bg-copper text-white shadow-copper"
                : "text-cream-secondary hover:text-cream-light"
            }`}
          >
            Subscribers ({data?.subscribers?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "messages"
                ? "bg-copper text-white shadow-copper"
                : "text-cream-secondary hover:text-cream-light"
            }`}
          >
            Inquiries ({data?.messages?.length || 0})
          </button>
        </div>

        {/* Tab 1: Orders Table */}
        {activeTab === "orders" && data && (
          <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl overflow-hidden shadow-luxury">
            <div className="p-4 sm:p-5 border-b border-[#3E2619] flex justify-between items-center">
              <h2 className="font-serif text-lg text-cream-light">Customer Orders Dispatch</h2>
              <span className="text-xs text-cream-secondary/70 font-mono">
                {data.orders.length} Total Orders Recorded
              </span>
            </div>

            {data.orders.length === 0 ? (
              <div className="p-12 text-center text-xs text-cream-secondary/60">
                No orders have been submitted yet. Place an order on the store to test!
              </div>
            ) : (
              <div className="overflow-x-auto divide-y divide-[#3E2619]/40 text-xs">
                {data.orders.map((order) => (
                  <div key={order.id} className="p-4 sm:p-5 flex flex-col lg:flex-row justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-copper-light text-sm">
                          {order.orderNumber}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#140D09] border border-[#3E2619] text-cream-secondary">
                          {order.paymentMethod} • {order.paymentStatus}
                        </span>
                        <Link
                          href={`/order/${order.id}`}
                          target="_blank"
                          className="text-[11px] text-copper-light hover:underline flex items-center gap-1"
                        >
                          <span>Customer View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="text-cream-light font-medium">
                        {order.customer.fullName} ({order.customer.email} • +91 {order.customer.phone})
                      </div>
                      <div className="text-cream-secondary/80 font-light">
                        {order.customer.addressLine1}, {order.customer.city}, {order.customer.state} — {order.customer.pincode}
                      </div>

                      <div className="text-[11px] text-cream-secondary/70 pt-1 font-mono">
                        {order.items.map((i) => `${i.name} (${i.weight}) × ${i.quantity}`).join(" | ")}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0">
                      <div className="text-left lg:text-right">
                        <span className="font-mono text-base font-bold text-cream-light">
                          ₹{order.total}
                        </span>
                        <span className="text-[10px] text-cream-secondary/60 block">
                          {new Date(order.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-cream-secondary/70">Status:</span>
                        <select
                          value={order.fulfillmentStatus}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-[#140D09] border border-[#3E2619] text-xs text-copper-light rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
                        >
                          <option value="placed">Order Placed</option>
                          <option value="roasting">Roasting</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Inventory & Stock */}
        {activeTab === "inventory" && data && (
          <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 shadow-luxury space-y-6">
            <h2 className="font-serif text-lg text-cream-light">Real-Time Roastery Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.products.map((p) => {
                const stock = data.inventory[p.id] !== undefined ? data.inventory[p.id] : p.stockCount;
                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-[#160D08] border border-[#3E2619] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-[#1F120B] rounded-lg p-1 shrink-0 select-none">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="48px"
                          draggable={false}
                          onDragStart={(e) => e.preventDefault()}
                          className="object-contain kavero-nondraggable-image"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif text-sm font-semibold text-cream-light">{p.name}</h3>
                        <span className="text-[11px] text-cream-secondary/70 font-mono">Base Price: ₹{p.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-copper-light block">
                          {stock}
                        </span>
                        <span className="text-[10px] text-cream-secondary/60">Pouches in Stock</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleUpdateStock(p.id, stock + 10)}
                          className="w-7 h-6 rounded bg-[#24160E] border border-[#3E2619] flex items-center justify-center text-xs text-cream-light hover:border-copper"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleUpdateStock(p.id, Math.max(0, stock - 10))}
                          className="w-7 h-6 rounded bg-[#24160E] border border-[#3E2619] flex items-center justify-center text-xs text-cream-light hover:border-copper"
                        >
                          -10
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Subscribers */}
        {activeTab === "subscribers" && data && (
          <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 shadow-luxury space-y-4">
            <h2 className="font-serif text-lg text-cream-light">Newsletter Subscribers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#3E2619] text-cream-secondary/70 font-mono">
                    <th className="py-2.5">Email Address</th>
                    <th className="py-2.5">Subscribed Date</th>
                    <th className="py-2.5">Acquisition Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3E2619]/40">
                  {data.subscribers.map((s, idx) => (
                    <tr key={idx} className="hover:bg-[#160D08]">
                      <td className="py-2.5 font-medium text-cream-light">{s.email}</td>
                      <td className="py-2.5 text-cream-secondary/70">
                        {new Date(s.subscribedAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-2.5 text-copper-light font-mono text-[11px]">{s.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Messages */}
        {activeTab === "messages" && data && (
          <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 shadow-luxury space-y-4">
            <h2 className="font-serif text-lg text-cream-light">Customer Inquiries</h2>
            <div className="space-y-3">
              {data.messages.length === 0 ? (
                <div className="py-8 text-center text-xs text-cream-secondary/60">No contact messages received.</div>
              ) : (
                data.messages.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-[#160D08] border border-[#3E2619] space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-serif text-sm font-semibold text-cream-light block">{m.subject}</span>
                        <span className="text-[11px] text-cream-secondary/80">From {m.name} ({m.email} • {m.phone || "No phone"})</span>
                      </div>
                      <span className="text-[10px] text-cream-secondary/60 font-mono">{new Date(m.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                    <p className="text-cream-light font-light leading-relaxed pl-2 border-l border-copper/40">{m.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
