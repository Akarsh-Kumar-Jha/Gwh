import { z } from "zod";
import { SERVICE_VALUES } from "@/lib/services";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name (at least 2 characters)" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .trim()
    .max(25, { message: "Phone number is too long" })
    .regex(/^[+\d\s()-]*$/, { message: "Use digits, spaces and + ( ) - only" })
    .optional()
    .or(z.literal("")),
  service: z.enum(SERVICE_VALUES, { message: "Please choose what you need" }),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Message must be less than 1000 characters" })
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
