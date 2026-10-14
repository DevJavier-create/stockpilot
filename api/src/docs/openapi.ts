export const openapi = {
  openapi: "3.0.3",
  info: {
    title: "StockPilot API",
    version: "1.0.0",
    description:
      "API REST para gestionar productos, inventario y niveles de stock.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local de desarrollo",
    },
  ],
  tags: [
    {
      name: "Health",
      description: "Estado de la API",
    },
    {
      name: "Productos",
      description: "Operaciones de gestión de productos",
    },
  ],
  paths: {
    "/api/v1/healt": {
      get: {
        tags: ["Health"],
        summary: "Comprobar el estado de la API",
        responses: {
          "200": {
            description: "La API está funcionando",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "OK" },
                    message: {
                      type: "string",
                      example: "StockPilot Funcionando",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/v1/products": {
      get: {
        tags: ["Productos"],
        summary: "Listar productos",
        description:
          "Permite paginar, buscar, filtrar por stock y ordenar los productos activos.",
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Número de página",
            schema: { type: "integer", minimum: 1, default: 1 },
          },
          {
            name: "limit",
            in: "query",
            description: "Cantidad de productos por página",
            schema: { type: "integer", minimum: 1, default: 10 },
          },
          {
            name: "search",
            in: "query",
            description: "Buscar por nombre o SKU",
            schema: { type: "string" },
          },
          {
            name: "stockStatus",
            in: "query",
            description: "Filtrar productos sin existencias",
            schema: { type: "string", enum: ["out"] },
          },
          {
            name: "sortBy",
            in: "query",
            description: "Campo para ordenar",
            schema: {
              type: "string",
              enum: ["nombre", "precio", "createdAt"],
            },
          },
          {
            name: "sortOrder",
            in: "query",
            description: "Dirección del ordenamiento",
            schema: { type: "string", enum: ["asc", "desc"] },
          },
        ],
        responses: {
          "200": {
            description: "Lista de productos y datos de paginación",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Producto" },
                    },
                    pagination: {
                      $ref: "#/components/schemas/Paginacion",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Parámetros de consulta inválidos",
          },
        },
      },

      post: {
        tags: ["Productos"],
        summary: "Crear un producto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NuevoProducto",
              },
            },
          },
        },
        responses: {
          "201": { description: "Producto creado correctamente" },
          "400": { description: "Datos inválidos" },
          "409": { description: "Ya existe un producto con ese SKU" },
        },
      },
    },

    "/api/v1/products/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Identificador numérico del producto",
          schema: { type: "integer", minimum: 1 },
        },
      ],

      get: {
        tags: ["Productos"],
        summary: "Consultar un producto",
        responses: {
          "200": {
            description: "Producto encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Producto" },
              },
            },
          },
          "400": { description: "Identificador inválido" },
          "404": { description: "Producto no encontrado" },
        },
      },

      patch: {
        tags: ["Productos"],
        summary: "Actualizar parcialmente un producto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductoActualizacion",
              },
            },
          },
        },
        responses: {
          "200": { description: "Producto actualizado correctamente" },
          "400": { description: "Datos inválidos o cuerpo vacío" },
          "404": { description: "Producto no encontrado" },
          "409": { description: "Ya existe un producto con ese SKU" },
        },
      },

      delete: {
        tags: ["Productos"],
        summary: "Desactivar un producto",
        description:
          "Realiza una eliminación lógica: el producto deja de aparecer en las consultas de productos activos.",
        responses: {
          "200": { description: "Producto desactivado correctamente" },
          "400": { description: "Identificador inválido" },
          "404": { description: "Producto no encontrado" },
        },
      },
    },
  },

  components: {
    schemas: {
      Producto: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Teclado mecánico" },
          sku: { type: "string", example: "TEC-003" },
          descripcion: {
            type: "string",
            nullable: true,
            example: "Teclado mecánico USB",
          },
          precio: { type: "number", example: 120000 },
          stock: { type: "integer", example: 20 },
          stockMinimo: { type: "integer", example: 5 },
          activo: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      NuevoProducto: {
        type: "object",
        required: ["nombre", "sku", "precio"],
        properties: {
          nombre: { type: "string", example: "Teclado mecánico" },
          sku: { type: "string", example: "TEC-003" },
          descripcion: {
            type: "string",
            example: "Teclado mecánico USB",
          },
          precio: { type: "number", example: 120000 },
          stock: { type: "integer", minimum: 0, example: 20 },
          stockMinimo: { type: "integer", minimum: 0, example: 5 },
        },
      },

      ProductoActualizacion: {
        type: "object",
        properties: {
          nombre: {
            type: "string",
            maxLength: 120,
            example: "Teclado mecánico actualizado",
          },
          sku: {
            type: "string",
            maxLength: 40,
            example: "TEC-004",
          },
          descripcion: {
            type: "string",
            nullable: true,
            example: "Descripción actualizada",
          },
          precio: {
            type: "number",
            minimum: 0,
            example: 125000,
          },
          stock: {
            type: "integer",
            minimum: 0,
            example: 25,
          },
          stockMinimo: {
            type: "integer",
            minimum: 0,
            example: 5,
          },
          activo: {
            type: "boolean",
            example: true,
          },
        },
        minProperties: 1,
        additionalProperties: false,
      },

      Paginacion: {
        type: "object",
        properties: {
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 10 },
          total: { type: "integer", example: 25 },
          totalPages: { type: "integer", example: 3 },
          hasNextPage: { type: "boolean", example: true },
          hasPreviousPage: { type: "boolean", example: false },
        },
      },
    },
  },
};
