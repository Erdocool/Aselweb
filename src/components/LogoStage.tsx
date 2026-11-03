import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { LocaleLink } from "@/components/LocaleLink";

type Viewer = HTMLElement & {
  cameraOrbit: string;
  jumpCameraToGoal: () => void;
};

export function BrandMark() {
  const [ready, setReady] = useState(false);
  const view = useRef<Viewer>(null);

  useEffect(() => {
    let live = true;
    void import("@google/model-viewer").then(() => {
      if (live) setReady(true);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const el = view.current;
      if (el) {
        const yaw = Math.sin((now - start) / 850) * 16;
        el.cameraOrbit = `${yaw.toFixed(2)}deg 84deg auto`;
        el.jumpCameraToGoal();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  return (
    <LocaleLink to="/" className="inline-flex shrink-0" aria-label="Asel">
      {ready ? (
        <model-viewer
          ref={view}
          src={asset("/marka/logo.glb")}
          alt="Asel"
          interaction-prompt="none"
          shadow-intensity="0.45"
          exposure="1.1"
          environment-image="neutral"
          camera-orbit="0deg 84deg auto"
          field-of-view="6deg"
          min-field-of-view="4deg"
          interpolation-decay="0"
          className="header-logo"
        />
      ) : (
        <img src={asset("/marka/logo.png")} alt="" className="header-logo-fallback" />
      )}
    </LocaleLink>
  );
}
