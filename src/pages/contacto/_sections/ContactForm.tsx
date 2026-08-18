import { useEffect, useRef, useState } from "react";
import { contactFormSchema } from "@lib/schemas";

/**
 * Formulario de contacto. Isla React justificada (regla 6.4: formulario con
 * estado, validación y envío).
 *
 * Envío SIMULADO (sin backend por ahora): al enviar se validan los campos con
 * Zod (@lib/schemas) + honeypot anti-bots, se muestra ~1s de animación
 * "Enviando…" y luego se reemplaza el formulario por el mensaje de éxito con un
 * chulo verde. Al recargar la página el formulario vuelve a su estado normal.
 *
 * TODO: reconectar el envío real por EmailJS + reCAPTCHA cuando se configuren las
 * variables PUBLIC_ (ver .env.example). El CSP de _headers ya lo permite.
 */

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

type Status = "idle" | "submitting" | "success";
type FieldErrors = Partial<Record<keyof Values, string>>;

const textFields = [
  { name: "nombre", label: "Nombre", type: "text", placeholder: "Nombre", autoComplete: "given-name", half: true },
  { name: "apellido", label: "Apellido", type: "text", placeholder: "Apellido", autoComplete: "family-name", half: true },
  { name: "email", label: "Correo electrónico", type: "email", placeholder: "nombre@dominio.com", autoComplete: "email", half: false },
  { name: "telefono", label: "Número de teléfono", type: "tel", placeholder: "+57 123 456 7890", autoComplete: "tel", half: false },
  { name: "empresa", label: "Empresa (opcional)", type: "text", placeholder: "Nombre de empresa", autoComplete: "organization", half: false },
] as const;

const labelClass =
  "mb-1.5 block text-[14px] font-medium tracking-[-0.04em] text-ink";
const inputClass =
  "w-full rounded-[5px] border border-ink/20 bg-bg px-3 py-2 text-[14px] tracking-[-0.02em] text-ink transition-colors placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-danger";

export default function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setErrors({});

    // Honeypot: si viene lleno es un bot → fingimos éxito y no procesamos.
    if (values.website) {
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

    // Envío simulado: 1s de animación "Enviando…" y luego éxito.
    setStatus("submitting");
    timeoutRef.current = window.setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  if (status === "success") {
    return (
      <div
        className="flex min-h-[280px] flex-col items-center justify-center rounded-[10px] bg-surface p-[clamp(1rem,1.6vw,1.5rem)] text-center shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
        role="status"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
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
        <h2 className="mt-4 text-[clamp(1.25rem,1.1rem_+_0.4vw,1.5rem)] font-semibold tracking-[-0.04em] text-ink">
          Mensaje enviado
        </h2>
        <p className="mt-2 max-w-[380px] text-[15px] leading-[1.4] tracking-[-0.02em] text-ink-secondary">
          Nos pondremos en contacto con usted.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[10px] bg-surface p-[clamp(1rem,1.6vw,1.5rem)] shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-[clamp(1rem,1.6vw,1.375rem)]">
        {textFields.map((f) => (
          <div key={f.name} className={f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
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
              <p id={`${f.name}-error`} className="mt-1 text-[13px] text-danger">
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
            <p id="mensaje-error" className="mt-1 text-[13px] text-danger">
              {errors.mensaje}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: oculto para humanos, atractivo para bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
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
          <label htmlFor="acceptsPrivacyPolicy" className="flex items-start gap-2.5">
            <input
              id="acceptsPrivacyPolicy"
              name="acceptsPrivacyPolicy"
              type="checkbox"
              checked={values.acceptsPrivacyPolicy}
              onChange={handleChange}
              aria-invalid={errors.acceptsPrivacyPolicy ? true : undefined}
              aria-describedby={
                errors.acceptsPrivacyPolicy ? "acceptsPrivacyPolicy-error" : undefined
              }
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
            />
            <span className="text-[14px] leading-[1.3] tracking-[-0.04em] text-ink-secondary">
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
              className="mt-1 text-[13px] text-danger"
            >
              {errors.acceptsPrivacyPolicy}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-[37px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary px-6 text-[14px] font-semibold tracking-[-0.02em] text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-80"
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
