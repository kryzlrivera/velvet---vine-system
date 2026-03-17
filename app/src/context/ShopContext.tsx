"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products as initialProducts } from "@/lib/data";
import type { CartItem, Order, OrderStatus, Profile, Product, Message } from "@/lib/types";

type UserRole = "customer" | "admin" | "rider" | null;

type ShopContextType = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  profile: Profile;
  messages: Message[];
  lowStockAlert: string | null;
  currentUserRole: UserRole;
  username: string | null;
  upsertProduct: (product: Product) => void;
  addToCart: (productId: string, quantity: number, note?: string, wrap?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  updateCartItem: (productId: string, data: Partial<{ note: string; wrap: string }>) => void;
  updateProfile: (profile: Profile) => void;
  placeOrder: (
    deliveryAddress: string,
    contactPhone: string,
    deliveryOption: "Standard" | "Express" | "Same-day",
    paymentMethod: "Credit Card" | "PayPal" | "Cash on Delivery",
    deliveryLatLng?: { lat: number; lng: number } | null,
  ) => void;
  sendMessage: (text: string, from: "customer" | "admin") => void;
  advanceOrderStatus: (orderId: string) => void;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  signIn: (username: string, role: UserRole) => void;
  signOut: () => void;
  signUp: (username: string, role: UserRole) => void;
};

const defaultProfile: Profile = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const defaultValue = {
  products: initialProducts,
  cart: [],
  orders: [],
  profile: defaultProfile,
  messages: [],
  lowStockAlert: null,
  currentUserRole: null,
  username: null,
  upsertProduct: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQty: () => {},
  updateCartItem: () => {},
  updateProfile: () => {},
  placeOrder: () => {},
  sendMessage: () => {},
  advanceOrderStatus: () => {},
  setOrderStatus: () => {},
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
};

const ShopContext = createContext<ShopContextType>(defaultValue);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("vv_products") : null;
    if (stored) return JSON.parse(stored) as Product[];
    return initialProducts;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("vv_cart") : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("vv_orders") : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [profile, setProfile] = useState<Profile>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("vv_profile") : null;
    return stored ? JSON.parse(stored) : defaultProfile;
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("vv_messages") : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [lowStockAlert, setLowStockAlert] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("vv_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("vv_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("vv_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("vv_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("vv_messages", JSON.stringify(messages));
  }, [messages]);

  const upsertProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx === -1) return [product, ...prev];
      return prev.map((p) => (p.id === product.id ? product : p));
    });
  }, []);

  const addToCart = (productId: string, quantity: number, note?: string, wrap?: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock < quantity) {
      setLowStockAlert("Sorry, not enough stock available.");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity, note, wrap }
            : item,
        );
      }
      return [...prev, { productId, quantity, note, wrap }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateProfile = (nextProfile: Profile) => {
    setProfile(nextProfile);
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const updateCartItem = (productId: string, data: Partial<{ note: string; wrap: string }>) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              note: data.note !== undefined ? data.note : item.note,
              wrap: data.wrap !== undefined ? data.wrap : item.wrap,
            }
          : item,
      ),
    );
  };

  const placeOrder = (
    deliveryAddress: string,
    contactPhone: string,
    deliveryOption: "Standard" | "Express" | "Same-day",
    paymentMethod: "Credit Card" | "PayPal" | "Cash on Delivery",
    deliveryLatLng?: { lat: number; lng: number } | null,
  ) => {
    if (cart.length === 0) {
      setLowStockAlert("Cart is empty.");
      return;
    }
    if (!deliveryAddress || !contactPhone) {
      setLowStockAlert("Please provide delivery address and contact phone.");
      return;
    }

    const orderTotal = cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);

    const mapsQuery = deliveryLatLng
      ? `${deliveryLatLng.lat},${deliveryLatLng.lng}`
      : deliveryAddress;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

    const order: Order = {
      id: `order_${Date.now()}`,
      items: cart,
      total: orderTotal,
      createdAt: new Date().toISOString(),
      status: "In Arrangement",
      deliveryAddress,
      deliveryLat: deliveryLatLng?.lat,
      deliveryLng: deliveryLatLng?.lng,
      contactPhone,
      deliveryOption,
      paymentMethod,
      mapsUrl,
      customerName: profile.name || username || "Guest",
      customerEmail: profile.email || "unknown@velvetvine.com",
    };

    setOrders((old) => [order, ...old]);

    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((item) => item.productId === p.id);
        if (cartItem) {
          const newStock = p.stock - cartItem.quantity;
          if (newStock <= 5) {
            setLowStockAlert(`Low stock alert: ${p.name} has only ${newStock} left.`);
          }
          return { ...p, stock: Math.max(0, newStock) };
        }
        return p;
      }),
    );

    setCart([]);
    setLowStockAlert("Order placed! You will receive an email confirmation shortly.");

    setMessages((old) => [
      ...old,
      {
        id: `msg_${Date.now()}`,
        from: "admin",
        text: "Your order has been received and is in arrangement.",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const sendMessage = (text: string, from: "customer" | "admin") => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      from,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((old) => [...old, newMessage]);

    if (from === "customer") {
      setTimeout(() => {
        setMessages((old) => [
          ...old,
          {
            id: `msg_${Date.now()}_${Math.random()}`,
            from: "admin",
            text: "Thanks for reaching out! Our team will get back to you within 1 hour.",
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 1200);
    }
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders((old) =>
      old.map((order) => {
        if (order.id !== orderId) return order;
        const next =
          order.status === "In Arrangement"
            ? "Out for Delivery"
            : order.status === "Out for Delivery"
            ? "Delivered"
            : "Delivered";
        return { ...order, status: next };
      }),
    );
  };

  const setOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((old) => old.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  const signIn = (name: string, role: UserRole) => {
    setUsername(name);
    setCurrentUserRole(role);
  };

  const signOut = () => {
    setUsername(null);
    setCurrentUserRole(null);
  };

  const signUp = (name: string, role: UserRole) => {
    // no backend; direct sign-in after sign-up
    setUsername(name);
    setCurrentUserRole(role);
  };

  const value = useMemo(
    () => ({
      products,
      cart,
      orders,
      profile,
      messages,
      lowStockAlert,
      currentUserRole,
      username,
      upsertProduct,
      addToCart,
      removeFromCart,
      updateCartQty,
      updateCartItem,
      updateProfile,
      placeOrder,
      sendMessage,
      advanceOrderStatus,
      setOrderStatus,
      signIn,
      signOut,
      signUp,
    }),
    [products, cart, orders, profile, messages, lowStockAlert, currentUserRole, username, upsertProduct],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);
