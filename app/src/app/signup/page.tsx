"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";

export default function SignUpPage() {
  const { signUp } = useShop();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"customer" | "admin" | "rider">("customer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(username, role);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-pink-50 pt-28">
      <section className="mx-auto max-w-md rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-pink-700">Sign Up</h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-pink-600">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-pink-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-pink-600">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "customer" | "admin" | "rider")}
              className="mt-1 w-full rounded-lg border border-pink-300 px-3 py-2"
            >
              <option value="customer">User</option>
              <option value="rider">Delivery Driver</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full rounded-full bg-pink-700 px-4 py-2 text-white">
            Sign Up
          </button>
          <p className="text-sm text-pink-600">
            Already have an account? <a href="/signin" className="font-semibold text-pink-700 underline">Sign In</a>
          </p>
        </form>
      </section>
    </main>
  );
}
