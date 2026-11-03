import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/context/Locale";
import { asset } from "@/lib/asset";

export function Teaser({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  function finish() {
    sessionStorage.setItem("asel-teaser-seen", "1");
    onDone();
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleSound() {
    const element = video.current;
    if (!element) return;
    element.muted = !element.muted;
    setMuted(element.muted);
    if (!element.muted) void element.play();
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black text-white">
      {failed ? (
        <img src={asset("/urunler/asht-40634/kapak.png")} alt="" className="absolute inset-0 m-auto max-h-[78%] object-contain" />
      ) : (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full bg-black object-contain"
          src={asset("/video/teaser.mp4")}
          autoPlay
          muted
          playsInline
          onEnded={finish}
          onError={() => setFailed(true)}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 py-8">
        {!failed && (
          <button type="button" className="btn btn-ghost border-white/40 text-white" onClick={toggleSound}>
            {muted ? t.teaser.soundOn : t.teaser.soundOff}
          </button>
        )}
        <button type="button" className="btn btn-primary" onClick={finish}>
          {t.teaser.enter}
        </button>
      </div>
    </div>
  );
}
