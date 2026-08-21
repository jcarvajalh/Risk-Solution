import { useEffect, useRef, useState } from "react";
import { contactFormSchema } from "@lib/schemas";

/**
 * Formulario de contacto. Isla React justificada (regla 6.4: formulario con
 * estado, validación y envío).
 *
 * Envío real vía FormSubmit.co (sin backend propio): al enviar se validan los
 * campos con Zod (@lib/schemas) + honeypot anti-bots y se hace POST al endpoint
 * AJAX `https://formsubmit.co/ajax/<correo>` (correo en PUBLIC_FORMSUBMIT_EMAIL).
 * El endpoint AJAX devuelve JSON y no redirige, así conservamos la UI de éxito
 * (chulo verde + mensaje). Se garantiza una duración mínima de la animación
 * "Enviando…" para que la transición se perciba aunque la red sea rápida.
 *
 * OJO: el primer envío a un correo nuevo dispara un correo de activación de
 * FormSubmit; hay que confirmarlo una vez para que empiecen a llegar los mensajes.
 * El CSP de _headers ya permite `https://formsubmit.co` en connect-src.
 */

const FORMSUBMIT_EMAIL =
  import.meta.env.PUBLIC_FORMSUBMIT_EMAIL ?? "juan.carvajal03@outlook.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;

// Duración mínima del estado "Enviando…" para que la transición sea perceptible.
const MIN_SUBMIT_MS = 700;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Values = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  acceptsPrivacyPolicy: boolean;
  website: string;
};

const initialValues: Values = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  empresa: "",
  mensaje: "",
  acceptsPrivacyPolicy: false,
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof Values, string>>;

const textFields = [
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    placeholder: "Nombre",
    autoComplete: "given-name",
    half: true,
  },
  {
    name: "apellido",
    label: "Apellido",
    type: "text",
    placeholder: "Apellido",
    autoComplete: "family-name",
    half: true,
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    placeholder: "nombre@dominio.com",
    autoComplete: "email",
    half: false,
  },
  {
    name: "telefono",
    label: "Número de teléfono",
    type: "tel",
    placeholder: "+57 123 456 7890",
    autoComplete: "tel",
    half: false,
  },
  {
    name: "empresa",
    label: "Empresa (opcional)",
    type: "text",
    placeholder: "Nombre de empresa",
    autoComplete: "organization",
    half: false,
  },
] as const;

const labelClass =
  "mb-1.5 block text-[14px] font-medium tracking-[-0.04em] text-ink";
const inputClass =
  "w-full rounded-[5px] border border-ink/20 bg-bg px-3 py-2 text-[14px] tracking-[-0.02em] text-ink transition-colors placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-danger";

export default function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Altura del formulario congelada al enviar. La tarjeta de éxito (más baja) se
  // centra dentro de este alto para que la columna del form —y por tanto el mapa
  // de al lado, que se estira a su altura— no cambie de tamaño.
  const [lockedHeight, setLockedHeight] = useState<number | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  // Evita actualizar el estado si el componente se desmonta durante el envío.
  const mountedRef = useRef(true);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as keyof Values;
    const value =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setErrors({});

    // Congela la altura actual del formulario para que la columna no se encoja al
    // pasar a la tarjeta de éxito (así el mapa de al lado no cambia de tamaño).
    const measuredHeight = formRef.current?.offsetHeight ?? null;

    // Honeypot: si viene lleno es un bot → fingimos éxito y no procesamos.
    if (values.website) {
      setLockedHeight(measuredHeight);
      setStatus("success");
      return;
    }

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    // Envío real a FormSubmit.co. La animación "Enviando…" dura al menos
    // MIN_SUBMIT_MS aunque la red responda antes, para que la transición se note.
    setStatus("submitting");

    const payload = {
      Nombre: parsed.data.nombre,
      Apellido: parsed.data.apellido,
      "Correo electrónico": parsed.data.email,
      Teléfono: parsed.data.telefono,
      Empresa: parsed.data.empresa || "—",
      Mensaje: parsed.data.mensaje,
      _subject: `Nuevo mensaje desde el sitio web de Risk — ${parsed.data.nombre} ${parsed.data.apellido}`,
      _template: "table",
      _captcha: "false",
    };

    try {
      const [response] = await Promise.all([
        fetch(FORMSUBMIT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }),
        delay(MIN_SUBMIT_MS),
      ]);

      if (!response.ok)
        throw new Error(`FormSubmit respondió ${response.status}`);

      const data: { success?: string | boolean } = await response.json();
      if (String(data.success) !== "true") {
        throw new Error("FormSubmit no confirmó el envío.");
      }

      if (mountedRef.current) {
        setLockedHeight(measuredHeight);
        setStatus("success");
      }
    } catch {
      if (mountedRef.current) setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex items-center justify-center"
        style={lockedHeight ? { minHeight: lockedHeight } : undefined}
      >
        <div
          className="rs-success-in bg-surface flex min-h-[280px] w-full flex-col items-center justify-center rounded-[10px] p-[clamp(1rem,1.6vw,1.5rem)] text-center shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
          role="status"
        >
          <span className="bg-success/10 text-success flex size-14 items-center justify-center rounded-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h2 className="text-ink mt-4 text-[clamp(1.25rem,1.1rem_+_0.4vw,1.5rem)] font-semibold tracking-[-0.04em]">
            Mensaje enviado
          </h2>
          <p className="text-ink-secondary mt-2 max-w-[380px] text-[15px] leading-[1.4] tracking-[-0.02em]">
            Gracias por escribirnos. Nos pondremos en contacto con usted muy
            pronto para atender su solicitud.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="bg-surface rounded-[10px] p-[clamp(1rem,1.6vw,1.5rem)] shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
    >
      {status === "error" && (
        <p
          role="alert"
          className="border-danger/30 bg-danger/10 text-danger mb-4 rounded-[8px] border px-3 py-2 text-[14px] leading-[1.4] tracking-[-0.02em]"
        >
          No pudimos enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo,
          o escríbenos directamente por correo.
        </p>
      )}

      <div className="grid grid-cols-2 gap-x-4 gap-y-[clamp(1rem,1.6vw,1.375rem)]">
        {textFields.map((f) => (
          <div
            key={f.name}
            className={f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}
          >
            <label htmlFor={f.name} className={labelClass}>
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              value={values[f.name]}
              onChange={handleChange}
              aria-invalid={errors[f.name] ? true : undefined}
              aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
              className={inputClass}
            />
            {errors[f.name] && (
              <p
                id={`${f.name}-error`}
                className="text-danger mt-1 text-[13px]"
              >
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}

        <div className="col-span-2">
          <label htmlFor="mensaje" className={labelClass}>
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            placeholder="Cuéntanos cómo podemos ayudarte..."
            value={values.mensaje}
            onChange={handleChange}
            aria-invalid={errors.mensaje ? true : undefined}
            aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
            className={`${inputClass} min-h-[111px] resize-y`}
          />
          {errors.mensaje && (
            <p id="mensaje-error" className="text-danger mt-1 text-[13px]">
              {errors.mensaje}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: oculto para humanos, atractivo para bots. */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">No llenar</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div className="mt-[clamp(1.25rem,2vw,1.75rem)] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label
            htmlFor="acceptsPrivacyPolicy"
            className="flex items-start gap-2.5"
          >
            <input
              id="acceptsPrivacyPolicy"
              name="acceptsPrivacyPolicy"
              type="checkbox"
              checked={values.acceptsPrivacyPolicy}
              onChange={handleChange}
              aria-invalid={errors.acceptsPrivacyPolicy ? true : undefined}
              aria-describedby={
                errors.acceptsPrivacyPolicy
                  ? "acceptsPrivacyPolicy-error"
                  : undefined
              }
              className="accent-primary mt-0.5 size-4 shrink-0 cursor-pointer"
            />
            <span className="text-ink-secondary text-[14px] leading-[1.3] tracking-[-0.04em]">
              Acepto la{" "}
              <a
                href="/politica-de-privacidad"
                className="text-primary underline underline-offset-2"
              >
                política de privacidad
              </a>
              .
            </span>
          </label>
          {errors.acceptsPrivacyPolicy && (
            <p
              id="acceptsPrivacyPolicy-error"
              className="text-danger mt-1 text-[13px]"
            >
              {errors.acceptsPrivacyPolicy}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-primary hover:bg-primary-hover inline-flex h-[37px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-6 text-[14px] font-semibold tracking-[-0.02em] text-white transition-colors disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === "submitting" ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                className="size-4 animate-spin"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Enviando…
            </>
          ) : (
            "Enviar mensaje"
          )}
        </button>
      </div>
    </form>
  );
}
