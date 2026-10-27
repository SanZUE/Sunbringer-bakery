import { useEffect, useState } from "react";
import {
  Bike,
  CheckCircle2,
  Croissant,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBasket,
  Store,
  Trash2,
  X,
} from "lucide-react";
import { WHATSAPP_NUMBER, rupiah } from "../data";
import type { CartItem } from "../shared";
import { cn } from "../utils/cn";

const LINKS = [
  { href: "#jadwal", label: "Jadwal Oven" },
  { href: "#menu", label: "Menu" },
  { href: "#paket", label: "Paket" },
  { href: "#hampers", label: "Hampers" },
  { href: "#cerita", label: "Cerita" },
  { href: "#faq", label: "FAQ" },
];

export function Nav({ count, onOpenCart }: { count: number; onOpenCart: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "bg-butter-400/95 shadow-[0_2px_0_0_rgba(23,12,3,1)] backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#beranda" className="flex items-center gap-2.5" aria-label="RotiRumah — beranda">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-cocoa-900 bg-cocoa-900 text-butter-400 shadow-[3px_3px_0_0_rgba(228,87,46,1)]">
            <Croissant className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-cocoa-950">
            Roti<span className="text-papaya-600">Rumah</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-bold text-cocoa-900/80 transition-colors hover:bg-cocoa-900/10 hover:text-cocoa-950"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-cocoa-50 px-4 py-2 text-sm font-extrabold text-cocoa-900 transition-all hover:-translate-y-0.5 hover:bg-white"
            aria-label={`Buka keranjang, ${count} item`}
          >
            <ShoppingBasket className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Keranjang</span>
            {count > 0 && (
              <span
                key={count}
                className="absolute -top-2 -right-2 flex h-6 min-w-6 animate-pop items-center justify-center rounded-full bg-papaya-500 px-1.5 text-xs font-extrabold text-white"
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cocoa-900 bg-cocoa-50 text-cocoa-900 lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t-2 border-cocoa-900 bg-butter-300 px-5 py-4 lg:hidden" aria-label="Navigasi mobile">
          <div className="grid grid-cols-2 gap-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border-2 border-cocoa-900/15 bg-cocoa-50 px-4 py-3 text-sm font-bold text-cocoa-900 transition-colors hover:border-cocoa-900"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdate,
  onRemove,
  onClear,
}: {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  const itemCount = items.reduce((s, it) => s + it.qty, 0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const waText = encodeURIComponent(
    `Halo RotiRumah! Saya mau pesan 🍞\n\n` +
      items.map((it, i) => `${i + 1}. ${it.name}${it.detail ? ` (${it.detail})` : ""} × ${it.qty} = ${rupiah(it.price * it.qty)}`).join("\n") +
      `\n\nTotal: ${rupiah(total)}\nMetode: ${method === "pickup" ? "Pickup di dapur (gratis)" : "Delivery (ongkir menyusul)"}\n\nMohon dikonfirmasi ketersediaan & jadwalnya ya!`
  );

  return (
    <div className={cn("fixed inset-0 z-50", !open && "pointer-events-none")} aria-hidden={!open}>
      <div
        className={cn("absolute inset-0 bg-cocoa-950/60 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-cocoa-50 shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Keranjang belanja"
      >
        <div className="flex items-center justify-between border-b-2 border-cocoa-900/10 px-6 py-4">
          <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-cocoa-900">
            <ShoppingBasket className="h-5 w-5 text-papaya-500" /> Keranjang
            {itemCount > 0 && <span className="rounded-full bg-butter-400 px-2 py-0.5 text-xs font-extrabold">{itemCount} item</span>}
          </h2>
          <button onClick={onClose} aria-label="Tutup keranjang" className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cocoa-900/15 text-cocoa-900 transition-colors hover:border-cocoa-900">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="text-5xl" aria-hidden>🧺</span>
              <p className="mt-4 font-display text-lg font-extrabold text-cocoa-900">Keranjangnya masih kosong</p>
              <p className="mt-1 max-w-[240px] text-sm text-cocoa-700/70">Roti hangat tidak akan menunggu lama — yuk pilih favoritmu.</p>
              <a href="#menu" onClick={onClose} className="mt-5 rounded-full bg-cocoa-900 px-6 py-2.5 text-sm font-bold text-butter-300 transition-colors hover:bg-papaya-500 hover:text-white">
                Lihat Menu
              </a>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="animate-pop rounded-2xl border-2 border-cocoa-900/10 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-cocoa-900">{it.name}</p>
                      {it.detail && <p className="mt-0.5 text-xs text-cocoa-500">{it.detail}</p>}
                    </div>
                    <button onClick={() => onRemove(it.id)} aria-label={`Hapus ${it.name}`} className="text-cocoa-300 transition-colors hover:text-papaya-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdate(it.id, it.qty - 1)} aria-label="Kurangi" className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-cocoa-900/20 transition-colors hover:border-cocoa-900">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-extrabold tabular-nums">{it.qty}</span>
                      <button onClick={() => onUpdate(it.id, it.qty + 1)} aria-label="Tambah" className="flex h-7 w-7 items-center justify-center rounded-full bg-cocoa-900 text-butter-300 transition-colors hover:bg-papaya-500">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="font-display text-base font-extrabold text-cocoa-900 tabular-nums">{rupiah(it.price * it.qty)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t-2 border-cocoa-900/10 bg-white px-6 py-5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMethod("pickup")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-all",
                  method === "pickup" ? "border-cocoa-900 bg-butter-300" : "border-cocoa-900/15 text-cocoa-700 hover:border-cocoa-900/40"
                )}
              >
                <Store className="h-4 w-4" /> Pickup · Gratis
              </button>
              <button
                onClick={() => setMethod("delivery")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-all",
                  method === "delivery" ? "border-cocoa-900 bg-butter-300" : "border-cocoa-900/15 text-cocoa-700 hover:border-cocoa-900/40"
                )}
              >
                <Bike className="h-4 w-4" /> Delivery · 8 km
              </button>
            </div>
            {method === "delivery" && (
              <p className="mt-2 text-xs font-semibold text-cocoa-500">Ongkir dihitung sesuai jarak, dikonfirmasi via WhatsApp.</p>
            )}
            <div className="mt-4 flex items-end justify-between">
              <span className="text-sm font-bold text-cocoa-700">Subtotal</span>
              <span className="font-display text-2xl font-extrabold text-cocoa-900 tabular-nums">{rupiah(total)}</span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-leaf-500 px-6 py-3.5 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-leaf-600 active:scale-[0.98]"
            >
              <MessageCircle className="h-4.5 w-4.5" /> Checkout via WhatsApp
            </a>
            <div className="mt-3 flex items-center justify-between">
              <p className="flex items-center gap-1 text-[11px] font-semibold text-cocoa-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-leaf-500" /> Pesanan dikonfirmasi manual oleh kami
              </p>
              <button onClick={onClear} className="text-[11px] font-bold text-cocoa-300 underline-offset-2 transition-colors hover:text-papaya-500 hover:underline">
                Kosongkan
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex animate-pop items-center gap-2.5 rounded-full border-2 border-cocoa-900 bg-cocoa-900 px-5 py-3 text-sm font-bold text-butter-300 shadow-[0_12px_30px_-8px_rgba(23,12,3,0.5)]">
        <CheckCircle2 className="h-4.5 w-4.5 text-leaf-500" />
        {message}
      </div>
    </div>
  );
}