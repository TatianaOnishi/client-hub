import { z } from 'zod';

function isValidCPF(value: string) {
  const cpf = value.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let remainder = (sum * 10) % 11;

  if (remainder === 10) {
    remainder = 0;
  }

  if (remainder !== Number(cpf[9])) {
    return false;
  }

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10) {
    remainder = 0;
  }

  return remainder === Number(cpf[10]);
}

export const customerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Informe o nome completo.')
    .max(120, 'O nome deve ter no máximo 120 caracteres.'),

  cpf: z
    .string()
    .trim()
    .refine(isValidCPF, 'Informe um CPF válido.'),

  email: z
    .string()
    .trim()
    .email('Informe um e-mail válido.')
    .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),

  favoriteColor: z
    .string()
    .min(1, 'Selecione uma cor.'),

  observations: z
    .string()
    .trim()
    .max(1000, 'As observações devem ter no máximo 1000 caracteres.')
    .optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;