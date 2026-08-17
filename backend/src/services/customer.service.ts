import { prisma } from "../lib/prisma";
import { CreateCustomerInput } from "../schemas/customer.schema";

export async function createCustomer(data: CreateCustomerInput) {
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      cpf: data.cpf,
    },
  });

  if (existingCustomer) {
    throw new Error("CPF já cadastrado");
  }

  return prisma.customer.create({
    data,
  });
}