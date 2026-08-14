import { useEffect, useRef } from "react";

/**
 * Carrusel de personas del equipo. Isla React justificada (regla 6.4: carrusel
 * con interacción). NO es automático: el usuario lo arrastra/desplaza y hace loop
 * INFINITO al avanzar.
 *
 * Full-bleed: la pista ocupa todo el ancho de la sección. Un padding-left la
 * alinea con el contenedor de contenido (~1280px), así al cargar la primera
 * tarjeta queda alineada con el encabezado (como en Figma) y las tarjetas sangran
 * hasta el borde derecho; al deslizar, las tarjetas llegan hasta el borde izquierdo.
 *
 * Técnica infinita: 3 copias de la lista. Arranca en la copia 0 (la "real",
 * anunciada a lectores de pantalla); las otras dos son clones (aria-hidden) y
 * sirven de colchón a la derecha. Al pasar un ancho de set, se resta ese ancho:
 * el salto es imperceptible porque las copias son idénticas.
 */
interface Member {
  name: string;
  role: string;
  /** URL de la foto ya optimizada, o null → placeholder. */
  src: string | null;
}

interface Props {
  members: Member[];
}

export default function TeamCarousel({ members }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const n = members.length;

  // Loop infinito hacia adelante.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || n === 0) return;

    const oneSet = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const boundary = el.children[n] as HTMLElement | undefined;
      if (!first || !boundary) return el.scrollWidth / 3;
      return boundary.offsetLeft - first.offsetLeft;
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = oneSet();
        if (w > 0 && el.scrollLeft >= w) el.scrollLeft -= w;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  // Arrastre con puntero (delta incremental, no pelea con el loop).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let dragging = false;
    let lastX = 0;

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add("cursor-grabbing");
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      el.scrollLeft -= dx;
    };
    const end = (e: PointerEvent) => {
      dragging = false;
      el.releasePointerCapture?.(e.pointerId);
      el.classList.remove("cursor-grabbing");
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="flex cursor-grab touch-pan-y gap-[clamp(1.5rem,3vw,2.75rem)] overflow-x-auto overscroll-x-contain pl-[max(1.25rem,calc((100%_-_80rem)_/_2_+_1.25rem))] select-none sm:pl-[max(1.5rem,calc((100%_-_80rem)_/_2_+_1.5rem))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {[0, 1, 2].map((copy) =>
        members.map((m, i) => (
          <article
            key={`${copy}-${i}`}
            aria-hidden={copy !== 0}
            className="w-[clamp(15.5rem,20vw,18rem)] shrink-0"
          >
            <div className="aspect-[228/255] w-full overflow-hidden rounded-t-[10px] shadow-card">
              {m.src ? (
                <img
                  src={m.src}
                  alt={m.name}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center border border-dashed border-border bg-primary-subtle text-ink-muted">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
              )}
            </div>

            <p className="mt-3 text-[clamp(1.0625rem,1rem_+_0.28vw,1.25rem)] font-medium tracking-[-0.04em] text-ink">
              {m.name}
            </p>
            <p className="mt-0.5 text-sm tracking-[-0.04em] text-ink-secondary">
              {m.role}
            </p>
          </article>
        )),
      )}
    </div>
  );
}
