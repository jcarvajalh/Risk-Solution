import { z } from "zod";

/**
 * Esquemas de validación de formularios (Zod). Se usan en cliente y como
 * contrato de datos antes de enviar por EmailJS.
 *
 * TODO: confirmar campos definitivos del formulario de contacto (¿empresa,
 * cargo, teléfono obligatorios?) y el texto de la política de tratamiento de
 * datos (Ley 1581 de 2012). Este es un esqueleto provisional.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo."),
  email: z.email("Ingresa un correo electrónico válido."),
  company: z.string().min(2, "Ingresa el nombre de tu entidad."),
  message: z.string().min(10, "Cuéntanos brevemente tu necesidad."),
  // Consentimiento obligatorio por Ley 1581 de 2012 (habeas data).
  acceptsPrivacyPolicy: z.literal(true, {
    message: "Debes aceptar la política de tratamiento de datos.",
  }),
  // Honeypot anti-bots: debe llegar vacío.
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
