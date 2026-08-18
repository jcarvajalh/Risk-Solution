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
interface Props {
  /** Igual que el Header: define el color del botón hamburguesa. El panel
   *  flotante es siempre una tarjeta blanca con texto oscuro. */
  variant?: "transparent" | "solid";
}

export default function MobileNav({ variant = "transparent" }: Props) {
  const [open, setOpen] = useState(false);
  // Submenú desplegado (acordeón: uno a la vez). null = todos plegados.
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const triggerColor = variant === "solid" ? "text-ink" : "text-white";

  // Al cerrar el menú, se repliegan los submenús para la próxima apertura.
  const closeMenu = () => {
    setOpen(false);
    setOpenSubmenu(null);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => (open ? closeMenu() : setOpen(true))}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className={`relative z-50 inline-flex size-10 items-center justify-center ${triggerColor}`}
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
            onClick={closeMenu}
            className="fixed inset-0 z-40 cursor-default bg-black/20"
          />

          {/* Panel flotante */}
          <div
            id="mobile-menu"
            className="fixed inset-x-4 top-[84px] z-40 rounded-2xl border border-border bg-surface p-3 shadow-xl"
          >
            <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
              {mainNav.map((item) => {
                const hasChildren = !!item.children && item.children.length > 0;
                const isSubmenuOpen = openSubmenu === item.label;

                return (
                  <div key={item.href}>
                    {hasChildren ? (
                      // Con hijos: el ítem es un botón que despliega/pliega su
                      // submenú (no navega). Empieza plegado.
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSubmenu((cur) =>
                            cur === item.label ? null : item.label,
                          )
                        }
                        aria-expanded={isSubmenuOpen}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium tracking-[-0.02em] text-ink transition-colors hover:bg-primary-subtle"
                      >
                        {item.label}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className={`shrink-0 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="block rounded-lg px-3 py-3 text-base font-medium tracking-[-0.02em] text-ink transition-colors hover:bg-primary-subtle"
                      >
                        {item.label}
                      </a>
                    )}

                    {item.children && item.children.length > 0 && isSubmenuOpen && (
                      <ul className="mt-1 mb-1 ml-3 flex flex-col border-l border-border pl-3">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              onClick={closeMenu}
                              className="block rounded-lg px-3 py-2 text-sm font-medium tracking-[-0.02em] text-ink-secondary transition-colors hover:bg-primary-subtle hover:text-primary"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              <a
                href={headerCta.href}
                onClick={closeMenu}
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
