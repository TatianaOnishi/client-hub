import { z } from "zod";

export const createCustomerSchema = z.object({
  fullName: z.string().min(3),
  cpf: z.string().min(11).max(14),
  email: z.string().email(),
  favoriteColor: z.string().min(1),
  observations: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;