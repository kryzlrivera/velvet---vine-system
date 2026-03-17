"use client";

import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import type { OrderStatus } from "@/lib/types";

export default function RiderPage() {
  const { orders, advanceOrderStatus, setOrderStatus, currentUserRole } = useShop();

  if (currentUserRole !== "rider") {
    return (
      <main className="min-h-screen px-6 pt-24 pb-36">
        <section className="mx-auto max-w-5xl rounded-2xl border border-pink-200 bg-white p-8 text-center text-pink-600 shadow-sm">
          <h1 className="text-2xl font-bold text-pink-700">Unauthorized</h1>
          <p className="mt-2">You must sign in as Delivery Driver to view this page.</p>
        </section>
      </main>
    );
  }

  const pendingOrders = orders.filter((o) => o.status !== "Delivered");
  const completedOrders = orders.filter((o) => o.status === "Delivered");

  return (
    <main className="min-h-screen bg-pink-50 pb-24 pt-24">
      <section className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold text-pink-700">Delivery Driver Dashboard</h1>
        <p className="mt-2 text-sm text-pink-600">
          Rider panel: orders and delivery progress. No cart available for riders.
        </p>

        <div className="mt-6 space-y-4">
          <section className="rounded-2xl border border-pink-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-bold text-pink-700">Delivery List</h2>
            {pendingOrders.length === 0 ? (
              <p className="mt-2 text-pink-600">No pending deliveries at the moment.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {pendingOrders.map((order) => (
                  <li key={order.id} className="rounded-lg border border-pink-100 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-pink-700">Order {order.id}</p>
                        <p className="text-sm text-pink-600">{order.deliveryAddress}</p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={order.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-pink-600 px-3 py-1 text-xs text-white hover:bg-pink-700"
                        >
                          Map
                        </a>
                        <button
                          className="rounded-full bg-pink-200 px-3 py-1 text-xs text-pink-700 hover:bg-pink-300"
                          onClick={() => advanceOrderStatus(order.id)}
                        >
                          Next status
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-xl border border-pink-200 bg-white">
                      <iframe
                        title={`Map for ${order.id}`}
                        className="h-[240px] w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                          order.deliveryLat !== undefined && order.deliveryLng !== undefined
                            ? `${order.deliveryLat},${order.deliveryLng}`
                            : order.deliveryAddress,
                        )}&output=embed`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-pink-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-bold text-pink-700">Delivery Details</h2>
            {pendingOrders.map((order) => (
              <div key={order.id} className="mt-3 rounded-lg border border-pink-100 p-3">
                <p className="text-sm font-semibold text-pink-700">Order {order.id}</p>
                <div className="mt-1 flex items-center gap-2">
                  <label className="text-sm text-pink-600" htmlFor={`status-${order.id}`}>
                    Status:
                  </label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    onChange={(e) => setOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="rounded-lg border border-pink-300 px-2 py-1 text-sm text-pink-700"
                  >
                    <option>In Arrangement</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Canceled</option>
                    <option>Returned</option>
                  </select>
                </div>
                <p className="text-sm text-pink-600">Option: {order.deliveryOption}</p>
                <p className="text-sm text-pink-600">Address: {order.deliveryAddress}</p>
                <p className="text-sm text-pink-600">Phone: {order.contactPhone}</p>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-pink-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-bold text-pink-700">Progress</h2>
            {pendingOrders.length === 0 ? (
              <p className="mt-2 text-pink-600">No progress updates yet.</p>
            ) : (
              pendingOrders.map((order) => (
                <div key={order.id} className="mt-3">
                  <p className="text-sm font-semibold text-pink-700">Order {order.id}</p>
                  <div className="mt-1 h-3 overflow-hidden rounded-full bg-pink-100">
                    <div
                      className="h-full bg-pink-600"
                      style={{ width: order.status === "In Arrangement" ? "25%" : order.status === "Out for Delivery" ? "65%" : "100%" }}
                    />
                  </div>
                  <p className="text-xs text-pink-500 mt-1">{order.status}</p>
                </div>
              ))
            )}
          </section>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm font-semibold text-pink-700 underline">
            Return to client store
          </Link>
        </div>
      </section>
    </main>
  );
}
