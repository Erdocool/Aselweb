import { Route, Routes } from "react-router-dom";
import type { Locale } from "@/data/site";
import { CompareProvider } from "@/context/Compare";
import { ThemeProvider } from "@/context/Theme";
import { Shell } from "@/components/Shell";
import { About } from "@/pages/About";
import { Catalog } from "@/pages/Catalog";
import { Certificates } from "@/pages/Certificates";
import { ComparePage } from "@/pages/ComparePage";
import { Contact, DealerApply } from "@/pages/Contact";
import { Dealers } from "@/pages/Dealers";
import { Faq } from "@/pages/Faq";
import { Home } from "@/pages/Home";
import { Legal } from "@/pages/Legal";
import { NewsDetail, NewsList } from "@/pages/News";
import { NotFound } from "@/pages/NotFound";
import { ProductDetail } from "@/pages/ProductDetail";
import { Products } from "@/pages/Products";

function tree(locale: Locale) {
  return (
    <Route path={locale === "en" ? "/en" : "/"} element={<Shell locale={locale} />}>
      <Route index element={<Home />} />
      <Route path="urunler" element={<Products />} />
      <Route path="urun/:slug" element={<ProductDetail />} />
      <Route path="karsilastir" element={<ComparePage />} />
      <Route path="katalog" element={<Catalog />} />
      <Route path="satis-noktalari" element={<Dealers />} />
      <Route path="bayi-basvuru" element={<DealerApply />} />
      <Route path="hakkimizda" element={<About />} />
      <Route path="iletisim" element={<Contact />} />
      <Route path="sss" element={<Faq />} />
      <Route path="sertifikalar" element={<Certificates />} />
      <Route path="haberler" element={<NewsList />} />
      <Route path="haberler/:slug" element={<NewsDetail />} />
      <Route path="kvkk" element={<Legal kind="kvkk" />} />
      <Route path="cerez" element={<Legal kind="cookies" />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <CompareProvider>
        <Routes>
          {tree("en")}
          {tree("tr")}
        </Routes>
      </CompareProvider>
    </ThemeProvider>
  );
}
