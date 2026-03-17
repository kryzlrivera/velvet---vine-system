"use client";

import { FormEvent } from "react";
import { useShop } from "@/context/ShopContext";

export default function ProfilePage() {
  const { profile, updateProfile } = useShop();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      phone: { value: string };
      address: { value: string };
    };
    updateProfile({
      name: target.name.value,
      email: target.email.value,
      phone: target.phone.value,
      address: target.address.value,
    });
    alert("Profile updated successfully.");
  };

  return (
    <main className="min-h-screen px-6 pt-24 pb-36">
      <section className="mx-auto max-w-2xl rounded-3xl border border-pink-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-pink-700">Profile & Delivery Info</h1>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-pink-600">Name</span>
            <input
              name="name"
              defaultValue={profile.name}
              className="mt-1 w-full rounded-lg border border-pink-300 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-pink-600">Email</span>
            <input
              type="email"
              name="email"
              defaultValue={profile.email}
              className="mt-1 w-full rounded-lg border border-pink-300 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-pink-600">Phone</span>
            <input
              name="phone"
              defaultValue={profile.phone}
              className="mt-1 w-full rounded-lg border border-pink-300 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-pink-600">Address</span>
            <input
              name="address"
              defaultValue={profile.address}
              className="mt-1 w-full rounded-lg border border-pink-300 px-3 py-2"
            />
          </label>
          <button className="rounded-full bg-pink-700 px-5 py-2 text-white hover:bg-pink-800" type="submit">
            Save Profile
          </button>
        </form>
      </section>
    </main>
  );
}
