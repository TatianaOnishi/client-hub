import { Request, Response } from "express";
import { createCustomerSchema } from "../schemas/customer.schema";
import { createCustomer } from "../services/customer.service";

export async function createCustomerController(
  req: Request,
  res: Response,
) {
  try {
    const data = createCustomerSchema.parse(req.body);

    const customer = await createCustomer(data);

    return res.status(201).json({
      message: "Cliente cadastrado com sucesso",
      customer,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "CPF já cadastrado") {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(400).json({
      message: "Dados inválidos",
    });
  }
}