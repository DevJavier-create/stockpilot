import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  console.error(error);

  if (res.headersSent) {
    next(error);
    return;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    res.status(409).json({
      message: "Ya existe un producto con ese SKU",
    });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
};
