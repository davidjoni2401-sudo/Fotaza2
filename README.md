# Fotaza2 — Programación Web II

Aplicación web para almacenar, ordenar, buscar, compartir y vender fotografías en línea. Permite generar una comunidad de usuarios que comparten contenido propio, con sistema de moderación, valoraciones, comentarios, seguidores y colecciones personales.

---

## Tecnologías utilizadas

- **Backend:** Node.js + Express 5
- **Vistas:** Pug (renderizado en servidor)
- **Base de datos:** PostgreSQL + Sequelize ORM
- **Autenticación:** Express-session + bcrypt
- **Subida de archivos:** Multer

---

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo
- Git

---

## Instalación y puesta en marcha

Seguir estos pasos en orden:

### 1. Clonar el repositorio

```bash
git clone https://github.com/davidjoni2401-sudo/Fotaza2.git
cd Fotaza2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar el archivo de ejemplo y completar con los datos de tu entorno:

```bash
cp .env.example .env
```

Editar `.env` con los siguientes valores:

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=fotaza2
```

### 4. Inicializar la base de datos

Este comando crea todas las tablas necesarias:

```bash
npm run db:init
```

### 5. Iniciar la aplicación

```bash
npm start
```

La aplicación quedará disponible en: **http://localhost:3000**

---

## Usuarios de prueba

Todos los usuarios tienen rol de usuario registrado. Usar estas credenciales para probar la aplicación:

| Nombre   | Email                          | Contraseña   | Rol                      |
|----------|--------------------------------|--------------|--------------------------|
| Jonatan  | davi_joni9514@hotmail.com      | 1234         | usuario                  |
| Elizabet | david.joni2401@gmail.com       | 4321         | usuario                  |
| Daiana   | narutoluffyichigo95@gmail.com  | 3456         | usuario                  |
| Elizabet | david@gmail.com                | 12345        | usuario                  |
| Cecilia  | joni2401@gmail.com             | 1234         | usuario                  |
| Validador| validador@fotaza.com           | validador123 | validador de contenidos  |

> **Nota:** Para probar interacciones entre usuarios (seguir, comentar, valorizar, denunciar) se recomienda iniciar sesión con dos usuarios distintos en navegadores o perfiles diferentes.

---

## Funcionalidades implementadas

- **Autenticación:** Registro, login y logout de usuarios. Usuarios anónimos solo pueden ver contenido público.
- **Publicaciones:** Crear publicaciones con título, descripción, imagen y etiquetas. Soporte de licencia con/sin copyright y marca de agua personalizada.
- **Comentarios:** Comentar publicaciones, cerrar comentarios, denunciar comentarios.
- **Valoraciones:** Valorar imágenes del 1 al 5 (una vez por usuario, no puede valorar el autor).
- **Denuncias:** Denunciar publicaciones con motivo y descripción. Con más de 3 denuncias la publicación entra en revisión.
- **Me interesa:** Notificar al autor el interés de adquirir una imagen, con mensajería privada entre ambos.
- **Buscador:** Búsqueda y filtrado de publicaciones por diferentes criterios combinables.
- **Seguidores:** Seguir y dejar de seguir usuarios. Ver publicaciones de usuarios seguidos.
- **Notificaciones:** Sistema de notificaciones para comentarios, valoraciones, "me interesa" y nuevos seguidores.
- **Colecciones:** Guardar publicaciones en colecciones personales privadas.

---

## Criterio de la home

Las imágenes que aparecen en la home se ordenan por un puntaje calculado de la siguiente forma:

- Se priorizan publicaciones con valoración promedio mayor o igual a 4 y con más de 3 votos.
- Para mantener balance y mostrar contenido nuevo, se incluye también una selección aleatoria de publicaciones recientes que no entran en el grupo anterior.

---

## Estructura del proyecto

```
Fotaza2/
├── database/
│   └── init.js              # Script de inicialización de tablas
├── public/
│   └── uploads/             # Imágenes subidas por usuarios
├── src/
│   ├── app.js               # Punto de entrada de la aplicación
│   ├── config/              # Configuración de BD, Sequelize y Multer
│   ├── controllers/         # Lógica de negocio por módulo
│   ├── models/              # Consultas a la base de datos
│   ├── routes/              # Definición de rutas
│   ├── sequelizeModels/     # Modelos Sequelize (entidades y relaciones)
│   └── views/               # Vistas Pug
├── .env.example             # Variables de entorno de ejemplo
├── package.json
└── README.md
```

---

## Problemas encontrados durante el desarrollo

- **Migración de MySQL a PostgreSQL:** El proyecto comenzó con MySQL y fue migrado a PostgreSQL con Sequelize. Esto implicó reescribir las consultas y adaptar los tipos de datos.
- **Migración a Sequelize ORM:** El proyecto empezó con consultas SQL directas (`pg`) y fue migrado progresivamente a Sequelize para mejorar la organización y las relaciones entre modelos.
- **Manejo de archivos con Multer:** Se presentaron problemas con las rutas de almacenamiento de imágenes y la validación de tipos de archivo, resueltos configurando el storage y los filtros de Multer correctamente.
- **Módulo ES (`type: module`):** Al usar `"type": "module"` en el package.json fue necesario adaptar todas las importaciones a sintaxis `import/export` y ajustar la compatibilidad con algunas librerías.

---

## Aplicación en producción

> ⚠️ URL de producción pendiente de deploy.

---

## Autor

Jonatan — Programación Web II — Universidad de La Punta