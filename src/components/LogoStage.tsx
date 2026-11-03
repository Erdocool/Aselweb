import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

export function LogoStage() {
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
    <section className="border-b border-[var(--line)]" aria-label="Asel">
      <div className="wrap">
        {ready ? (
          <model-viewer
            src={asset("/marka/logo.glb")}
            alt="Asel"
            camera-controls
            interaction-prompt="none"
            shadow-intensity="0.85"
            exposure="1.05"
            environment-image="neutral"
            camera-orbit="0deg 78deg auto"
            className="logo-stage"
          />
        ) : (
          <div className="logo-stage" />
        )}
      </div>
    </section>
  );
}
