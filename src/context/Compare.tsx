import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "asel-compare";

type CompareValue = {
  ids: string[];
  notice: boolean;
  toggle: (slug: string) => void;
  clear: () => void;
};

const CompareContext = createContext<CompareValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]") as unknown;
      if (!Array.isArray(raw)) return [];
      return raw.filter((item) => typeof item === "string").slice(0, 3);
    } catch {
      return [];
    }
  });
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  function toggle(slug: string) {
    if (ids.includes(slug)) {
      setNotice(false);
      setIds(ids.filter((item) => item !== slug));
      return;
    }
    if (ids.length >= 3) {
      setNotice(true);
      return;
    }
    setNotice(false);
    setIds([...ids, slug]);
  }

  return (
    <CompareContext.Provider value={{ ids, notice, toggle, clear: () => { setIds([]); setNotice(false); } }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const value = useContext(CompareContext);
  if (!value) throw new Error("Karşılaştırma eksik");
  return value;
}
