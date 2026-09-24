# Registro de uso de IA en el proyecto

A continuación se documentan los prompts utilizados durante el desarrollo del proyecto, junto con un resumen de la respuesta obtenida. Cada prompt está ligado a una tarea puntual del proyecto, organizados según la etapa en la que se usaron.

---

## 1. Configuración del entorno

**Prompt:** "Estoy en Windows y necesito instalar PostgreSQL, un cliente para probar APIs REST y configurar una cuenta para desplegar el proyecto más adelante. ¿Qué herramientas me recomiendas y cómo las instalo?"

**Resumen de la respuesta:** Recomendó instalar PostgreSQL (con pgAdmin incluido), la extensión Thunder Client en VS Code para probar endpoints, y crear una cuenta en Railway vinculada a GitHub para el despliegue posterior.

---

**Prompt:** "Después de instalar PostgreSQL en Windows, el comando psql no es reconocido en la terminal. ¿A qué se debe y cómo lo soluciono?"

**Resumen de la respuesta:** Explicó que el problema es que la carpeta `bin` de la instalación de PostgreSQL no está incluida en la variable de entorno PATH del sistema, e indicó cómo localizarla y agregarla manualmente.

---

## 2. Estructura del proyecto

**Prompt:** "El entregable exige que el repositorio tenga una carpeta 'Desarrollo' con el código y otra 'Documentación' con el README. ¿Cómo organizo las carpetas internas del backend (rutas, lógica de negocio, conexión a base de datos) siguiendo buenas prácticas?"

**Resumen de la respuesta:** Propuso separar `src/routes` (manejo de peticiones HTTP), `src/services` (lógica de acceso a datos), `src/db` (conexión centralizada) y `src/middlewares` (manejo de errores), explicando la responsabilidad de cada capa.

---

**Prompt:** "¿Por qué es recomendable separar las rutas de la lógica que consulta la base de datos, en lugar de escribir las consultas SQL directamente dentro de cada ruta?"

**Resumen de la respuesta:** Explicó que esa separación facilita el mantenimiento y las pruebas: si en el futuro cambia la base de datos o la forma de consultarla, solo se modifica la capa de servicios, sin tocar la definición de los endpoints.

---

## 3. Base de datos (PostgreSQL)

**Prompt:** "Necesito un script SQL para crear las tablas authors y posts, con una relación uno a muchos entre ellas (un autor puede tener varios posts), incluyendo un índice básico como pide la consigna. Explícame qué hace cada línea."

**Resumen de la respuesta:** Generó un script con `authors` (id, name, email único, bio) y `posts` (id, title, content, author_id como clave foránea con `ON DELETE CASCADE`, published), más un índice sobre `author_id`, explicando el propósito de cada restricción.

---

**Prompt:** "Antes de conectar Express a la base de datos, ¿cómo puedo verificar manualmente que la relación entre authors y posts funciona correctamente, incluyendo que no se pueda crear un post con un autor inexistente?"

**Resumen de la respuesta:** Sugirió dos pruebas en `psql`: intentar insertar un post con un `author_id` que no existe (debe fallar) y ejecutar una consulta con `JOIN` entre ambas tablas para confirmar que se pueden combinar correctamente.

---

## 4. Backend con Express

**Prompt:** "Quiero implementar primero los endpoints CRUD de authors usando un arreglo en memoria, antes de conectar la base de datos real, para probar la lógica HTTP de forma aislada. ¿Cómo estructuro esas rutas con los códigos de estado adecuados (200, 201, 404, 204)?"

**Resumen de la respuesta:** Generó las rutas GET, POST, PUT y DELETE para `/authors` usando un arreglo, devolviendo 404 cuando el recurso no existe, 201 al crear y 204 al eliminar.

---

**Prompt:** "Ya probé authors con datos en memoria. Ahora quiero conectarlo a PostgreSQL usando la librería pg, con un pool de conexiones reutilizable y consultas parametrizadas para evitar inyección SQL. ¿Cómo lo implemento?"

**Resumen de la respuesta:** Explicó qué es un pool de conexiones y por qué es más eficiente que abrir una conexión nueva en cada petición, y generó un servicio con consultas usando parámetros posicionales (`$1`, `$2`) en lugar de concatenar strings.

---

**Prompt:** "Necesito un endpoint que devuelva los posts de un autor específico, incluyendo el nombre del autor en cada resultado, usando una sola consulta con JOIN en lugar de dos consultas separadas."

**Resumen de la respuesta:** Propuso una consulta con `JOIN` entre `posts` y `authors`, usando un alias (`author_name`) para incluir el nombre del autor en cada fila del resultado, y explicó por qué esta ruta debe declararse antes que la ruta genérica `/posts/:id` en Express.

---

## 5. Validaciones y manejo de errores

**Prompt:** "Actualmente, si un cliente hace un POST sin enviar los campos obligatorios, el servidor responde con un error 500 y expone detalles internos. ¿Cómo implemento un manejo de errores centralizado que devuelva respuestas más claras y con los códigos HTTP correctos?"

**Resumen de la respuesta:** Propuso un middleware de errores en Express que intercepta los errores de la base de datos (por ejemplo, email duplicado o clave foránea inválida) y los traduce a respuestas JSON con el código adecuado (409 o 400), además de una validación explícita de campos obligatorios antes de llegar a la base de datos.

---

**Prompt:** "¿Cómo debería responder mi API si dos autores intentan registrarse con el mismo correo electrónico? Actualmente la base de datos lo rechaza, pero el error que se muestra al cliente no es claro."

**Resumen de la respuesta:** Indicó que PostgreSQL devuelve un código de error específico (23505) para violaciones de unicidad, y que ese código se puede capturar en el middleware de errores para responder con un 409 y un mensaje entendible, en lugar de propagar el error crudo de la base de datos.

---

## 6. Tests automatizados

**Prompt:** "La consigna exige tests unitarios que cubran al menos: crear un author, obtener un author, crear un post y eliminar un recurso inexistente, usando supertest. ¿Cómo escribo esos tests sin necesidad de levantar el servidor manualmente?"

**Resumen de la respuesta:** Explicó que Supertest permite simular peticiones HTTP directamente sobre la aplicación de Express (sin arrancar un servidor real), y generó un archivo de test con Jest cubriendo creación, consulta, validación de campos obligatorios y eliminación de recursos existentes e inexistentes.

---

**Prompt:** "Mis tests fallan con error 500, aunque los mismos endpoints funcionan correctamente cuando los pruebo manualmente con un cliente HTTP. ¿Qué podría estar causando esta diferencia de comportamiento?"

**Resumen de la respuesta:** Señaló que era probable que las variables de entorno (como la cadena de conexión a la base de datos) no se estuvieran cargando dentro del entorno de pruebas, ya que los archivos de test no pasan por el punto de entrada donde normalmente se configuran, y recomendó cargarlas explícitamente al inicio del archivo de test.

---

## 7. Documentación (OpenAPI y README)

**Prompt:** "Necesito documentar los 11 endpoints de mi API en formato OpenAPI (YAML), diferenciando claramente los datos que se envían al crear un recurso de los datos que la API devuelve. ¿Cómo estructuro ese archivo?"

**Resumen de la respuesta:** Generó un archivo `openapi.yaml` con esquemas separados para entrada (`AuthorInput`, `PostInput`) y salida (`Author`, `Post`), reutilizando definiciones mediante referencias en lugar de repetir la misma estructura en cada endpoint.

---

**Prompt:** "El entregable pide un README que permita a otra persona instalar y ejecutar el proyecto sin ayuda externa, incluyendo variables de entorno, scripts de base de datos, tests y despliegue. ¿Qué secciones debería incluir y en qué orden?"

**Resumen de la respuesta:** Propuso una estructura con: descripción del proyecto, tecnologías, estructura de carpetas, requisitos previos, pasos de instalación (clonar, instalar dependencias, crear base de datos, configurar variables de entorno, ejecutar scripts SQL, arrancar el servidor), tabla de endpoints, cómo correr los tests y cómo visualizar la documentación OpenAPI.

---

## 8. Seguimiento del progreso

**Prompt:** "Considerando todo lo que hemos avanzado hasta ahora en el proyecto (estructura, base de datos, endpoints, validaciones), ¿en qué porcentaje de avance me encuentro y qué me falta priorizar según el tiempo restante?"

**Resumen de la respuesta:** Estimó el porcentaje de avance según las partes ya completadas frente a las exigidas por el entregable, y priorizó las tareas restantes en función del tiempo disponible (validaciones antes que documentación, tests antes que despliegue).
