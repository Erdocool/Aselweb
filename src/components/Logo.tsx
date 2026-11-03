import { asset } from "@/lib/asset";

export function Logo() {
  return (
    <span className="brand">
      <img src={asset("/marka/mark.png")} alt="" className="brand-mark" />
      <span className="brand-word" aria-hidden="true">
        <span className="brand-as">AS</span>
        <span className="brand-el">EL</span>
      </span>
    </span>
  );
}
