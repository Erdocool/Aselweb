import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { LocaleLink } from "@/components/LocaleLink";

export function BrandMark() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let live = true;
    void import("@google/model-viewer").then(() => {
      if (live) setReady(true);
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <LocaleLink to="/" className="inline-flex shrink-0" aria-label="Asel">
      {ready ? (
        <model-viewer
          src={asset("/marka/logo.glb")}
          alt="Asel"
          interaction-prompt="none"
          shadow-intensity="0.45"
          exposure="1.1"
          environment-image="neutral"
          camera-orbit="0deg 84deg auto"
          field-of-view="6deg"
          min-field-of-view="4deg"
          className="header-logo"
        />
      ) : (
        <img src={asset("/marka/logo.png")} alt="" className="header-logo-fallback" />
      )}
    </LocaleLink>
  );
}
