import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarClock,
  Gift,
  MessageCircle,
  Minus,
  Package,
  Plus,
  ShoppingBasket,
  Sparkles,
  Tag,
} from "lucide-react";
import {
  CATEGORIES,
  HAMPER_ITEMS,
  HAMPER_SIZES,
  PACKAGES,
  PRODUCTS,
  WHATSAPP_NUMBER,
  rupiah,
  type Product,
} from "../data";
import { Reveal, SectionHeading, type AddToCart } from "../shared";
import { cn } from "../utils/cn";

/* ---------------- MENU ---------------- */

function ProductCard({ p, onAdd, index }: { p: Product; onAdd: AddToCart; index: number }) {
  const soldOut = p.stock === 0 && !p.preorder;
  return (
    <Reveal delay={(index % 4) * 70} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-cocoa-900/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-cocoa-900 hover:shadow-[7px_7px_0_0_rgba(23,12,3,0.9)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-108",
              soldOut && "grayscale"
            )}
          />
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {p.bestSeller && (
              <span className="inline-flex items-center gap-1 rounded-full bg-butter-400 px-2.5 py-1 text-[11px] font-extrabold text-cocoa-900 shadow-sm">
                <BadgeCheck className="h-3.5 w-3.5" /> Best Seller
              </span>
            )}
            {p.preorder && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cocoa-900 px-2.5 py-1 text-[11px] font-extrabold text-butter-300 shadow-sm">
                <CalendarClock className="h-3.5 w-3.5" /> PO untuk besok
              </span>
            )}
          </div>
          {!p.preorder && p.stock > 0 && (
            <span
              className={cn(
                "absolute right-3 bottom-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-sm",
                p.stock <= 5 ? "bg-papaya-500 text-white" : "bg-white/90 text-cocoa-800"
              )}
            >
              {p.stock <= 5 ? `Tinggal ${p.stock} lagi!` : `Sisa ${p.stock}`}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[11px] font-bold tracking-widest text-cocoa-500 uppercase">{p.category}</p>
          <h3 className="mt-1 font-display text-xl font-extrabold text-cocoa-900">{p.name}</h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-cocoa-700/75">{p.desc}</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-xl font-extrabold text-cocoa-900">{rupiah(p.price)}</p>
              <p className="text-[11px] font-semibold text-cocoa-500">/ {p.unit}</p>
            </div>
            <button
              onClick={() =>
                onAdd({
                  id: p.preorder ? p.id + "-po" : p.id,
                  name: p.name + (p.preorder ? " (PO besok)" : ""),
                  detail: p.unit,
                  price: p.price,
                })
              }
              disabled={soldOut}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-all active:scale-95",
                soldOut
                  ? "cursor-not-allowed bg-cocoa-100 text-cocoa-300"
                  : "bg-cocoa-900 text-butter-300 hover:bg-papaya-500 hover:text-white"
              )}
            >
              <Plus className="h-4 w-4" />
              {p.preorder ? "PO" : "Tambah"}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function MenuSection({ onAdd }: { onAdd: AddToCart }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Semua");
  const filtered = useMemo(
    () => (cat === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <section id="menu" className="relative bg-cocoa-100/60 py-20 sm:py-24">
      <div className="texture-dots absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Menu hari ini"
          title={
            <>
              Pilih yang masih <span className="text-papaya-500">hangat</span>
            </>
          }
          desc="Stok diperbarui setiap batch keluar dari oven. Yang bertanda PO bisa dipesan untuk besok — semuanya dibuat tanpa pengawet."
        />

        <Reveal delay={120}>
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Kategori menu">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  "shrink-0 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all",
                  cat === c
                    ? "border-cocoa-900 bg-cocoa-900 text-butter-300 shadow-[3px_3px_0_0_rgba(228,87,46,1)]"
                    : "border-cocoa-900/15 bg-white text-cocoa-700 hover:border-cocoa-900/50"
                )}
              >
                {c}
                <span className="ml-1.5 text-xs opacity-60">
                  {c === "Semua" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} p={p} onAdd={onAdd} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PACKAGES ---------------- */

export function Packages({ onAdd }: { onAdd: AddToCart }) {
  return (
    <section id="paket" className="relative overflow-hidden bg-cocoa-900 py-20 text-cocoa-50 sm:py-24">
      <div className="texture-dots-light absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            light
            kicker="Bundling hemat"
            title={<>Paket untuk momen spesial</>}
            desc="Sudah dikurasi, sudah dihitung hematnya. Tinggal pilih momennya: ngopi berdua, kumpul keluarga, atau kirim hadiah."
          />
          <Reveal delay={150}>
            <div className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-4 py-2 text-sm font-extrabold text-cocoa-900">
              <Tag className="h-4 w-4" /> Hemat s.d. Rp16.000
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 110} className="h-full">
              <article
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-3xl border-2 transition-all duration-300 hover:-translate-y-2",
                  pkg.accent === "butter" && "border-butter-400/60 bg-cocoa-800",
                  pkg.accent === "cocoa" && "border-cocoa-500/50 bg-cocoa-800",
                  pkg.accent === "papaya" && "border-papaya-500/70 bg-cocoa-800"
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <span
                    className={cn(
                      "absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-extrabold",
                      pkg.accent === "butter" && "bg-butter-400 text-cocoa-900",
                      pkg.accent === "cocoa" && "bg-cocoa-50 text-cocoa-900",
                      pkg.accent === "papaya" && "bg-papaya-500 text-white"
                    )}
                  >
                    Hemat {rupiah(pkg.originalPrice - pkg.price)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-extrabold">{pkg.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cocoa-100/70">{pkg.tagline}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {pkg.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-cocoa-100/90">
                        <Package className="mt-0.5 h-4 w-4 shrink-0 text-butter-400" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-cocoa-100/50 line-through">{rupiah(pkg.originalPrice)}</p>
                      <p className="font-display text-2xl font-extrabold text-butter-400">{rupiah(pkg.price)}</p>
                    </div>
                    <button
                      onClick={() => onAdd({ id: pkg.id, name: pkg.name, detail: "paket bundling", price: pkg.price })}
                      className="inline-flex items-center gap-1.5 rounded-full bg-butter-400 px-5 py-2.5 text-sm font-extrabold text-cocoa-900 transition-all hover:bg-butter-300 active:scale-95"
                    >
                      <ShoppingBasket className="h-4 w-4" /> Pilih
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HAMPERS BUILDER ---------------- */

export function HampersBuilder({ onAdd }: { onAdd: AddToCart }) {
  const [sizeId, setSizeId] = useState("sedang");
  const [selected, setSelected] = useState<Record<string, number>>({ "h-bolen": 1, "h-sobek": 1, "h-cookies": 1 });
  const [boxes, setBoxes] = useState(1);
  const [card, setCard] = useState(true);

  const size = HAMPER_SIZES.find((s) => s.id === sizeId)!;
  const count = Object.values(selected).reduce((a, b) => a + b, 0);
  const itemsTotal = HAMPER_ITEMS.reduce((sum, it) => sum + (selected[it.id] ?? 0) * it.price, 0);
  const perBox = size.base + itemsTotal + (card ? 5000 : 0);
  const total = perBox * boxes;
  const full = count >= size.capacity;
  const empty = count === 0;

  const toggle = (id: string, delta: number) => {
    setSelected((prev) => {
      const cur = prev[id] ?? 0;
      const next = cur + delta;
      const curCount = Object.values(prev).reduce((a, b) => a + b, 0);
      if (delta > 0 && curCount >= size.capacity) return prev;
      const copy = { ...prev };
      if (next <= 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  const changeSize = (id: string) => {
    setSizeId(id);
    const cap = HAMPER_SIZES.find((s) => s.id === id)!.capacity;
    setSelected((prev) => {
      let remaining = cap;
      const copy: Record<string, number> = {};
      for (const [k, v] of Object.entries(prev)) {
        const take = Math.min(v, remaining);
        if (take > 0) copy[k] = take;
        remaining -= take;
      }
      return copy;
    });
  };

  const summary = HAMPER_ITEMS.filter((it) => selected[it.id])
    .map((it) => `${selected[it.id]}× ${it.name}`)
    .join(", ");

  const waText = encodeURIComponent(
    `Halo RotiRumah! Saya mau pesan hampers racikan sendiri 🎁\n\n` +
      `Ukuran: ${size.name} (${count}/${size.capacity} isi)\nIsi: ${summary || "-"}\n` +
      `Kartu ucapan: ${card ? "Ya" : "Tidak"}\nJumlah: ${boxes} box\nEstimasi total: ${rupiah(total)}\n\nMohon dikonfirmasi ya!`
  );

  return (
    <section id="hampers" className="relative bg-cocoa-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Ide baru · racik sendiri"
          title={
            <>
              Racik hampers-mu <span className="text-papaya-500">sendiri</span>
            </>
          }
          desc="Pilih ukuran box, isi dengan roti favorit, tambah kartu ucapan tulis tangan. Harga langsung terhitung — tidak perlu tunggu balasan chat."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Builder */}
          <div className="space-y-8">
            <Reveal>
              <p className="mb-3 flex items-center gap-2 text-sm font-extrabold tracking-wide text-cocoa-900 uppercase">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cocoa-900 text-xs text-butter-300">1</span>
                Pilih ukuran box
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {HAMPER_SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => changeSize(s.id)}
                    className={cn(
                      "rounded-2xl border-2 p-4 text-left transition-all",
                      sizeId === s.id
                        ? "border-cocoa-900 bg-butter-300 shadow-[5px_5px_0_0_rgba(23,12,3,0.9)]"
                        : "border-cocoa-900/15 bg-white hover:border-cocoa-900/50"
                    )}
                  >
                    <p className="font-display text-lg font-extrabold text-cocoa-900">{s.name}</p>
                    <p className="text-xs font-semibold text-cocoa-700/70">{s.capacity} isi · mulai {rupiah(s.base)}</p>
                    <p className="mt-1.5 text-[11px] font-bold text-papaya-600">{s.note}</p>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-sm font-extrabold tracking-wide text-cocoa-900 uppercase">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cocoa-900 text-xs text-butter-300">2</span>
                  Isi box-nya
                </p>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-extrabold",
                    full ? "bg-leaf-500/15 text-leaf-600" : "bg-butter-200 text-cocoa-800"
                  )}
                >
                  {count}/{size.capacity} terisi {full && "· penuh ✓"}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {HAMPER_ITEMS.map((it) => {
                  const qty = selected[it.id] ?? 0;
                  return (
                    <div
                      key={it.id}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-2xl border-2 bg-white p-4 transition-all",
                        qty > 0 ? "border-cocoa-900" : "border-cocoa-900/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" aria-hidden>{it.emoji}</span>
                        <div>
                          <p className="text-sm font-extrabold text-cocoa-900">{it.name}</p>
                          <p className="text-xs font-semibold text-cocoa-500">+{rupiah(it.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label={`Kurangi ${it.name}`}
                          onClick={() => toggle(it.id, -1)}
                          disabled={qty === 0}
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cocoa-900/20 text-cocoa-900 transition-colors hover:border-cocoa-900 disabled:opacity-25"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-extrabold tabular-nums">{qty}</span>
                        <button
                          aria-label={`Tambah ${it.name}`}
                          onClick={() => toggle(it.id, 1)}
                          disabled={full}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-cocoa-900 text-butter-300 transition-colors hover:bg-papaya-500 hover:text-white disabled:opacity-25"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <p className="mb-3 flex items-center gap-2 text-sm font-extrabold tracking-wide text-cocoa-900 uppercase">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cocoa-900 text-xs text-butter-300">3</span>
                Sentuhan akhir
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-cocoa-900/10 bg-white px-4 py-3 transition-colors has-checked:border-cocoa-900">
                  <input type="checkbox" checked={card} onChange={(e) => setCard(e.target.checked)} className="h-4 w-4 accent-papaya-500" />
                  <span className="text-sm font-bold text-cocoa-900">Kartu ucapan tulis tangan <span className="text-cocoa-500">(+Rp5.000)</span></span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border-2 border-cocoa-900/10 bg-white px-4 py-2.5">
                  <span className="text-sm font-bold text-cocoa-900">Jumlah box</span>
                  <button
                    aria-label="Kurangi jumlah box"
                    onClick={() => setBoxes((b) => Math.max(1, b - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cocoa-900/20 transition-colors hover:border-cocoa-900"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-extrabold tabular-nums">{boxes}</span>
                  <button
                    aria-label="Tambah jumlah box"
                    onClick={() => setBoxes((b) => Math.min(50, b + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-cocoa-900 text-butter-300 transition-colors hover:bg-papaya-500"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Summary */}
          <Reveal delay={200}>
            <div className="sticky top-24 overflow-hidden rounded-3xl border-2 border-cocoa-900 bg-cocoa-900 text-cocoa-50 shadow-[8px_8px_0_0_rgba(255,197,61,1)]">
              <img src={`${import.meta.env.BASE_URL}images/hampers.jpg`} alt="Hampers RotiRumah" className="aspect-[16/9] w-full object-cover" />
              <div className="p-6">
                <p className="flex items-center gap-2 font-display text-xl font-extrabold">
                  <Gift className="h-5 w-5 text-butter-400" /> Ringkasan hampers
                </p>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between"><dt className="text-cocoa-100/70">{size.name} (dasar)</dt><dd className="font-bold">{rupiah(size.base)}</dd></div>
                  <div className="flex justify-between"><dt className="text-cocoa-100/70">Isi ({count} item)</dt><dd className="font-bold">{rupiah(itemsTotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-cocoa-100/70">Kartu ucapan</dt><dd className="font-bold">{card ? rupiah(5000) : "—"}</dd></div>
                  <div className="flex justify-between border-t border-cocoa-100/15 pt-2.5"><dt className="text-cocoa-100/70">Per box</dt><dd className="font-bold">{rupiah(perBox)}</dd></div>
                  <div className="flex justify-between"><dt className="text-cocoa-100/70">Jumlah</dt><dd className="font-bold">× {boxes} box</dd></div>
                </dl>
                {summary && <p className="mt-3 rounded-xl bg-cocoa-800 px-3 py-2 text-xs leading-relaxed text-cocoa-100/80">{summary}</p>}
                <div className="mt-4 flex items-end justify-between border-t-2 border-dashed border-cocoa-100/20 pt-4">
                  <span className="text-sm font-bold text-cocoa-100/70">Estimasi total</span>
                  <span className="font-display text-3xl font-extrabold text-butter-400 tabular-nums">{rupiah(total)}</span>
                </div>
                <div className="mt-5 grid gap-2.5">
                  <button
                    disabled={empty}
                    onClick={() =>
                      onAdd(
                        {
                          id: `hampers-${size.id}-${Date.now()}`,
                          name: `Hampers ${size.name} (custom)`,
                          detail: `${summary || "kosong"}${card ? " + kartu ucapan" : ""}`,
                          price: perBox,
                        },
                        boxes
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-butter-400 px-5 py-3 text-sm font-extrabold text-cocoa-900 transition-all hover:bg-butter-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ShoppingBasket className="h-4 w-4" /> Masukkan ke Keranjang
                  </button>
                  <a
                    href={empty ? undefined : `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={empty}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-full border-2 border-butter-400/60 px-5 py-3 text-sm font-extrabold text-butter-300 transition-all hover:bg-butter-400/10",
                      empty && "pointer-events-none opacity-40"
                    )}
                  >
                    <MessageCircle className="h-4 w-4" /> Langsung via WhatsApp
                  </a>
                </div>
                {empty && (
                  <p className="mt-3 flex items-center gap-1.5 text-center text-xs font-semibold text-papaya-500">
                    <Sparkles className="h-3.5 w-3.5" /> Isi minimal satu roti dulu ya!
                  </p>
                )}
                <p className="mt-3 text-[11px] leading-relaxed text-cocoa-100/50">
                  PO H-1 · Untuk 25+ box, pesan H-3 agar semua tetap fresh dari oven.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}