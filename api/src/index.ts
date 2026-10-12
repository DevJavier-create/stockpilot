import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/api/v1/healt", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "StockPilot Funcionando",
  });
});

app.listen(port, () => {
  console.log("se inicio el servidor en el puerto", port);
});
