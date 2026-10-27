import { ArrowDown, Clock, Flame, MapPin, MessageCircle, Star, Timer, CheckCircle2 } from "lucide-react";
import { BATCHES, WHATSAPP_NUMBER } from "../data";
import { Reveal, SectionHeading, useNow } from "../shared";
import { cn } from "../utils/cn";

function getNextBatch(now: Date) {
  for (const b of BATCHES) {
    const t = new Date(now);
    t.setHours(b.hour, 0, 0, 0);
    if (t.getTime() > now.getTime()) return { batch: b, target: t };
  }
  const t = new Date(now);
  t.setDate(t.getDate() + 1);
  t.setHours(BATCHES[0].hour, 0, 0, 0);
  return { batch: BATCHES[0], target: t, tomorrow: true };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Hero() {
  const now = useNow();
  const { batch, target, tomorrow } = getNextBatch(now);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return (
    <section id="beranda" className="relative overflow-hidden bg-butter-400">
      <div className="texture-dots absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:pt-32 lg:pb-24">
        {/* Copy */}
        <div>
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-2.5 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cocoa-900 px-3.5 py-1.5 text-butter-300">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-leaf-500" />
                Oven sedang menyala
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cocoa-900/20 bg-white/50 px-3.5 py-1.5 text-cocoa-800">
                <MapPin className="h-3.5 w-3.5" /> Dapur rumahan · sejak 2019
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-5xl leading-[0.98] font-extrabold tracking-tight text-cocoa-950 text-balance sm:text-6xl lg:text-7xl">
              Roti rumahan,
              <br />
              <span className="relative inline-block">
                rasa istimewa.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 14" fill="none" aria-hidden>
                  <path d="M3 10C60 3 180 2 297 8" stroke="#E4572E" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed font-medium text-cocoa-800/90">
              Dipanggang dalam batch kecil, empat kali sehari. Untuk sarapan,
              teman ngopi, hadiah, dan momen bersama orang terdekat — selalu
              fresh, tidak pernah roti kemarin.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#menu"
                className="group inline-flex items-center gap-2 rounded-full bg-cocoa-900 px-7 py-3.5 text-sm font-bold text-butter-300 shadow-[0_10px_30px_-10px_rgba(23,12,3,0.6)] transition-all hover:-translate-y-0.5 hover:bg-cocoa-800 hover:shadow-[0_16px_36px_-10px_rgba(23,12,3,0.6)]"
              >
                Lihat Menu Hari Ini
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo RotiRumah! Saya mau tanya-tanya dulu sebelum pesan 🍞")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900/80 px-6 py-3 text-sm font-bold text-cocoa-900 transition-all hover:-translate-y-0.5 hover:bg-cocoa-900 hover:text-butter-300"
              >
                <MessageCircle className="h-4 w-4" /> Tanya via WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Live countdown card */}
          <Reveal delay={320}>
            <div className="mt-10 inline-flex max-w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border-2 border-cocoa-900/90 bg-cocoa-50 px-5 py-4 shadow-[6px_6px_0_0_rgba(23,12,3,0.9)]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-papaya-500 text-white">
                  <Flame className="h-5 w-5" />
                  <span className="absolute -top-1.5 left-3 h-2 w-1 animate-steam rounded-full bg-cocoa-300" />
                  <span className="absolute -top-1.5 left-5 h-2 w-1 animate-steam rounded-full bg-cocoa-300 [animation-delay:0.7s]" />
                  <span className="absolute -top-1.5 left-7 h-2 w-1 animate-steam rounded-full bg-cocoa-300 [animation-delay:1.3s]" />
                </span>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-cocoa-500 uppercase">
                    {tomorrow ? "Batch pertama besok" : "Batch berikutnya"} · {batch.time}
                  </p>
                  <p className="text-sm font-bold text-cocoa-900">{batch.products}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border-cocoa-900/15 sm:border-l sm:pl-6">
                <Timer className="h-4 w-4 text-papaya-500" />
                <span className="font-display text-2xl font-extrabold text-cocoa-900 tabular-nums">
                  {pad(h)}:{pad(m)}:{pad(s)}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[36px] border-[6px] border-cocoa-900 shadow-[12px_12px_0_0_rgba(23,12,3,0.85)]">
              <img
                src="/images/hero-bread.jpg"
                alt="Aneka roti rumahan fresh dari oven RotiRumah"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -left-4 top-16 animate-float rounded-2xl border-2 border-cocoa-900 bg-cocoa-50 px-4 py-3 shadow-[5px_5px_0_0_rgba(23,12,3,0.9)] [--float-rot:-4deg] sm:-left-8">
              <div className="flex items-center gap-1 text-papaya-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-sm font-extrabold text-cocoa-900">4.9 / 5</p>
              <p className="text-[11px] font-semibold text-cocoa-500">320+ ulasan tetangga</p>
            </div>

            <div className="absolute -right-3 bottom-10 animate-float-slow rounded-2xl border-2 border-cocoa-900 bg-cocoa-900 px-4 py-3 text-cocoa-50 shadow-[5px_5px_0_0_rgba(23,12,3,0.35)] [--float-rot:3deg] sm:-right-6">
              <p className="font-display text-2xl font-extrabold text-butter-400">4×</p>
              <p className="text-[11px] font-semibold text-cocoa-100/80">panggang fresh<br />setiap hari</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee ticker */}
      <div className="relative border-y-2 border-cocoa-900 bg-cocoa-900 py-3">
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {[
                "Fresh dari oven",
                "Tanpa pengawet",
                "Pre-order H-1",
                "Pickup gratis",
                "Delivery radius 8 km",
                "Hampers custom",
                "Batch kecil, rasa maksimal",
              ].map((t) => (
                <span key={t} className="flex items-center gap-6 px-6 text-sm font-bold tracking-wide text-butter-300 uppercase">
                  {t} <span className="text-papaya-500">✶</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OvenSchedule() {
  const now = useNow(30000);
  const hour = now.getHours();

  return (
    <section id="jadwal" className="relative bg-cocoa-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Ide baru · transparansi dapur"
            title={<>Jadwal oven hari ini</>}
            desc="Kami panggang empat batch kecil setiap hari, bukan sekali di subuh. Lihat batch mana yang sudah keluar dan kapan roti paling hangat tersedia."
          />
          <Reveal delay={150}>
            <div className="flex items-center gap-2 rounded-full border border-cocoa-900/15 bg-white px-4 py-2 text-sm font-bold text-cocoa-700">
              <Clock className="h-4 w-4 text-papaya-500" />
              Sekarang pukul {pad(now.getHours())}.{pad(now.getMinutes())}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BATCHES.map((b, i) => {
            const done = hour >= b.hour + 1;
            const baking = hour >= b.hour - 1 && hour < b.hour + 1;
            return (
              <Reveal key={b.time} delay={i * 90}>
                <div
                  className={cn(
                    "group relative h-full rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1.5",
                    done && "border-cocoa-900/10 bg-white",
                    baking && "border-cocoa-900 bg-butter-300 shadow-[6px_6px_0_0_rgba(23,12,3,0.9)]",
                    !done && !baking && "border-dashed border-cocoa-900/25 bg-white/50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-4xl font-extrabold text-cocoa-900 tabular-nums">{b.time}</span>
                    {done ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-leaf-500/10 px-2.5 py-1 text-[11px] font-bold text-leaf-600">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Sudah keluar
                      </span>
                    ) : baking ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-papaya-500 px-2.5 py-1 text-[11px] font-bold text-white">
                        <Flame className="h-3.5 w-3.5" /> Di oven sekarang
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-cocoa-900/5 px-2.5 py-1 text-[11px] font-bold text-cocoa-500">
                        <Timer className="h-3.5 w-3.5" /> Menunggu
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-extrabold tracking-wide text-cocoa-900 uppercase">{b.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cocoa-700/80">{b.products}</p>
                  {baking && (
                    <p className="mt-3 text-xs font-bold text-papaya-600">
                      ⟶ Datang 15 menit lagi, kebagian yang paling hangat!
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}