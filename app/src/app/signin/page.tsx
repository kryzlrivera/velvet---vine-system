"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";

export default function SignInPage() {
  const { signIn } = useShop();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"customer" | "admin" | "rider">("customer");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vv_rememberMe");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.role) setRole(parsed.role);
        setRememberMe(true);
      } catch (err) {}
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("vv_rememberMe", JSON.stringify({ username, role }));
    } else {
      localStorage.removeItem("vv_rememberMe");
    }
    signIn(username, role);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-pink-50 pt-28">
      <section className="mx-auto max-w-md rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-pink-700">Sign In</h1>
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-pink-300 text-pink-700 focus:ring-pink-700"
            />
            <label htmlFor="remember" className="text-sm font-semibold text-pink-700">Remember me</label>
          </div>
          <button type="submit" className="w-full rounded-full bg-pink-700 px-4 py-2 text-white">
            Sign In
          </button>
          <p className="text-sm text-pink-600">
            New? <a href="/signup" className="font-semibold text-pink-700 underline">Create account</a>
          </p>
        </form>
      </section>
    </main>
  );
}
