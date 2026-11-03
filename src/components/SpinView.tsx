import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { Product } from "@/data/products";
import { useI18n } from "@/context/Locale";
import { asset } from "@/lib/asset";

const cache = new Map<string, Promise<number>>();

export function spinSrc(slug: string, index: number) {
  return asset(`/urunler/${slug}/spin/${String(index + 1).padStart(2, "0")}.webp`);
}

function imageExists(src: string) {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

export function useSpinFrames(slug: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancel = false;
    let job = cache.get(slug);
    if (!job) {
      job = (async () => {
        let total = 0;
        for (let index = 0; index < 36; index += 1) {
          if (!(await imageExists(spinSrc(slug, index)))) break;
          total = index + 1;
        }
        return total;
      })();
      cache.set(slug, job);
    }
    void job.then((total) => {
      if (!cancel) setCount(total);
    });
    return () => {
      cancel = true;
    };
  }, [slug]);

  return count;
}

export function ProductStage({ product }: { product: Product }) {
  const { t } = useI18n();
  const frames = useSpinFrames(product.slug);
  const photos = [product.cover, ...product.gallery].map(asset);
  const [still, setStill] = useState<number | null>(null);
  const [frame, setFrame] = useState(0);
  const drag = useRef<{ x: number; frame: number } | null>(null);
  const spinning = frames >= 2 && still === null;
  const src = spinning ? spinSrc(product.slug, frame) : photos[still ?? 0];

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (frames < 2) return;
    setStill(null);
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, frame };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || frames < 2) return;
    const delta = Math.round((event.clientX - drag.current.x) / 14);
    setFrame((((drag.current.frame + delta) % frames) + frames) % frames);
  }

  return (
    <div>
      <div
        className="bg-white"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => {
          drag.current = null;
        }}
        style={{ cursor: frames >= 2 ? "ew-resize" : "default", touchAction: frames >= 2 ? "none" : "auto" }}
      >
        <img src={src} alt={product.code} className="mx-auto aspect-[4/5] w-full object-contain" />
      </div>
      {frames >= 2 && <p className="mt-3 text-sm text-[var(--muted)]">{t.detail.drag}</p>}
      {photos.length > 1 && (
        <div className="mt-3 flex gap-2" aria-label={t.detail.gallery}>
          {photos.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setStill(index)}
              className="w-16 border border-[var(--line)] bg-white"
              aria-label={`${t.detail.gallery} ${index + 1}`}
            >
              <img src={item} alt="" className="aspect-square object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
