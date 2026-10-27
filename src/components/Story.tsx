import { useState } from "react";
import {
  ChevronDown,
  Clock,
  Croissant,
  Flame,
  Heart,
  Camera,
  MapPin,
  MessageCircle,
  Quote,
  Star,
  Wheat,
} from "lucide-react";
import { FAQS, TESTIMONIALS, WHATSAPP_NUMBER } from "../data";
import { Reveal, SectionHeading } from "../shared";
import { cn } from "../utils/cn";

const STEPS = [
  { icon: Wheat, title: "Bahan jujur", desc: "Tepung protein tinggi, butter asli, telur segar dari pasar pagi. Tanpa pelembut, tanpa pengawet." },
  { icon: Clock, title: "Fermentasi sabar", desc: "Adonan diistirahatkan semalaman. Waktu yang tidak bisa dipangkas dari roti yang enak." },
  { icon: Flame, title: "Batch kecil", desc: "Empat kali panggang sehari sesuai kapasitas. Sedikit repot, tapi semua selalu fresh." },
  { icon: Heart, title: "Dikirim hangat", desc: "Dikemas begitu keluar oven, diantar ke tanganmu — atau kamu yang jemput ke dapur." },
];

export function Story() {
  return (
    <section id="cerita" className="relative overflow-hidden bg-butter-400 py-20 sm:py-24">
      <div className="texture-dots absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:max-w-none">
          <div className="overflow-hidden rounded-[36px] border-[6px] border-cocoa-900 shadow-[12px_12px_0_0_rgba(23,12,3,0.85)]">
            <img
              src="https://images.pexels.com/photos/6213717/pexels-photo-6213717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Roti sedang dipanggang di oven dapur RotiRumah"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -right-3 -bottom-6 animate-float rounded-2xl border-2 border-cocoa-900 bg-cocoa-900 px-5 py-4 text-cocoa-50 [--float-rot:2deg] sm:-right-6">
            <p className="font-display text-3xl font-extrabold text-butter-400">6 tahun</p>
            <p className="text-xs font-semibold text-cocoa-100/70">menyalakan oven yang sama,<br />setiap pagi jam 4</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            kicker="Cerita dapur"
            title={<>Dari dapur rumah, untuk rumah-rumah</>}
            desc="RotiRumah lahir tahun 2019 dari satu oven listrik dan pesanan tetangga. Sampai sekarang prinsipnya tidak berubah: kalau tidak layak untuk keluarga sendiri, tidak dijual."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="group h-full rounded-2xl border-2 border-cocoa-900/15 bg-cocoa-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cocoa-900 hover:bg-cocoa-50">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cocoa-900 text-butter-400 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-display text-lg font-extrabold text-cocoa-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cocoa-700/80">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="ulasan" className="bg-cocoa-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Kata tetangga"
          title={<>Mereka yang balik lagi (dan lagi)</>}
          desc="Lebih dari 320 ulasan, rata-rata 4.9. Sebagian besar pelanggan pertama kami adalah tetangga satu gang."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border-2 border-cocoa-900/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cocoa-900 hover:shadow-[6px_6px_0_0_rgba(255,197,61,1)]">
                <Quote className="h-6 w-6 text-butter-500" aria-hidden />
                <div className="mt-3 flex gap-0.5" aria-label={`Rating ${t.rating} dari 5`}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={cn("h-4 w-4", j < t.rating ? "fill-papaya-500 text-papaya-500" : "text-cocoa-100")} />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-cocoa-800">“{t.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-cocoa-900/10 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-butter-300 font-display text-sm font-extrabold text-cocoa-900">
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-cocoa-900">{t.name}</p>
                    <p className="text-xs font-semibold text-cocoa-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-cocoa-100/60 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            kicker="Sering ditanya"
            title={<>Tanya dulu, tidak apa-apa</>}
            desc="Belum terjawab? Chat langsung — dibalas oleh orang yang sama yang memanggang rotinya."
          />
          <Reveal delay={150}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo RotiRumah! Saya mau bertanya 🍞")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-leaf-500 px-6 py-3 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-leaf-600"
            >
              <MessageCircle className="h-4.5 w-4.5" /> Chat WhatsApp
            </a>
          </Reveal>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={cn("overflow-hidden rounded-2xl border-2 bg-white transition-colors", isOpen ? "border-cocoa-900" : "border-cocoa-900/10")}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-base font-extrabold text-cocoa-900 sm:text-lg">{f.q}</span>
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300", isOpen ? "rotate-180 bg-papaya-500 text-white" : "bg-cocoa-900/5 text-cocoa-900")}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={cn("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-cocoa-700/85">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cocoa-950 text-cocoa-100">
      {/* CTA band */}
      <div className="border-b border-cocoa-100/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-14 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-cocoa-50 text-balance sm:text-4xl">
              Besok pagi, sarapanmu <span className="text-butter-400">sudah kami pikirkan.</span>
            </h2>
            <p className="mt-2 text-sm text-cocoa-100/60">Pesan sebelum 20.00, roti keluar dari batch pertama besok pagi.</p>
          </Reveal>
          <Reveal delay={120}>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-7 py-3.5 text-sm font-extrabold text-cocoa-900 transition-all hover:-translate-y-0.5 hover:bg-butter-300"
            >
              <Croissant className="h-4.5 w-4.5" /> Pesan Sekarang
            </a>
          </Reveal>
        </div>
      </div>

      <div className="texture-dots-light absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#beranda" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-butter-400 text-cocoa-900">
              <Croissant className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-extrabold text-cocoa-50">
              Roti<span className="text-butter-400">Rumah</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cocoa-100/60">
            Roti rumahan, rasa istimewa. Dipanggang fresh empat kali sehari, tanpa pengawet, dari dapur rumah kami untuk rumahmu.
          </p>
          <div className="mt-5 flex gap-2.5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp RotiRumah"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa-100/20 text-cocoa-100/80 transition-all hover:-translate-y-0.5 hover:border-butter-400 hover:text-butter-400"
            >
              <MessageCircle className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://www.instagram.com/bundaihza01/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram RotiRumah"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa-100/20 text-cocoa-100/80 transition-all hover:-translate-y-0.5 hover:border-butter-400 hover:text-butter-400"
            >
              <Camera className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-widest text-butter-400 uppercase">
            <Clock className="h-4 w-4" /> Jam Dapur
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cocoa-100/70">
            <li className="flex justify-between gap-4"><span>Senin – Sabtu</span><span className="font-bold text-cocoa-50">07.00 – 18.00</span></li>
            <li className="flex justify-between gap-4"><span>Minggu</span><span className="font-bold text-cocoa-50">07.00 – 13.00</span></li>
            <li className="flex justify-between gap-4"><span>Batch oven</span><span className="font-bold text-cocoa-50">06 / 09 / 13 / 16</span></li>
            <li className="flex justify-between gap-4"><span>Batas PO besok</span><span className="font-bold text-cocoa-50">20.00 hari ini</span></li>
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-widest text-butter-400 uppercase">
            <MapPin className="h-4 w-4" /> Mampir / Pesan
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cocoa-100/70">
            <li><a href="https://www.google.com/maps/search/?api=1&query=P72W%2BRW5%2C%20Jl.%20Jati%20Rasa%20Tengah%2C%20RT.003%2FRW.007%2C%20Karangpawitan%2C%20Kec.%20Karawang%20Bar.%2C%20Karawang%2C%20Jawa%20Barat%2041311" target="_blank" rel="noreferrer" className="underline-offset-4 transition-colors hover:text-butter-400 hover:underline">P72W+RW5, Jl. Jati Rasa Tengah, RT.003/RW.007, Karangpawitan, Kec. Karawang Bar., Karawang, Jawa Barat 41311</a></li>
            <li>Pickup sesuai konfirmasi · Hubungi kami untuk delivery</li>
            <li>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="font-bold text-cocoa-50 underline-offset-4 transition-colors hover:text-butter-400 hover:underline">
                +62 895-3647-10807
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/bundaihza01/" target="_blank" rel="noreferrer" className="font-bold text-cocoa-50 underline-offset-4 transition-colors hover:text-butter-400 hover:underline">
                @bundaihza01
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cocoa-100/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-cocoa-100/40 sm:px-8">
          <p>© {new Date().getFullYear()} RotiRumah. Dibuat dengan butter asli & kesabaran.</p>
          <p>Konsep ulang dari rotirumah-web · roti kemarin tidak pernah dijual 🍞</p>
        </div>
      </div>
    </footer>
  );
}