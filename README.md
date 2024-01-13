# Proyecto de Blog con Nest.js

Este es un proyecto de ejemplo que utiliza Nest.js para crear una aplicación de blog con funciones de gestión de usuarios y posts. La aplicación incluye autenticación y autorización, y se conecta a una base de datos MongoDB para almacenar datos de usuarios y posts.

## Funcionalidades
Considerando la utilización de MongoDB y un middleware de autorización para usuarios administradores, los endpoints podrían quedar de la siguiente manera:

### **Usuarios**
- **`POST /users`** - Registro de nuevos usuarios. Cada usuario debe tener nombre de usuario, contraseña, y un booleano isAdmin.
- **`POST /users/login`** - Inicio de sesión para usuarios.
- **`GET /users`** - Listado de usuarios (restringido a administradores).
- **`GET /users/{:id}`** - Obtener detalles de un usuario específico.
- **`PUT /users/{:id}`** - Actualizar un usuario específico (solo su propio perfil o si es administrador).
- **`DELETE /users/{:id}`** - Eliminar un usuario (solo administradores).

### **Posts**
- **`POST /posts`** - Crear un nuevo post (solo usuarios registrados). Los post tendrán id, título, autor, contenido y un array de categorías.
- **`GET /posts`** - Listado de todos los posts. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10).
- **`GET /posts/{:id}`** - Ver detalles de un post específico.
- **`PUT /posts/{:id}`** - Actualizar un post (solo el autor o administradores).
- **`DELETE /posts/{:id}`** - Eliminar un post (solo el autor o administradores).
- **`GET /posts/user/{:userId}`** - Ver todos los posts de un usuario específico.

### **Búsqueda y Filtrado**
- **`GET /posts/search`** - Buscar posts por título, contenido, etc. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10)
- **`GET /posts/filter`** - Endpoints adicionales para filtrar posts por categoría o autor

### **Administración**
- **`GET /admin/users`** - Obtener todos los usuarios (solo administradores).
- **`DELETE /admin/users/{:id}`** - Eliminar usuarios (solo administradores).
- **`GET /admin/posts`** - Obtener todos los posts con opciones de moderación (borrar o editar) (solo administradores).

Cada endpoint protegido debe ser asegurado mediante el middleware de autenticación, y para las rutas administrativas, un middleware adicional que verifique si el usuario es un administrador. 

Los endpoints deberán ser documentados para poder ser consumidos por un frontend. También se incluirán test y logging donde corresponda.

## Requisitos

Asegúrate de tener instalados los siguientes requisitos antes de ejecutar la aplicación:

- Node.js
- MongoDB

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/MaxiV95/tpf-blog.git
```

2. Navega al directorio del proyecto:
```bash
cd tpf-blog
```

3. Instala las dependencias:
```bash
npm install
```

4. Crea un archivo .env con los siguientes parámetros:
```env
PORT=puerto_por_defecto_3001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=P4L4bR4_5Up3R_S3CR3T4
GITHUB_WEBHOOK_SECRET=P4L4bR4_5Up3R_S3CR3T4
```

5. Inicia la aplicación:s
```bash
npm start
```

La aplicación estará disponible en http://localhost:3001.

## Uso
- Registra un nuevo usuario.
- Inicia sesión con tu usuario.
- Crea, actualiza y elimina posts.
- Explora el listado de posts y realiza búsquedas y filtros.
- Accede al panel de administración si tienes permisos de administrador.

## Documentación
Toda la documentación de la API estará disponible en http://localhost:3001/docs una vez que inicies la aplicación.

## Contribuciones
Si deseas contribuir a este proyecto, por favor abre un issue o envía una solicitud de extracción (pull request).

## Licencia
Este proyecto está bajo la Licencia MIT. Puedes ver más detalles en el archivo LICENSE.