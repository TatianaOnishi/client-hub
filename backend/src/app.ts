import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customer.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);

export default app;