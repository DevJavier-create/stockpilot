import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../app.js";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    producto: {
      findMany: vi.fn(),
      count: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe("GET /api/v1/products", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe devolver un listado vacío cuando no hay productos", async () => {
    vi.mocked(prisma.producto.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.producto.count).mockResolvedValue(0 as never);

    const response = await request(app).get("/api/v1/products");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
    expect(response.body.pagination.total).toBe(0);
    expect(response.body.pagination.page).toBe(1);
  });

  it("debe responder 400 cuando la página es menor que 1", async () => {
    const response = await request(app).get("/api/v1/products?page=0");

    expect(response.status).toBe(400);
  });
});

describe("GET /api/v1/products/:id", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe responder 400 cuando el ID no es un entero positivo", async () => {
    const response = await request(app).get("/api/v1/products/abc");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "El id no es valido, debe ser un entero positivo",
    );
  });

  it("debe responder 404 cuando el producto no existe", async () => {
    vi.mocked(prisma.producto.findFirst).mockResolvedValue(null);

    const response = await request(app).get("/api/v1/products/999999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Producto no encontrado");
  });
});

describe("POST /api/v1/products", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe responder 409 cuando el SKU ya existe", async () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed",
      {
        code: "P2002",
        clientVersion: "6.19.3",
        meta: {
          target: ["sku"],
        },
      },
    );

    vi.mocked(prisma.producto.create).mockRejectedValue(error);

    const response = await request(app).post("/api/v1/products").send({
      nombre: "Teclado de prueba",
      sku: "TEC-003",
      precio: 120000,
      stock: 10,
      stockMinimo: 5,
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Ya existe un producto con ese SKU");
  });

  it("debe responder 400 cuando los datos del producto son inválidos", async () => {
    const response = await request(app).post("/api/v1/products").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Datos del producto invalido");

    expect(prisma.producto.create).not.toHaveBeenCalled();
  });
});

describe("PATCH /api/v1/products/:id", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe responder 400 cuando el ID es inválido", async () => {
    const response = await request(app)
      .patch("/api/v1/products/abc")
      .send({ nombre: "Teclado actualizado" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("El id debe ser un entero positivo");

    expect(prisma.producto.findFirst).not.toHaveBeenCalled();
    expect(prisma.producto.update).not.toHaveBeenCalled();
  });

  it("debe responder 400 cuando el cuerpo está vacío", async () => {
    const response = await request(app).patch("/api/v1/products/1").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Debes enviar al menos un campo para actualizar",
    );

    expect(prisma.producto.findFirst).not.toHaveBeenCalled();
    expect(prisma.producto.update).not.toHaveBeenCalled();
  });

  it("debe responder 404 cuando el producto no existe", async () => {
    vi.mocked(prisma.producto.findFirst).mockResolvedValue(null);

    const response = await request(app)
      .patch("/api/v1/products/999999")
      .send({ nombre: "Teclado actualizado" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("producto no encontrado");

    expect(prisma.producto.update).not.toHaveBeenCalled();
  });
});

describe("Manejo de errores HTTP", () => {
  it("debe responder 400 cuando el JSON está mal formado", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .set("Content-Type", "application/json")
      .send('{"nombre":');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "El cuerpo JSON de la solicitud no es válido",
    );
  });
});
