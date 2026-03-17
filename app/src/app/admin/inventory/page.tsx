"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import type { Product } from "@/lib/types";

function getGroupLabel(categories: string[]) {
  const flower = categories.find((c) => c.startsWith("FlowerType:"));
  const occasion = categories.find((c) => c.startsWith("Occasion:"));
  const price = categories.find((c) => c.startsWith("Price:"));
  return (flower ?? occasion ?? price ?? "General").split(":")[1] ?? "General";
}

function slugifyId(input: string) {
  const base = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 32);
  return base || `item-${Date.now()}`;
}

function getCategoryValue(categories: string[], prefix: "Occasion:" | "FlowerType:" | "Price:") {
  const hit = categories.find((c) => c.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : "";
}

export default function AdminInventoryPage() {
  const { products, orders, currentUserRole, upsertProduct } = useShop();
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    id: string;
    name: string;
    description: string;
    price: string;
    stock: string;
    occasion: string;
    flowerType: string;
    priceGroup: string;
    image: string;
  }>({
    id: "",
    name: "",
    description: "",
    price: "0",
    stock: "0",
    occasion: "",
    flowerType: "",
    priceGroup: "",
    image: "/bouquet1.jpg",
  });

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

  const openAdd = () => {
    setEditingId(null);
    setForm({
      id: "",
      name: "",
      description: "",
      price: "0",
      stock: "0",
      occasion: "",
      flowerType: "",
      priceGroup: "",
      image: "/bouquet1.jpg",
    });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      id: p.id,
      name: p.name,
      description: p.description,
      price: String(p.price),
      stock: String(p.stock),
      occasion: getCategoryValue(p.categories, "Occasion:"),
      flowerType: getCategoryValue(p.categories, "FlowerType:"),
      priceGroup: getCategoryValue(p.categories, "Price:"),
      image: p.image || "/bouquet1.jpg",
    });
    setModalOpen(true);
  };

  const save = () => {
    const name = form.name.trim();
    if (!name) {
      alert("Please enter an item name.");
      return;
    }

    const id = editingId ? editingId : slugifyId(form.id || name);
    if (!editingId && products.some((p) => p.id === id)) {
      alert("That item code already exists. Try a slightly different name/code.");
      return;
    }

    const price = Number(form.price);
    const stock = Math.max(0, Math.floor(Number(form.stock)));
    if (!Number.isFinite(price) || price < 0) {
      alert("Price must be a valid number (0 or more).");
      return;
    }

    const categories: string[] = [];
    if (form.occasion.trim()) categories.push(`Occasion:${form.occasion.trim()}`);
    if (form.flowerType.trim()) categories.push(`FlowerType:${form.flowerType.trim()}`);
    if (form.priceGroup.trim()) categories.push(`Price:${form.priceGroup.trim()}`);

    upsertProduct({
      id,
      name,
      description: form.description.trim() || "Inventory item",
      price: Math.round(price * 100) / 100,
      stock,
      image: form.image.trim() || "/bouquet1.jpg",
      categories: categories.length ? categories : ["Occasion:General"],
    });

    setModalOpen(false);
  };

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();

    const lastPurchaseByProduct = new Map<string, string>();
    for (const o of orders) {
      for (const it of o.items) {
        const cur = lastPurchaseByProduct.get(it.productId);
        if (!cur || new Date(o.createdAt).getTime() > new Date(cur).getTime()) {
          lastPurchaseByProduct.set(it.productId, o.createdAt);
        }
      }
    }

    return products
      .map((p) => {
        const last = lastPurchaseByProduct.get(p.id);
        const lastPurchase = last ? new Date(last).toLocaleDateString() : "—";
        return {
          product: p,
          code: p.id.toUpperCase(),
          name: p.name,
          group: getGroupLabel(p.categories),
          lastPurchase,
          onHand: p.stock,
        };
      })
      .filter((r) => {
        if (!query) return true;
        return (
          r.code.toLowerCase().includes(query) ||
          r.name.toLowerCase().includes(query) ||
          r.group.toLowerCase().includes(query)
        );
      });
  }, [products, orders, q]);

  return (
    <main className="min-h-screen px-6 pt-24 pb-36">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-pink-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-pink-700/80">Admin</p>
              <h1 className="mt-1 text-2xl font-bold text-pink-800">Inventory Management</h1>
              <p className="mt-2 text-sm text-pink-700/80">
                Track bouquets on hand and recent purchasing activity.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search inventory..."
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-4 py-2 pr-10 text-sm text-pink-900 placeholder:text-pink-700/60 sm:w-[320px]"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-pink-700/60">
                  ⌕
                </span>
              </div>

              <button
                type="button"
                onClick={openAdd}
                className="rounded-2xl bg-pink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-800"
              >
                + Add Item
              </button>

              <Link
                href="/admin"
                className="rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-800 hover:bg-pink-50"
              >
                Back to Admin
              </Link>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-pink-200">
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse">
                <thead className="bg-[#fffaf5]">
                  <tr className="text-left text-xs font-semibold text-pink-800">
                    <th className="px-4 py-3">Item Code</th>
                    <th className="px-4 py-3">Item Name</th>
                    <th className="px-4 py-3">Item Group</th>
                    <th className="px-4 py-3">Last Purchase</th>
                    <th className="px-4 py-3">On Hand</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-sm text-pink-700/80">
                        No matching inventory items.
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => (
                      <tr key={r.code} className="border-t border-pink-100 text-sm text-pink-900">
                        <td className="px-4 py-3 font-mono text-xs text-pink-800">{r.code}</td>
                        <td className="px-4 py-3 font-semibold text-pink-900">{r.name}</td>
                        <td className="px-4 py-3 text-pink-800/90">{r.group}</td>
                        <td className="px-4 py-3 text-pink-800/80">{r.lastPurchase}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
                              r.onHand <= 5
                                ? "border-red-200 bg-red-50 text-red-700"
                                : "border-pink-200 bg-pink-50 text-pink-800"
                            }`}
                          >
                            {r.onHand}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="rounded-xl border border-pink-200 bg-white px-3 py-1.5 text-xs font-semibold text-pink-800 hover:bg-pink-50"
                              onClick={() => openEdit(r.product)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="rounded-xl bg-pink-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-pink-800"
                              onClick={() => openEdit(r.product)}
                            >
                              Restock
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-pink-700/75">
            <span>Showing 1–{Math.min(rows.length, rows.length)} of {rows.length} entries</span>
            <span className="rounded-full border border-pink-200 bg-[#fffaf5] px-3 py-1 font-semibold">Demo</span>
          </div>
        </div>
      </section>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onMouseDown={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-xl rounded-3xl border border-pink-200 bg-white p-5 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-pink-700/80">Inventory</p>
                <h2 className="mt-1 text-xl font-bold text-pink-800">
                  {editingId ? "Edit Item" : "Add Item"}
                </h2>
                <p className="mt-1 text-xs text-pink-700/80">Saved to local storage (demo).</p>
              </div>
              <button
                type="button"
                className="rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-1.5 text-sm font-semibold text-pink-800 hover:bg-pink-50"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs font-semibold text-pink-800">Item Code</span>
                <input
                  value={editingId ? form.id.toUpperCase() : form.id}
                  onChange={(e) => setForm((s) => ({ ...s, id: e.target.value }))}
                  disabled={!!editingId}
                  placeholder="e.g. blush-bloom"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900 placeholder:text-pink-700/60 disabled:opacity-60"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold text-pink-800">Item Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Bouquet name"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900 placeholder:text-pink-700/60"
                />
              </label>

              <label className="space-y-1 sm:col-span-2">
                <span className="text-xs font-semibold text-pink-800">Description</span>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  placeholder="Short description"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900 placeholder:text-pink-700/60"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold text-pink-800">Price ($)</span>
                <input
                  value={form.price}
                  onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold text-pink-800">On Hand</span>
                <input
                  value={form.stock}
                  onChange={(e) => setForm((s) => ({ ...s, stock: e.target.value }))}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold text-pink-800">Occasion</span>
                <input
                  value={form.occasion}
                  onChange={(e) => setForm((s) => ({ ...s, occasion: e.target.value }))}
                  placeholder="e.g. Anniversary"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900 placeholder:text-pink-700/60"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold text-pink-800">Flower Type</span>
                <input
                  value={form.flowerType}
                  onChange={(e) => setForm((s) => ({ ...s, flowerType: e.target.value }))}
                  placeholder="e.g. Roses"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900 placeholder:text-pink-700/60"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold text-pink-800">Price Group</span>
                <input
                  value={form.priceGroup}
                  onChange={(e) => setForm((s) => ({ ...s, priceGroup: e.target.value }))}
                  placeholder="e.g. Under$70"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900 placeholder:text-pink-700/60"
                />
              </label>

              <label className="space-y-1 sm:col-span-2">
                <span className="text-xs font-semibold text-pink-800">Image Path</span>
                <input
                  value={form.image}
                  onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
                  placeholder="/bouquet1.jpg"
                  className="w-full rounded-2xl border border-pink-200 bg-[#fffaf5] px-3 py-2 text-sm text-pink-900 placeholder:text-pink-700/60"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-800 hover:bg-pink-50"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-2xl bg-pink-700 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-800"
                onClick={save}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

