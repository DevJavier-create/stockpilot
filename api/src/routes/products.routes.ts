import { Router } from "express";
import { z } from "zod";

import {
  crearProducto,
  listarProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProdcuto,
} from "../services/product.service.js";

const router: Router = Router();

const crearProductoSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  sku: z.string().trim().min(1).max(40),
  descripcion: z.string().optional(),
  precio: z.number().positive(),
  stock: z.number().int().min(0).optional(),
  stockMinimo: z.number().int().min(0).optional(),
});

const actualizarProductoSchema = z
  .object({
    nombre: z.string().trim().min(2).max(120).optional(),
    sku: z.string().trim().min(1).max(40).optional(),
    descripcion: z.string().nullable().optional(),
    precio: z.number().positive().optional(),
    stock: z.number().int().min(0).optional(),
    stockMinimo: z.number().int().min(0).optional(),
  })
  .strict();

router.get("/", async (req, res, next) => {
  try {
    const querySchema = z.object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(100).default(10),
    });

    const resultado = querySchema.safeParse(req.query);

    if (!resultado.success) {
      res.status(400).json({
        message: "Parámetros de paginación inválidos",
        errors: resultado.error.issues,
      });
      return;
    }

    const { page, limit } = resultado.data;

    const productos = await listarProductos(page, limit);
    res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El id no es valido, debe ser un entero positivo",
      });
      return;
    }
    const producto = await obtenerProductoPorId(id);
    if (!producto) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }
    res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const respuesta = crearProductoSchema.safeParse(req.body);

    if (!respuesta.success) {
      res.status(400).json({
        message: "Datos del producto invalido",
        errors: respuesta.error.flatten(),
      });
      return;
    }

    const producto = await crearProducto(respuesta.data);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El id debe ser un entero positivo",
      });
      return;
    }
    const resultado = actualizarProductoSchema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        message: "datos de actualizacion invalido",
        errors: resultado.error.flatten(),
      });
      return;
    }

    if (Object.keys(resultado.data).length === 0) {
      res.status(400).json({
        message: "Debes enviar al menos un campo para actualizar",
      });
      return;
    }

    const existente = await obtenerProductoPorId(id);

    if (!existente) {
      res.status(404).json({
        message: "producto no encontrado",
      });
      return;
    }

    const productoActualizado = await actualizarProducto(id, resultado.data);
    res.status(200).json(productoActualizado);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID debe ser un entero positivo",
      });
      return;
    }

    const existe = await obtenerProductoPorId(id);
    if (!existe) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    const producto = await eliminarProdcuto(id);
    res.status(200).json({
      message: "producto desactiivado correctamente",
      producto,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
