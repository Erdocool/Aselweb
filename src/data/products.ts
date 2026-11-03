import type { Locale, SocketSize, SpecKey } from "./site";

export type Product = {
  slug: string;
  code: string;
  socket: SocketSize;
  torqueNm: number;
  rpm: number;
  weightKg: number;
  cover: string;
  gallery: string[];
  summary: Record<Locale, string>;
  specs: Record<SpecKey, string>;
};

export const products: Product[] = [
  {
    slug: "asht-40634",
    code: "ASHT-40634",
    socket: "3/4",
    torqueNm: 2500,
    rpm: 5250,
    weightKg: 3.68,
    cover: "/urunler/asht-40634/kapak.png",
    gallery: [],
    summary: {
      tr: "3/4 inç soket ve 2500 Nm sökme torku ile ağır servis işleri için çift çekiçli darbeli somun sökücü. Uzun vuruşlarda tutuşu dengeleyen ergonomik gövdeye sahiptir.",
      en: "A 3/4-inch twin-hammer impact wrench for heavy service work, with 2500 Nm of loosening torque and a grip shaped for long shifts.",
    },
    specs: {
      hammer: "Çift çekiç",
      length: "200 mm",
      bolt: "36 mm",
      socket: "3/4 inç",
      torque: "2500 Nm",
      rpm: "5250 r.p.m",
      hose: "13 mm",
      inlet: "1/4 inç",
      air: "240 lt/dk",
      pressure: "90-115 psi (6,5-8 bar)",
      weight: "3,68 kg",
      soundPressure: "94,86 dB(A)",
      soundPower: "104,86 dB(A)",
      vibration: "4,74 m/sn²",
    },
  },
  {
    slug: "asht-40512",
    code: "ASHT-40512",
    socket: "1/2",
    torqueNm: 1750,
    rpm: 7250,
    weightKg: 2.07,
    cover: "/urunler/asht-40512/kapak.png",
    gallery: ["/urunler/asht-40512/galeri/01.jpg", "/urunler/asht-40512/galeri/02.jpg"],
    summary: {
      tr: "1/2 inç sokette 1750 Nm. Güçlendirilmiş çelik motor, fiber kanat ve kompozit gövde; sıkma ve sökmede hafif bir yardımcı.",
      en: "1/2-inch, 1750 Nm. A reinforced steel motor, fiber blades and a composite body keep it light for fastening and loosening.",
    },
    specs: {
      hammer: "Çift çekiç",
      length: "167 mm",
      bolt: "19 mm",
      socket: "1/2 inç",
      torque: "1750 Nm",
      rpm: "7250 r.p.m",
      hose: "10 mm",
      inlet: "1/4 inç",
      air: "180 lt/dk",
      pressure: "90-115 psi (6,5-8 bar)",
      weight: "2,07 kg",
      soundPressure: "87 dB(A)",
      soundPower: "102 dB(A)",
      vibration: "2,67 m/sn²",
    },
  },
  {
    slug: "asht-40412",
    code: "ASHT-40412",
    socket: "1/2",
    torqueNm: 1250,
    rpm: 5500,
    weightKg: 1.78,
    cover: "/urunler/asht-40412/kapak.png",
    gallery: ["/urunler/asht-40412/galeri/01.jpg", "/urunler/asht-40412/galeri/02.jpg"],
    summary: {
      tr: "1/2 inç sokette 1250 Nm. Serinin en kısa ve en sessiz gövdesi; günlük sıkma ve sökme işleri için.",
      en: "1/2-inch, 1250 Nm. The shortest and quietest body in the range, for everyday fastening and loosening.",
    },
    specs: {
      hammer: "Çift çekiç",
      length: "146 mm",
      bolt: "17 mm",
      socket: "1/2 inç",
      torque: "1250 Nm",
      rpm: "5500 r.p.m",
      hose: "10 mm",
      inlet: "1/4 inç",
      air: "160 lt/dk",
      pressure: "90-115 psi (6,5-8 bar)",
      weight: "1,78 kg",
      soundPressure: "72,7 dB(A)",
      soundPower: "75,7 dB(A)",
      vibration: "2,49 m/sn²",
    },
  },
];

export function formatSpec(value: string, locale: "tr" | "en") {
  if (locale === "tr") return value;
  return value.replaceAll("Çift çekiç", "Twin hammer").replaceAll("inç", "in");
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function productsBySocket(socket: SocketSize) {
  return products.filter((item) => item.socket === socket);
}
