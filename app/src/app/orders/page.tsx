"use client";

import { useShop } from "@/context/ShopContext";

export default function OrdersPage() {
  const { orders, advanceOrderStatus, currentUserRole, profile } = useShop();

  const visibleOrders =
    currentUserRole === "admin"
      ? orders
      : orders.filter((order) => order.customerEmail === profile.email || order.customerName === profile.name);

  return (
    <main className="min-h-screen px-6 pt-24 pb-36">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-pink-700">Order History</h1>
        {visibleOrders.length === 0 ? (
          <p className="mt-4 text-pink-500">No past orders yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {visibleOrders.map((order) => (
              <article key={order.id} className="rounded-2xl border border-pink-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-pink-700">Order {order.id}</h2>
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-700">{order.status}</span>
                </div>
                <p className="text-sm text-pink-500">Date: {new Date(order.createdAt).toLocaleString()}</p>
                <p className="mt-1 text-sm text-pink-500">Customer: {order.customerName} ({order.customerEmail})</p>
                <p className="mt-1 text-sm text-pink-500">Delivery: {order.deliveryAddress}</p>
                <p className="mt-1 text-sm text-pink-500">Contact: {order.contactPhone}</p>
                <p className="mt-1 text-sm text-pink-500">Delivery Option: {order.deliveryOption}</p>
                <p className="mt-1 text-sm text-pink-500">Payment: {order.paymentMethod}</p>
                <p className="mt-2 font-semibold text-pink-700">Total: ${order.total.toFixed(2)}</p>
                <ul className="mt-2 space-y-1 text-sm text-pink-600">
                  {order.items.map((item) => (
                    <li key={`${item.productId}-${item.note ?? item.wrap}`}> 
                      {item.productId} × {item.quantity} (Wrap: {item.wrap || "Standard"}, Note: {item.note || "-"})
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-3 rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
                  onClick={() => advanceOrderStatus(order.id)}
                >
                  Advance Status
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
