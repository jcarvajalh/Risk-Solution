import { useEffect, useRef, useState } from "react";
import { contactFormSchema, type ContactFormData } from "@lib/schemas";

/**
 * Formulario de contacto. Isla React justificada (regla 6.4: formulario con
 * estado, validación y envío). Sin backend propio:
 *  - Validación en cliente con Zod (@lib/schemas) + honeypot anti-bots.
 *  - reCAPTCHA v2 "invisible": se ejecuta al enviar y devuelve un token.
 *  - Envío por la API REST de EmailJS (sin SDK → cero dependencias nuevas).
 *
 * Para activarlo solo hay que registrar las 4 variables PUBLIC_ (ver .env.example)
 * y configurar el Service/Template de EmailJS con reCAPTCHA. El CSP de _headers ya
 * permite www.google.com, www.gstatic.com y api.emailjs.com.
 */

interface Grecaptcha {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      size: "invisible";
      badge?: "bottomright" | "bottomleft" | "inline";
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => number;
  execute: (id?: number) => void;
  reset: (id?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
const SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

type Values = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  website: string;
};

const initialValues: Values = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  empresa: "",
  mensaje: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof Values, string>>;

const textFields = [
  { name: "nombre", label: "Nombre", type: "text", placeholder: "Nombre", autoComplete: "given-name", half: true },
  { name: "apellido", label: "Apellido", type: "text", placeholder: "Apellido", autoComplete: "family-name", half: true },
  { name: "email", label: "Correo electrónico", type: "email", placeholder: "nombre@dominio.com", autoComplete: "email", half: false },
  { name: "telefono", label: "Número de teléfono", type: "tel", placeholder: "+57 123 456 7890", autoComplete: "tel", half: false },
  { name: "empresa", label: "Empresa (opcional)", type: "text", placeholder: "Nombre de empresa", autoComplete: "organization", half: false },
] as const;

const labelClass =
  "mb-1.5 block text-[clamp(1rem,0.95rem_+_0.2vw,1.125rem)] font-medium tracking-[-0.04em] text-ink";
const inputClass =
  "w-full rounded-[5px] border border-ink/20 bg-bg px-3 py-2 text-[15px] tracking-[-0.02em] text-ink transition-colors placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-danger";

export default function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const widgetIdRef = useRef<number | null>(null);
  const recaptchaElRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<ContactFormData | null>(null);

  // Carga y renderiza el widget invisible de reCAPTCHA.
  useEffect(() => {
    if (!SITE_KEY) return;

    const renderWidget = () => {
      if (
        widgetIdRef.current !== null ||
        !recaptchaElRef.current ||
        !window.grecaptcha?.render
      )
        return;
      widgetIdRef.current = window.grecaptcha.render(recaptchaElRef.current, {
        sitekey: SITE_KEY,
        size: "invisible",
        badge: "bottomright",
        callback: (token: string) => {
          const data = pendingRef.current;
          if (data) void send(data, token);
        },
        "error-callback": () => setStatus("error"),
      });
    };

    if (window.grecaptcha?.render) {
      renderWidget();
      return;
    }
    if (!document.getElementById("recaptcha-api")) {
      const s = document.createElement("script");
      s.id = "recaptcha-api";
      s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    const interval = window.setInterval(() => {
      if (window.grecaptcha?.render) {
        window.clearInterval(interval);
        renderWidget();
      }
    }, 200);
    return () => window.clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as keyof Values;
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  async function send(data: ContactFormData, token: string) {
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          "g-recaptcha-response": token,
          template_params: {
            from_name: `${data.nombre} ${data.apellido}`.trim(),
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            telefono: data.telefono,
            empresa: data.empresa || "—",
            mensaje: data.mensaje,
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    } finally {
      window.grecaptcha?.reset(widgetIdRef.current ?? undefined);
      pendingRef.current = null;
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setErrors({});

    // Honeypot: si viene lleno es un bot → fingimos éxito y no enviamos.
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

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !SITE_KEY) {
      // Falta configuración (variables PUBLIC_ / reCAPTCHA).
      setStatus("error");
      return;
    }

    pendingRef.current = parsed.data;
    setStatus("submitting");
    if (window.grecaptcha && widgetIdRef.current !== null) {
      window.grecaptcha.execute(widgetIdRef.current);
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex min-h-[300px] flex-col items-center justify-center rounded-[10px] bg-surface p-[clamp(1.25rem,2vw,1.8125rem)] text-center shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
        role="status"
      >
        <h2 className="text-[clamp(1.25rem,1.1rem_+_0.4vw,1.5rem)] font-semibold tracking-[-0.04em] text-ink">
          ¡Gracias por escribirnos!
        </h2>
        <p className="mt-2 max-w-[380px] text-[15px] leading-[1.4] tracking-[-0.02em] text-ink-secondary">
          Recibimos tu mensaje y te responderemos muy pronto al correo que nos
          dejaste.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[10px] bg-surface p-[clamp(1.25rem,2vw,1.8125rem)] shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
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

      {status === "error" && (
        <p className="mt-4 text-[14px] text-danger" role="alert">
          No pudimos enviar tu mensaje. Revisa los datos e inténtalo de nuevo, o
          escríbenos directamente a nuestro correo.
        </p>
      )}

      <div className="mt-[clamp(1.25rem,2vw,1.75rem)] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[323px] text-[14px] leading-[1.3] tracking-[-0.04em] text-ink-secondary">
          Al enviar este formulario, acepta nuestra{" "}
          <a
            href="/politica-de-privacidad"
            className="text-primary underline underline-offset-2"
          >
            Política de privacidad.
          </a>
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-[37px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-primary px-6 text-sm font-semibold tracking-[-0.02em] text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
        </button>
      </div>

      <div ref={recaptchaElRef} />
    </form>
  );
}
