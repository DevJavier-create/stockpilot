import "dotenv/config";
import express from "express";
import productRoutes from "./routes/products.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api/v1/products", productRoutes);

app.get("/api/v1/healt", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "StockPilot Funcionando",
  });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("se inicio el servidor en el puerto", port);
});
