import { useCallback, useEffect, useRef, useState } from "react";
import { CartDrawer, Nav, Toast } from "./components/Chrome";
import { Hero, OvenSchedule } from "./components/Hero";
import { HampersBuilder, MenuSection, Packages } from "./components/Shop";
import { Faq, Footer, Story, Testimonials } from "./components/Story";
import type { AddToCart, CartItem } from "./shared";

const STORAGE_KEY = "rotirumah-cart";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* private mode — ignore */
    }
  }, [cart]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const addToCart: AddToCart = useCallback(
    (item, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((it) => it.id === item.id);
        if (existing) {
          return prev.map((it) => (it.id === item.id ? { ...it, qty: it.qty + qty } : it));
        }
        return [...prev, { ...item, qty }];
      });
      showToast(`${item.name} masuk keranjang!`);
    },
    [showToast]
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((it) => it.id !== id) : prev.map((it) => (it.id === id ? { ...it, qty } : it))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const count = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <div className="min-h-screen font-body">
      <Nav count={count} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <OvenSchedule />
        <MenuSection onAdd={addToCart} />
        <Packages onAdd={addToCart} />
        <HampersBuilder onAdd={addToCart} />
        <Story />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdate={updateQty}
        onRemove={removeItem}
        onClear={clearCart}
      />
      <Toast message={toast} />
    </div>
  );
}