export const WHATSAPP_NUMBER = "62895364710807";

export const rupiah = (n: number) =>
  "Rp" + n.toLocaleString("id-ID", { maximumFractionDigits: 0 });

export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit: string;
  category: "Roti Manis" | "Roti Tawar" | "Bolen & Pastry" | "Kue Kering";
  image: string;
  stock: number;
  bestSeller?: boolean;
  preorder?: boolean;
};

export const CATEGORIES = [
  "Semua",
  "Roti Manis",
  "Roti Tawar",
  "Bolen & Pastry",
  "Kue Kering",
] as const;

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

export const PRODUCTS: Product[] = [
  {
    id: "sobek-cokelat",
    name: "Roti Sobek Cokelat",
    desc: "Sembilan sobekan lembut dengan isian cokelat lumer di tiap lipatan.",
    price: 28000,
    unit: "loyang 9 pcs",
    category: "Roti Manis",
    image: px(257843),
    stock: 8,
    bestSeller: true,
  },
  {
    id: "sobek-keju",
    name: "Roti Sobek Keju Susu",
    desc: "Taburan keju melimpah, manisnya pas, cocok untuk sarapan keluarga.",
    price: 30000,
    unit: "loyang 9 pcs",
    category: "Roti Manis",
    image: px(14313215),
    stock: 5,
    bestSeller: true,
  },
  {
    id: "sisir-mentega",
    name: "Roti Sisir Mentega",
    desc: "Klasik jadul: sisiran roti empuk dengan olesan mentega gula.",
    price: 24000,
    unit: "8 sisir",
    category: "Roti Manis",
    image: px(12065389),
    stock: 12,
  },
  {
    id: "kayu-manis",
    name: "Roti Gulung Kayu Manis",
    desc: "Cinnamon roll rumahan dengan glaze tipis dan aroma hangat.",
    price: 26000,
    unit: "4 rolls",
    category: "Roti Manis",
    image: px(33627001),
    stock: 6,
  },
  {
    id: "tawar-susu",
    name: "Roti Tawar Susu",
    desc: "Tawar super lembut tanpa pengawet, enak dimakan polos maupun dipanggang.",
    price: 25000,
    unit: "loyang 400g",
    category: "Roti Tawar",
    image: px(1775030),
    stock: 10,
    bestSeller: true,
  },
  {
    id: "tawar-gandum",
    name: "Roti Tawar Gandum",
    desc: "50% gandum utuh, tinggi serat, teman setia meal prep mingguan.",
    price: 32000,
    unit: "loyang 450g",
    category: "Roti Tawar",
    image: px(7966096),
    stock: 0,
    preorder: true,
  },
  {
    id: "bolen-cokelat",
    name: "Bolen Pisang Cokelat",
    desc: "Pastry berlapis renyah, pisang raja matang pohon, dan cokelat premium.",
    price: 35000,
    unit: "box 8 pcs",
    category: "Bolen & Pastry",
    image: px(6939751),
    stock: 7,
    bestSeller: true,
  },
  {
    id: "bolen-keju",
    name: "Bolen Pisang Keju",
    desc: "Gurih keju edam berpadu manis pisang dalam kulit pastry 27 lapisan.",
    price: 38000,
    unit: "box 8 pcs",
    category: "Bolen & Pastry",
    image: px(29307618),
    stock: 4,
  },
  {
    id: "croissant",
    name: "Croissant Butter",
    desc: "Dilipat manual tiga hari, wanginya kecium sampai ujung gang.",
    price: 18000,
    unit: "per pcs",
    category: "Bolen & Pastry",
    image: px(30427450),
    stock: 15,
  },
  {
    id: "nastar",
    name: "Nastar Wisman",
    desc: "Lumer di mulut, selai nanas homemade, butter Wijsman asli.",
    price: 65000,
    unit: "toples 450g",
    category: "Kue Kering",
    image: px(40408087),
    stock: 0,
    preorder: true,
  },
  {
    id: "kastengel",
    name: "Kastengel Keju Tua",
    desc: "Renyah gurih dengan keju edam tua yang dipanggang dua kali.",
    price: 60000,
    unit: "toples 400g",
    category: "Kue Kering",
    image: px(38852250),
    stock: 9,
  },
];

export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  items: string[];
  image: string;
  accent: "butter" | "cocoa" | "papaya";
};

export const PACKAGES: Package[] = [
  {
    id: "paket-ngopi",
    name: "Paket Ngopi",
    tagline: "Pas untuk berdua saat ngopi sore atau kerja dari rumah.",
    price: 55000,
    originalPrice: 62000,
    items: ["2 Croissant Butter", "2 Roti Gulung Kayu Manis", "1 Roti Sisir (4 pcs)"],
    image: px(33627005),
    accent: "butter",
  },
  {
    id: "paket-keluarga",
    name: "Paket Keluarga",
    tagline: "Campuran favorit untuk kumpul keluarga di rumah.",
    price: 95000,
    originalPrice: 112000,
    items: ["1 Roti Sobek Cokelat", "1 Roti Tawar Susu", "1 Bolen Pisang Cokelat"],
    image: px(6830939),
    accent: "cocoa",
  },
  {
    id: "paket-hampers",
    name: "Paket Hampers",
    tagline: "Kemasan rapi siap hadiah untuk keluarga atau rekan kerja.",
    price: 125000,
    originalPrice: 141000,
    items: ["1 Bolen Pisang Keju", "1 Roti Sobek Keju", "Kartu ucapan + pita"],
    image: import.meta.env.BASE_URL + "images/hampers.jpg",
    accent: "papaya",
  },
];

export type Batch = {
  time: string;
  hour: number;
  label: string;
  products: string;
};

export const BATCHES: Batch[] = [
  { time: "06.00", hour: 6, label: "Batch Pagi", products: "Roti tawar & roti sobek" },
  { time: "09.00", hour: 9, label: "Batch Sarapan", products: "Roti manis & sisir mentega" },
  { time: "13.00", hour: 13, label: "Batch Siang", products: "Bolen & croissant" },
  { time: "16.00", hour: 16, label: "Batch Sore", products: "Restock favorit + kue kering" },
];

export const TESTIMONIALS = [
  {
    name: "Rina Kusuma",
    role: "Pelanggan sejak 2021",
    text: "Roti sobeknya masih hangat waktu sampai. Anak-anak selalu nunggu batch sore — sekali beli nggak pernah cukup satu loyang.",
    rating: 5,
  },
  {
    name: "Dimas Prakoso",
    role: "Pemesan hampers kantor",
    text: "Pesan 25 box hampers buat klien, semua datang tepat waktu dengan kartu ucapan tulis tangan. Rapi banget, klien pada nanya beli di mana.",
    rating: 5,
  },
  {
    name: "Sarah Amalia",
    role: "Tetangga satu kompleks",
    text: "Jadwal ovennya jujur dan stok selalu update. Kalau habis ya dibilang habis, nggak dijual roti kemarin. Itu yang bikin percaya.",
    rating: 5,
  },
  {
    name: "Bpk. Hartono",
    role: "Langganan roti tawar",
    text: "Tawar susunya lembut tanpa pengawet tapi tetap enak sampai hari ketiga. Sekarang nggak pernah beli roti supermarket lagi.",
    rating: 4,
  },
];

export const FAQS = [
  {
    q: "Bagaimana cara memesan?",
    a: "Pilih produk lalu masukkan ke keranjang, atau racik hampers sendiri. Saat checkout, pesanan otomatis tersusun jadi pesan WhatsApp — tinggal kirim, kami konfirmasi total dan jadwalnya.",
  },
  {
    q: "Apakah bisa pesan untuk acara / jumlah besar?",
    a: "Bisa! Untuk pesanan di atas 10 box atau acara khusus, lakukan pre-order minimal H-1 (H-3 untuk hampers di atas 25 box) supaya semua tetap fresh dari oven.",
  },
  {
    q: "Rotinya tahan berapa lama?",
    a: "Tanpa pengawet: roti manis dan tawar paling enak dalam 2–3 hari, bolen dan pastry 3–4 hari, kue kering hingga 1 bulan. Simpan di wadah tertutup, jangan di kulkas.",
  },
  {
    q: "Pickup dan delivery bagaimana?",
    a: "Pickup langsung di dapur kami gratis, buka 07.00–18.00. Delivery tersedia radius 8 km dengan ongkir mengikuti jarak — dihitung dan dikonfirmasi lewat WhatsApp.",
  },
  {
    q: "Kalau produk yang saya mau habis?",
    a: "Produk bertanda PO bisa dipesan untuk batch besok. Kami memang produksi terbatas per batch supaya tidak ada roti kemarin yang dijual hari ini.",
  },
];

export const HAMPER_SIZES = [
  { id: "kecil", name: "Box Kecil", capacity: 3, base: 65000, note: "Pas untuk teman dekat" },
  { id: "sedang", name: "Box Sedang", capacity: 5, base: 95000, note: "Paling sering dipesan" },
  { id: "besar", name: "Box Besar", capacity: 7, base: 135000, note: "Untuk keluarga besar" },
];

export const HAMPER_ITEMS = [
  { id: "h-sobek", name: "Roti Sobek Mini", price: 12000, emoji: "🍞" },
  { id: "h-bolen", name: "Bolen Pisang (4 pcs)", price: 18000, emoji: "🥐" },
  { id: "h-croissant", name: "Croissant Butter", price: 9000, emoji: "🥯" },
  { id: "h-sisir", name: "Roti Sisir (4 pcs)", price: 10000, emoji: "🧈" },
  { id: "h-cookies", name: "Cookies Toples Mini", price: 20000, emoji: "🍪" },
  { id: "h-kayumanis", name: "Cinnamon Roll", price: 8000, emoji: "🌀" },
];