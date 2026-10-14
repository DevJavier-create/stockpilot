import "dotenv/config";
import express, { type Express } from "express";
import productRoutes from "./routes/products.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app: Express = express();

// Permite recibir cuerpos JSON.
app.use(express.json());

// Rutas de productos.
app.use("/api/v1/products", productRoutes);

// Ruta para comprobar que la API funciona.
app.get("/api/v1/healt", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "StockPilot Funcionando",
  });
});

// Debe estar después de las rutas.
app.use(errorMiddleware);

export default app;
