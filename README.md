# StockPilot — API de gestión de inventario

API REST para la gestión de inventario, desarrollada con Node.js, Express, TypeScript, PostgreSQL, Prisma ORM y Zod.

StockPilot permite administrar productos, consultar el inventario, buscar y filtrar registros, paginar resultados y validar solicitudes. También incorpora manejo centralizado de errores, pruebas automatizadas y documentación interactiva de la API.

## Características principales

- Operaciones CRUD para productos.
- Eliminación lógica de productos para conservar sus registros.
- Validación de SKU únicos.
- Paginación de resultados.
- Búsqueda por nombre del producto o SKU.
- Filtrado por estado del inventario.
- Ordenamiento por nombre, precio o fecha de creación.
- Validación de datos con Zod.
- Manejo centralizado de errores.
- Cabeceras HTTP de seguridad con Helmet.
- Configuración de CORS.
- Pruebas automatizadas con Vitest y Supertest.
- Documentación interactiva con Swagger UI.
- Gestión de la base de datos mediante Prisma ORM.
- Configuración de PostgreSQL para desarrollo local con Docker Compose.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express 5:** framework para construir la API REST.
- **TypeScript:** tipado estático y detección de errores durante el desarrollo.
- **PostgreSQL 16:** sistema de gestión de bases de datos relacionales.
- **Prisma ORM 6:** acceso a datos y administración de migraciones.
- **Zod:** validación de datos.
- **Vitest:** ejecución de pruebas automatizadas.
- **Supertest:** pruebas de los endpoints HTTP.
- **Swagger UI:** documentación interactiva.
- **Docker Compose:** configuración del entorno local de base de datos.
- **pnpm:** administración de paquetes.

## Estructura del proyecto

```text
stockpilot/
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── docs/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── tests/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── compose.yaml
└── README.md
```

## Requisitos previos

Antes de instalar el proyecto, necesitas:

- Git.
- Node.js compatible con las dependencias del proyecto.
- pnpm 12.11.2.
- Docker y Docker Compose.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd stockpilot
```

Reemplaza `<URL_DE_TU_REPOSITORIO>` por la URL real de tu repositorio.

### 2. Iniciar PostgreSQL

Desde la raíz del proyecto, ejecuta:

```bash
docker compose up -d db
```

Verifica el estado del contenedor:

```bash
docker compose ps
```

Espera a que PostgreSQL esté disponible antes de continuar.

### 3. Configurar las variables de entorno

Crea el archivo local `.env` a partir de la plantilla:

```bash
cp api/.env.example api/.env
```

La configuración de desarrollo incluye estas variables:

```dotenv
DATABASE_URL="postgresql://stockpilot_user:stockpilot_dev_password@localhost:5432/stockpilot?schema=public"
PORT=3000
```

Estas credenciales son exclusivamente para el entorno local de desarrollo. En producción debes utilizar credenciales seguras y variables de entorno propias.

### 4. Instalar las dependencias

Entra en el directorio de la API:

```bash
cd api
```

Instala las dependencias:

```bash
pnpm install
```

### 5. Aplicar las migraciones de la base de datos

Ejecuta:

```bash
pnpm exec prisma migrate deploy --schema=./prisma/schema.prisma
```

Este comando aplica las migraciones existentes en el proyecto.

### 6. Generar Prisma Client

Ejecuta:

```bash
pnpm exec prisma generate --schema=./prisma/schema.prisma
```

### 7. Iniciar el servidor de desarrollo

Ejecuta:

```bash
pnpm dev
```

La API estará disponible en:

`http://localhost:3000`

## Documentación de la API

Con el servidor en ejecución, abre Swagger UI en:

`http://localhost:3000/api-docs`

Allí puedes consultar los endpoints, revisar los parámetros y explorar los esquemas de las solicitudes y respuestas.

## Endpoints principales

| Método | Endpoint               | Descripción                                  |
| ------ | ---------------------- | -------------------------------------------- |
| GET    | `/api/v1/healt`        | Comprobar el estado de la API                |
| GET    | `/api/v1/products`     | Consultar productos con paginación y filtros |
| GET    | `/api/v1/products/:id` | Consultar un producto por su identificador   |
| POST   | `/api/v1/products`     | Crear un producto                            |
| PATCH  | `/api/v1/products/:id` | Actualizar parcialmente un producto          |
| DELETE | `/api/v1/products/:id` | Eliminar lógicamente un producto             |

### Parámetros de consulta

El endpoint de listado admite los siguientes parámetros:

| Parámetro     | Descripción                                             |
| ------------- | ------------------------------------------------------- |
| `page`        | Número de página                                        |
| `limit`       | Cantidad de productos por página                        |
| `search`      | Búsqueda por nombre o SKU                               |
| `stockStatus` | Filtro por estado del inventario, incluido `out`        |
| `sortBy`      | Campo de ordenamiento: `nombre`, `precio` o `createdAt` |
| `sortOrder`   | Dirección del ordenamiento: `asc` o `desc`              |

Consulta Swagger UI para conocer los parámetros admitidos y los formatos exactos de cada solicitud.

## Validaciones y manejo de errores

La API utiliza Zod para validar los datos recibidos y un middleware centralizado para gestionar los errores.

Los códigos HTTP principales son:

- **200 OK:** solicitud procesada correctamente.
- **201 Created:** producto creado.
- **400 Bad Request:** datos o parámetros inválidos.
- **404 Not Found:** producto no encontrado.
- **409 Conflict:** SKU duplicado.
- **500 Internal Server Error:** error interno inesperado.

## Pruebas y compilación

Todos estos comandos se ejecutan desde el directorio `api`.

### Ejecutar las pruebas automatizadas

```bash
pnpm test
```

### Ejecutar las pruebas en modo de observación

```bash
pnpm test:watch
```

### Verificar los tipos de TypeScript

```bash
pnpm typecheck
```

### Compilar la aplicación

```bash
pnpm build
```

### Ejecutar la versión compilada

```bash
pnpm start
```

## Consideraciones de seguridad

- No subir el archivo `.env` al repositorio.
- No utilizar las credenciales de desarrollo en producción.
- Restringir CORS a los orígenes autorizados.
- Proteger las credenciales y los permisos de la base de datos.
- Revisar la configuración del entorno antes de desplegar la aplicación.

## Licencia

La licencia del proyecto está pendiente de definir.
