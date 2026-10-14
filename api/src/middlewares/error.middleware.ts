import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  // JSON mal formado enviado por el cliente.
  if (
    error instanceof SyntaxError &&
    "status" in error &&
    error.status === 400
  ) {
    res.status(400).json({
      message: "El cuerpo JSON de la solicitud no es válido",
    });
    return;
  }

  // SKU duplicado.
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    res.status(409).json({
      message: "Ya existe un producto con ese SKU",
    });
    return;
  }

  // Registro relacionado que no existe.
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    res.status(404).json({
      message: "El recurso solicitado no existe",
    });
    return;
  }

  // No exponer detalles internos al cliente.
  console.error("Error no controlado:", error);

  res.status(500).json({
    message: "Error interno del servidor",
  });
};
