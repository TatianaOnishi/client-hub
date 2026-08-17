import { Router } from "express";
import { createCustomerController } from "../controllers/customer.controller";

const customerRoutes = Router();

customerRoutes.post("/", createCustomerController);

customerRoutes.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

export default customerRoutes;