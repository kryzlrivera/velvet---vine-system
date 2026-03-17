"use client";

import { useState } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { BouquetHeroIllustration } from "@/components/admin/AdminIllustration";
import { BestSellerBouquets, DeviceTypeDonut, InventoryStockWarnings, MiniStat, MonthlyRevenueBars, SalesLineChart } from "@/components/admin/AdminCharts";

export default function AdminPage() {
  const { products, orders, profile, lowStockAlert, currentUserRole, messages, sendMessage } = useShop();
  const [reply, setReply] = useState("");

  if (currentUserRole !== "admin") {
    return (
      <main className="min-h-screen px-6 pt-24 pb-36">
        <section className="mx-auto max-w-5xl rounded-2xl border border-pink-200 bg-white p-8 text-center text-pink-600 shadow-sm">
          <h1 className="text-2xl font-bold text-pink-700">Unauthorized</h1>
          <p className="mt-2">You must sign in as Admin to view this page.</p>
        </section>
      </main>
    );
  }


  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const yday = new Date(now);
  yday.setDate(now.getDate() - 1);
  const ydayKey = yday.toISOString().slice(0, 10);

  const isSameDay = (iso: string, dayKey: string) => iso.slice(0, 10) === dayKey;

  const todaysOrders = orders.filter((o) => isSameDay(o.createdAt, todayKey));
  const ydayOrders = orders.filter((o) => isSameDay(o.createdAt, ydayKey));

  const todaysSales = todaysOrders.reduce((s, o) => s + o.total, 0);
  const ydaySales = ydayOrders.reduce((s, o) => s + o.total, 0);
  const growthRate = ydaySales > 0 ? ((todaysSales - ydaySales) / ydaySales) * 100 : todaysSales > 0 ? 100 : 0;

  const uniqueUsers = new Set(orders.map((o) => o.customerEmail)).size;

  const hourBuckets = (() => {
    const base = Array.from({ length: 9 }, (_, i) => {
      const hour = 9 + i;
      const label = `${hour.toString().padStart(2, "0")}:00`;
      return { xLabel: label, value: 0 };
    });
    if (todaysOrders.length === 0) {
      const seed = [0, 120, 240, 180, 420, 260, 520, 430, 610];
      return base.map((p, i) => ({ ...p, value: seed[i] ?? 0 }));
    }
    for (const o of todaysOrders) {
      const h = new Date(o.createdAt).getHours();
      const idx = h - 9;
      if (idx >= 0 && idx < base.length) base[idx] = { ...base[idx], value: base[idx].value + o.total };
    }
    return base;
  })();

  const monthly = (() => {
    const labels = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setMonth(d.getMonth() - (6 - i));
      return { year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleString(undefined, { month: "short" }) };
    });

    const map = new Map<string, number>();
    for (const o of orders) {
      const d = new Date(o.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      map.set(key, (map.get(key) ?? 0) + o.total);
    }

    const hasAny = orders.length > 0;
    const fallback = [8200, 9100, 7600, 9800, 11200, 10300, 12400];

    return labels.map((m, idx) => {
      const key = `${m.year}-${m.month}`;
      const val = map.get(key) ?? (hasAny ? 0 : fallback[idx] ?? 0);
      return { label: m.label, value: Math.round(val) };
    });
  })();

  const bestSellers = (() => {
    const countByProduct = new Map<string, number>();
    for (const o of orders) {
      for (const it of o.items) {
        countByProduct.set(it.productId, (countByProduct.get(it.productId) ?? 0) + it.quantity);
      }
    }
    const list = products
      .map((p) => ({ label: p.name, value: countByProduct.get(p.id) ?? 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const has = list.some((x) => x.value > 0);
    if (!has) {
      return [
        { label: "Blush Bloom Bouquet", value: 42 },
        { label: "Pretty Roses", value: 36 },
        { label: "Wild Whisper", value: 31 },
        { label: "Dune Beige", value: 27 },
        { label: "Sunlit Peony", value: 22 },
      ];
    }
    return list;
  })();

  const stockWarnings = products
    .map((p) => ({ label: p.name, stock: p.stock }))
    .sort((a, b) => a.stock - b.stock);

  return (
    <main className="min-h-screen px-6 pt-24 pb-36">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-[270px]">
            <div className="rounded-3xl border border-pink-200 bg-white/90 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-pink-700/80">Admin</p>
              <h1 className="mt-1 text-2xl font-bold text-pink-800">Analytics</h1>
              <p className="mt-2 text-sm text-pink-700/80">
                Velvet & Vine overview.
              </p>

              <nav className="mt-5 space-y-2 text-sm font-semibold text-pink-800">
                <a className="block rounded-xl bg-pink-100 px-3 py-2" href="#analysis">Analysis</a>
                <a className="block rounded-xl px-3 py-2 hover:bg-pink-50" href="#charts">Charts</a>
                <Link className="block rounded-xl px-3 py-2 hover:bg-pink-50" href="/admin/inventory">Inventory</Link>
                <a className="block rounded-xl px-3 py-2 hover:bg-pink-50" href="#chat">Admin Chat</a>
              </nav>

              <div className="mt-5 rounded-2xl border border-pink-200 bg-[#fffaf5] p-4">
                <p className="text-xs font-semibold text-pink-700/80">Admin contact</p>
                <p className="mt-1 text-sm font-semibold text-pink-800">{profile.email || "admin@velvetvine.com"}</p>
                {lowStockAlert ? <p className="mt-2 text-xs font-semibold text-red-600">{lowStockAlert}</p> : null}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-6">
            <section id="analysis" className="grid gap-4 lg:grid-cols-12">
              <div className="rounded-3xl border border-pink-200 bg-white p-5 shadow-sm lg:col-span-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-pink-700/80">Welcome back</p>
                    <h2 className="mt-1 text-2xl font-bold text-pink-800">Admin Dashboard</h2>
                    <p className="mt-2 text-sm text-pink-700/80">
                      Today’s sales and growth rate at a glance.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-pink-200 bg-[#fffaf5] p-4">
                      <p className="text-xs font-semibold text-pink-700/80">Today’s Sales</p>
                      <p className="mt-2 text-xl font-bold text-pink-800">
                        ${todaysSales.toFixed(0)}
                      </p>
                      <p className="mt-1 text-xs text-pink-700/80">{todaysOrders.length} orders</p>
                    </div>
                    <div className="rounded-2xl border border-pink-200 bg-[#fffaf5] p-4">
                      <p className="text-xs font-semibold text-pink-700/80">Growth Rate</p>
                      <p className="mt-2 text-xl font-bold text-pink-800">
                        {growthRate >= 0 ? "+" : ""}
                        {growthRate.toFixed(1)}%
                      </p>
                      <p className="mt-1 text-xs text-pink-700/80">vs yesterday</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <BouquetHeroIllustration className="h-[220px] w-full" />
                </div>
              </div>

              <div className="grid gap-4 lg:col-span-5">
                <MiniStat
                  label="Total Users"
                  value={uniqueUsers > 0 ? uniqueUsers.toLocaleString() : "—"}
                  subValue={orders.length > 0 ? "Unique buyer emails in orders" : "No order data yet"}
                />
                <MiniStat
                  label="Total Orders"
                  value={orders.length.toLocaleString()}
                  subValue={`${products.length} products in catalog`}
                />
              </div>

              <div className="lg:col-span-12">
                <InventoryStockWarnings items={stockWarnings} />
              </div>
            </section>

            <section id="charts" className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SalesLineChart points={hourBuckets} />
              </div>
              <div className="lg:col-span-5">
                <DeviceTypeDonut
                  items={[
                    { label: "Desktop", value: 35, color: "#ff4fa3" },
                    { label: "Tablet", value: 18, color: "#ff86bf" },
                    { label: "Mobile", value: 47, color: "#b81b63" },
                  ]}
                />
              </div>

              <div className="lg:col-span-7">
                <MonthlyRevenueBars months={monthly} />
              </div>
              <div className="lg:col-span-5">
                <BestSellerBouquets items={bestSellers} />
              </div>
            </section>

            <section id="chat" className="rounded-3xl border border-pink-200 bg-white p-5 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <h2 className="text-lg font-bold text-pink-800">Admin Chat</h2>
                  <p className="mt-1 text-xs text-pink-700/80">Respond to customer messages (demo local state)</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 max-h-72 overflow-y-auto rounded-2xl border border-pink-100 bg-pink-50 p-3">
                {messages.length === 0 ? (
                  <p className="text-sm text-pink-700/80">No messages yet.</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={msg.from === "admin" ? "text-right" : "text-left"}>
                      <p
                        className={`inline-block max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                          msg.from === "admin" ? "bg-pink-200 text-pink-800" : "bg-white text-pink-800"
                        }`}
                      >
                        <span className="font-semibold">{msg.from === "admin" ? "Admin: " : "Customer: "}</span>
                        {msg.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type admin reply..."
                  className="flex-1 rounded-2xl border border-pink-300 bg-white px-3 py-2"
                />
                <button
                  className="rounded-2xl bg-pink-700 px-5 py-2 font-semibold text-white hover:bg-pink-800"
                  onClick={() => {
                    if (!reply.trim()) return;
                    sendMessage(reply.trim(), "admin");
                    setReply("");
                  }}
                >
                  Send
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
