export const site = {
  phoneDisplay: "0 (312) 312 2735",
  phoneTel: "+903123122735",
  emails: ["info@aselelaletleri.com", "asel@aselelaletleri.com"],
  address: "İvedik OSB Mahallesi 1419. Cad. No:76 Yenimahalle / Ankara",
  maps: "https://www.google.com/maps/search/?api=1&query=%C4%B0vedik+OSB+1419.+Cad.+No%3A76+Yenimahalle+Ankara",
  facebook: "https://www.facebook.com/aselelaletleri/",
  instagram: "https://www.instagram.com/aselelaletleri/",
  catalogPdf: "https://aselelaletleri.com/wp-content/uploads/2026/03/ASEL-KATALOG.pdf",
};

export const specKeys = [
  "hammer",
  "length",
  "bolt",
  "socket",
  "torque",
  "rpm",
  "hose",
  "inlet",
  "air",
  "pressure",
  "weight",
  "soundPressure",
  "soundPower",
  "vibration",
] as const;

export type SpecKey = (typeof specKeys)[number];
export type Locale = "tr" | "en";
export type SocketSize = "1/2" | "3/4";
