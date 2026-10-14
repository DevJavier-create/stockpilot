import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL es obligatorio"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

const resultado = envSchema.safeParse(process.env);

if (!resultado.success) {
  console.error("Error en la configuracion de variables de entorno ");
  console.error(resultado.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = resultado.data;
