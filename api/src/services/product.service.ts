import { prisma } from "../lib/prisma.js";

export interface CrearProductoDTO {
  nombre: string;
  sku: string;
  descipcion?: string | undefined;
  precio: number;
  stock?: number | undefined;
  stockMinimo?: number | undefined;
}

export interface ActualizarProductoDTO {
  nombre?: string | undefined;
  sku?: string | undefined;
  descripcion?: string | null | undefined;
  precio?: number | undefined;
  stock?: number | undefined;
  stockMinimo?: number | undefined;
}

export async function listarProductos() {
  return prisma.producto.findMany({
    where: {
      activo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function crearProducto(data: CrearProductoDTO) {
  return prisma.producto.create({
    data: {
      nombre: data.nombre,
      sku: data.sku,
      descripcion: data.descipcion ?? null,
      precio: data.precio,
      stock: data.stock ?? 0,
      stockMinimo: data.stockMinimo ?? 5,
    },
  });
}

export async function obtenerProductoPorId(id: number) {
  return prisma.producto.findFirst({
    where: {
      id,
      activo: true,
    },
  });
}

export async function actualizarProducto(
  id: number,
  data: ActualizarProductoDTO,
) {
  const datosActualizacion = {
    ...(data.nombre !== undefined && { nombre: data.nombre }),
    ...(data.sku !== undefined && { sku: data.sku }),
    ...(data.descripcion !== undefined && {
      descripcion: data.descripcion,
    }),
    ...(data.precio !== undefined && { precio: data.precio }),
    ...(data.stock !== undefined && { stock: data.stock }),
    ...(data.stockMinimo !== undefined && {
      stockMinimo: data.stockMinimo,
    }),
  };

  return prisma.producto.update({
    where: { id },
    data: datosActualizacion,
  });
}

export async function eliminarProdcuto(id: number) {
  return prisma.producto.update({
    where: {
      id,
    },
    data: {
      activo: false,
    },
  });
}
