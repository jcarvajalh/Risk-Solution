import { z } from "zod";

/**
 * Esquema del formulario de contacto (Zod). Validación en cliente y contrato de
 * datos antes de enviar por EmailJS. Campos según el diseño de Figma.
 *
 * NOTA (Ley 1581 de 2012 / pendiente 7): el diseño NO incluye casilla de
 * consentimiento explícito; el consentimiento es implícito ("Al enviar este
 * formulario, acepta nuestra Política de privacidad"). Para cumplir habeas data
 * de forma robusta se recomienda una casilla obligatoria. Confirmar y, si aplica,
 * añadir `acceptsPrivacyPolicy: z.literal(true)` y su checkbox en ContactForm.
 */
export const contactFormSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa tu nombre."),
  apellido: z.string().trim().min(1, "Ingresa tu apellido."),
  email: z.email("Ingresa un correo electrónico válido."),
  telefono: z.string().trim().min(7, "Ingresa un teléfono válido."),
  empresa: z.string().trim().optional().default(""),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos brevemente cómo podemos ayudarte."),
  // Honeypot anti-bots: debe llegar vacío.
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
