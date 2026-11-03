import type { Locale } from "./site";

export type NewsItem = {
  slug: string;
  date: string;
  image: string;
  title: Record<Locale, string>;
  body: Record<Locale, string[]>;
};

export const news: NewsItem[] = [
  {
    slug: "koln-2024",
    date: "2024-03-01",
    image: "/haberler/koln.jpg",
    title: {
      tr: "Eisenwarenmesse Köln 2024",
      en: "Eisenwarenmesse Cologne 2024",
    },
    body: {
      tr: [
        "Asel, 3-6 Mart 2024 tarihlerinde Köln’de düzenlenen Internationale Eisenwarenmesse fuarındaydı.",
        "Hırdavat ve el aletleri fuarı, darbeli somun sökme modellerini servis ve sanayi alıcılarıyla aynı masada göstermek için kullanıldı.",
      ],
      en: [
        "Asel took part in Internationale Eisenwarenmesse in Cologne, 3-6 March 2024.",
        "The hardware fair was the place to put the impact-wrench range in front of service and industrial buyers.",
      ],
    },
  },
  {
    slug: "hirdavat-fuari-7",
    date: "2024-03-01",
    image: "/haberler/hirdavat.jpg",
    title: {
      tr: "7. Uluslararası Hırdavat Fuarı",
      en: "7th International Hardware Fair",
    },
    body: {
      tr: [
        "Asel, 7. Uluslararası Hırdavat Fuarı’nda havalı el aletleri standıyla yer aldı.",
        "Ziyaretçiler soket ölçüsü, tork ve boşta devri yan yana görerek modele karar verdi.",
      ],
      en: [
        "Asel joined the 7th International Hardware Fair with a pneumatic hand-tool stand.",
        "Visitors compared socket size, torque and free speed before choosing a model.",
      ],
    },
  },
  {
    slug: "hirdavat-fuari-6",
    date: "2024-05-18",
    image: "/haberler/fuar-2026.jpg",
    title: {
      tr: "6. Uluslararası Hırdavat Fuarı",
      en: "6th International Hardware Fair",
    },
    body: {
      tr: [
        "6. Uluslararası Hırdavat Fuarı, Asel’in servis ekipmanı alıcılarıyla bir araya geldiği önceki duraklardan biriydi.",
        "Fuar görüşmeleri satış noktaları ağı üzerinden devam eder. Güncel modele ürün sayfasından, yakın noktaya satış noktalarından ulaşılır.",
      ],
      en: [
        "The 6th International Hardware Fair was an earlier stop where Asel met service-equipment buyers.",
        "Those conversations continue through the dealer network. Current models live on the product pages; the nearest counter is on the dealer list.",
      ],
    },
  },
];

export function getNews(slug: string) {
  return news.find((item) => item.slug === slug);
}
