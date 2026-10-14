import "dotenv/config";
import express, { type Express } from "express";
import productRoutes from "./routes/products.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

// Permite recibir cuerpos JSON.
app.use(express.json({ limit: "100kb" }));

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
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
