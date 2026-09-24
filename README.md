# MiniBlog API

API REST para gestionar autores (`authors`) y publicaciones (`posts`), desarrollada como Proyecto Integrador. Permite operaciones CRUD completas sobre ambas entidades, con persistencia en PostgreSQL, validaciones básicas, manejo de errores, tests automatizados y documentación OpenAPI.

## Tecnologías

- Node.js + Express
- PostgreSQL (librería `pg`, consultas parametrizadas)
- Jest + Supertest (tests)
- dotenv (variables de entorno)

## Estructura del proyecto

```
Desarrollo/
├── src/
│   ├── routes/       # Definición de endpoints (authors, posts)
│   ├── services/      # Lógica de acceso a la base de datos
│   ├── db/            # Conexión (pool) a PostgreSQL
│   ├── middlewares/    # Manejo de errores
│   ├── app.js         # Configuración de Express
│   └── server.js      # Arranque del servidor
├── sql/
│   ├── setup.sql       # Creación de tablas e índices
│   └── seed.sql         # Datos de ejemplo
├── tests/               # Tests con Jest y Supertest
├── openapi.yaml         # Documentación OpenAPI
├── .env.example
└── package.json
Documentacion/
├── README.md
└── registro-ia.md       # Registro de uso de IA en el proyecto
```

## Requisitos previos

- [Node.js](https://nodejs.org) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/download/) (v14 o superior)
- Git

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <nombre-del-repositorio>/Desarrollo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

En PostgreSQL (usando `psql` o pgAdmin), crea una base de datos vacía:

```sql
CREATE DATABASE miniblog;
```

### 4. Configurar las variables de entorno

Copia el archivo de ejemplo y edítalo con tus datos:

```bash
cp .env.example .env
```

Edita `.env` con tu configuración real:

### 5. Ejecutar los scripts de base de datos

Desde la carpeta `Desarrollo`:

```bash
psql -U postgres -d miniblog -f sql/setup.sql
psql -U postgres -d miniblog -f sql/seed.sql
```

Esto crea las tablas `authors` y `posts`, y las llena con datos de ejemplo.

### 6. Ejecutar el servidor

```bash
node src/server.js
```

El servidor queda disponible en `http://localhost:3000`.

## Endpoints disponibles

| Método | Ruta                      | Descripción                       |
| ------ | ------------------------- | --------------------------------- |
| GET    | `/authors`                | Listar autores                    |
| GET    | `/authors/:id`            | Obtener un autor                  |
| POST   | `/authors`                | Crear un autor                    |
| PUT    | `/authors/:id`            | Actualizar un autor               |
| DELETE | `/authors/:id`            | Eliminar un autor                 |
| GET    | `/posts`                  | Listar posts                      |
| GET    | `/posts/:id`              | Obtener un post                   |
| GET    | `/posts/author/:authorId` | Posts de un autor (con su nombre) |
| POST   | `/posts`                  | Crear un post                     |
| PUT    | `/posts/:id`              | Actualizar un post                |
| DELETE | `/posts/:id`              | Eliminar un post                  |

## Cómo ejecutar los tests

Desde la carpeta `Desarrollo`, con el servidor **detenido** (los tests usan la misma base de datos configurada en `.env`):

```bash
npm test
```

Esto ejecuta los 11 tests con Jest y Supertest, cubriendo creación, consulta, eliminación de recursos, validación de campos obligatorios y de referencias inválidas.

## Documentación OpenAPI

La documentación completa de la API está en `Desarrollo/openapi.yaml`. Para visualizarla:

1. Ve a [editor.swagger.io](https://editor.swagger.io)
2. Copia y pega el contenido de `Desarrollo/openapi.yaml`

## Deployment en Railway

(Se completa en el paso de deploy)

## Registro de uso de IA

Ver `Documentacion/registro-ia.md`.
