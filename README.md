# Proyecto de Blog con Nest.js

Este es un proyecto de servidor que utiliza Nest.js para crear una aplicación de blog con funciones de gestión de usuarios y posts. La aplicación incluye autenticación y autorización, y se conecta a una base de datos MongoDB para almacenar datos de usuarios y posts.

# Índice

- [Primeros pasos](#primeros-pasos)
- [Usuarios](#usuarios)
  - [Crear Usuario](#crear-usuario)
  - [Iniciar sesión](#iniciar-sesión)
  - [Listado de usuarios](#listado-de-usuarios)
  - [Obtener usuario especifico](#obtener-usuario-especifico)
  - [Actualizar usuario especifico](#actualizar-usuario-especifico)
  - [Eliminar usuario especifico](#eliminar-usuario-especifico)
- [Posteos](#posteos)
  - [Crear post](#crear-post)
  - [Listado de posts](#listado-de-posts)
  - [Obtener post especifico](#obtener-post-especifico)
  - [Actualizar post especifico](#actualizar-post-especifico)
  - [Eliminar post especifico](#eliminar-post-especifico)
  - [Búsqueda y Filtrado](#búsqueda-y-filtrado)
- [Administración](#)
  - [Listado de usuarios](#)
  - [Eliminar usuario especifico](#)
  - [Listado de posts con opciones de moderación](#)

Volver al [Índice](#índice)

## **Primeros pasos**

### Requisitos

Asegúrate de tener instalados los siguientes requisitos antes de ejecutar la aplicación:

- NPM
- Node
- MongoDB

### Instalación

1. Clona este repositorio:

- ```bash
  git clone https://github.com/MaxiV95/tpf-blog.git
  ```

2. Navega al directorio del proyecto:

- ```bash
  cd tpf-blog
  ```

3. Instala las dependencias:

- ```bash
  npm install
  ```

4. Crea un archivo .env con los siguientes parámetros:

- ```env
  PORT=puerto_por_defecto_3001
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=P4L4bR4_5Up3R_S3CR3T4
  GITHUB_WEBHOOK_SECRET=P4L4bR4_5Up3R_S3CR3T4
  ```

5. Inicia la aplicación:s

- ```bash
  npm start
  ```

La aplicación estará disponible en http://localhost:3001.

Volver al [Índice](#índice)

## **Usuarios**

### Crear Usuario

- **`POST /users`** - Registro de nuevos usuarios. Cada usuario debe tener correo electrónico, contraseña, nombre de usuario y un booleano isAdmin que por defecto sera false.
- **Params**:
- **Query**:
- **header**:
- **Body**:
  ```typescript
  {
    "email": string - required - Correo electrónico del usuario.
    "password": string - required - Contraseña del usuario.
    "nickName": string - required - Nombre de usuario.
    "img": string - optional - Enlace de la imagen del usuario.
  }
  ```
- **Request Body** example: Status **201**
  ```typescript
  {
    id: "6570bb7db2ad523394706c12",
    email: "maxi@gmail.com",
    nickName: "MaxiV95",
    admin: false,
    img: "https://avatars.githubusercontent.com/u/118027004"
  }
  ```

volver al [Índice](#índice)

### Iniciar sesión

- **`POST /users/login`** - Inicio de sesión para usuarios. Retorna token de acceso JWT para siguientes consultas.
- **Params**:
- **Query**:
- **header**:
- **Body**:
  ```typescript
  {
    "email": string - required - Correo electrónico del usuario.
    "password": string - required - Contraseña del usuario.
  }
  ```
- **Request Body** example: Status **200**
  ```typescript
  {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCVI9...';
  }
  ```

volver al [Índice](#índice)

### Listado de usuarios

- **`GET /users`** - (restringido a administradores) Obtener el listado de todos los usuarios.
- **Params**:
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  [
    {
      id: '6570bb7db2ad523394706c12',
      email: 'maxi@gmail.com',
      nickName: 'MaxiV95',
      admin: false,
      img: 'https://avatars.githubusercontent.com/u/118027004',
    },
  ];
  ```

volver al [Índice](#índice)

### Obtener usuario especifico

- **`GET /users/{:id}`** - Obtener detalles de un usuario específico.
- **Params**:
  ```typescript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  {
    id: '6570bb7db2ad523394706c12',
    email: 'maxi@gmail.com',
    nickName: 'MaxiV95',
    admin: false,
    img: 'https://avatars.githubusercontent.com/u/118027004',
  }
  ```

volver al [Índice](#índice)

### Actualizar usuario especifico

- **`PUT /users/{:id}`** - (restringido a administradores o perfil propio) Actualizar un usuario específico.
- **Params**:
  ```typescript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
  ```typescript
  {
    "nickName": string - optional - Nombre de usuario.
    "img": string - optional - Enlace de la imagen del usuario.
  }
  ```
- **Request Body** example: Status **200**
  ```typescript
  {
    id: '6570bb7db2ad523394706c12',
    email: 'maxi@gmail.com',
    nickName: 'MaxiV95',
    admin: false,
    img: 'https://avatars.githubusercontent.com/u/118027004',
  }
  ```

volver al [Índice](#índice)

### Eliminar usuario especifico

- **`DELETE /users/{:id}`** - (restringido a administradores) Eliminar un usuario.
- **Params**:
  ```typescript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  {
    acknowledged: true,
    deletedCount: 1
  }
  ```

Volver al [Índice](#índice)

## **Posteos**

### Crear post

- **`POST /posts`** - (restringido a usuarios registrados) Crear un nuevo post. Los post tendrán id, título, autor, contenido y un array de categorías.
- **Params**:
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
  ```typescript
  {
    "title": string - required - Titulo del post.
    "content": string - required - Contenido del post.
    "categories": string[] - required - Array de categorías.
  }
  ```
- **Request Body** example: Status **201**
  ```typescript
  {
    id: "6570bb7db2ad523394706c13"
    title: "Nuevo post",
    content: "Este es un ejemplo de contenido de post",
    categories: [
      "Nuevo",
      "Ejemplo"
    ],
    author: {
      id: "6570bb7db2ad523394706c12",
      nickName: "MaxiV95"
    },
  }
  ```

Volver al [Índice](#índice)

### Listado de posts

- **`GET /posts`** - Listado de todos los posts. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10).
- **Params**:
- **Query**:
  ```typescript
  "page": number - optional - Numero de pagina, por defecto 1.
  "limit": number - optional - Numero de posteos por pagina, por defecto 10.
  ```
- **header**:
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  [
    {
      id: "6570bb7db2ad523394706c13"
      title: "Nuevo post",
      content: "Este es un ejemplo de contenido de post",
    },
  ];
  ```

Volver al [Índice](#índice)

### Obtener post especifico

- **`GET /posts/{:id}`** - Ver detalles de un post específico.
- **Params**:
  ```typescript
  "id": string - required - id del post.
  ```
- **Query**:
- **header**:
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  {
    title: "Nuevo post",
    content: "Este es un ejemplo de contenido de post",
    id: "6570bb7db2ad523394706c13",
    categories: [
      "Nuevo",
      "Ejemplo"
    ],
    Author: {
      id: "6570bb7db2ad523394706c12",
      nickName: "MaxiV95"
    }
  }
  ```

Volver al [Índice](#índice)

### Actualizar post especifico

- **`PUT /posts/{:id}`** - (restringido a administradores o autor) Actualizar un post.
- **Params**:
  ```typescript
  "id": string - required - id del post.
  ```
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
  ```typescript
  {
    "title": string - optional - Titulo del post.
    "content": string - optional - Contenido del post.
    "categories": string[] - optional - Array de categorías.
  }
  ```
- **Request Body** example: Status **200**
  ```typescript
  {
    title: "Nuevo post",
    content: "Este es un ejemplo de contenido de post",
    id: "6570bb7db2ad523394706c13",
    categories: [
      "Nuevo",
      "Ejemplo"
    ],
    Author: {
      id: "6570bb7db2ad523394706c12",
      nickName: "MaxiV95"
    }
  }
  ```

Volver al [Índice](#índice)

### Eliminar post especifico

- **`DELETE /posts/{:id}`** - (restringido a administradores o autor) Eliminar un post.
- **Params**:
  ```typescript
  "id": string - required - id del post.
  ```
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  {
    acknowledged: true,
    deletedCount: 1
  }
  ```

Volver al [Índice](#índice)

## \_\_

### **Búsqueda y Filtrado**

- **`GET /posts/user/{:userId}`** - Ver todos los posts de un usuario específico.
- **`GET /posts/search`** - Buscar posts por título, contenido, etc. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10)
- **`GET /posts/filter`** - Endpoints adicionales para filtrar posts por categoría o autor

### **Administración**

- **`GET /admin/users`** - Obtener todos los usuarios (solo administradores).
- **`DELETE /admin/users/{:id}`** - Eliminar usuarios (solo administradores).
- **`GET /admin/posts`** - Obtener todos los posts con opciones de moderación (borrar o editar) (solo administradores).

Cada endpoint protegido debe ser asegurado mediante el middleware de autenticación, y para las rutas administrativas, un middleware adicional que verifique si el usuario es un administrador.

Los endpoints deberán ser documentados para poder ser consumidos por un frontend. También se incluirán test y logging donde corresponda.

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

https://stackedit.io/app#
