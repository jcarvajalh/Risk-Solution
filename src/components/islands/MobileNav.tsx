import { useEffect, useState } from "react";
import { mainNav, headerCta } from "@config/navigation";

/**
 * Menú de navegación móvil. Isla React justificada: requiere estado de
 * apertura/cierre e interacción (sección 6.4).
 *
 * Diseño: al abrir se despliega un PANEL FLOTANTE (tarjeta) anclado bajo el
 * header, con la altura de su contenido (no ocupa toda la pantalla). Fondo
 * surface con texto ink. El botón hamburguesa (que alterna a X) queda por encima
 * del panel (z superior) para poder cerrarlo. Cierra con Escape o tocando fuera.
 *
 * TODO: el diseño móvil no está en el frame de Figma; valores con tokens del
 * sistema, confirmar en Figma.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="relative z-50 inline-flex size-10 items-center justify-center text-white"
      >
        {open ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* Capa para cerrar al tocar fuera. */}
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/20"
          />

          {/* Panel flotante */}
          <div
            id="mobile-menu"
            className="fixed inset-x-4 top-[84px] z-40 rounded-2xl border border-border bg-surface p-3 shadow-xl"
          >
            <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium tracking-[-0.02em] text-ink transition-colors hover:bg-primary-subtle"
                >
                  {item.label}
                </a>
              ))}

              <a
                href={headerCta.href}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-[5px] bg-primary px-5 text-sm font-semibold tracking-[-0.02em] text-white transition-colors hover:bg-primary-hover"
              >
                {headerCta.label}
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
