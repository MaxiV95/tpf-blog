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

- **NPM**: Versión >= 10.3.0
- **Node.js**: Versión >= 18.19.0
- **MongoDB**: Asegúrate de tener MongoDB instalado y en ejecución.

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
  MONGO_URL=uri_por_defecto_mongodb://127.0.0.1:27017/blog
  MONGO_TEST_URL=uri_por_defecto_mongodb://127.0.0.1:27017/blogTest
  JWT_SECRET=P4L4bR4_5Up3R_S3CR3T4
  GITHUB_WEBHOOK_SECRET=P4L4bR4_5Up3R_S3CR3T4
  ```

5. Para iniciar la aplicación:

- ```bash
  npm start
  ```

6. Para correr test unitarios:

- ```bash
  npm test
  ```

7. Para correr test de extremo a extremo:

- ```bash
  npm test:e2e
  ```

La aplicación estará disponible en http://localhost:3001.  
La documentación de la API estará disponible en http://localhost:3001/docs

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
- **Request Body** example: Status **201**
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
    // Otros resultados de búsqueda...
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
    "admin": boolean - optional - Restringido a administradores
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
  "page": number - optional - Número de página (por defecto es 1).
  "limit": number - optional - Cantidad de resultados por página (por defecto es 10).
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
    // Otros resultados de búsqueda...
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
    id: "6570bb7db2ad523394706c13",
    title: "Nuevo post",
    content: "Este es un ejemplo de contenido de post",
    categories: [
      "Nuevo",
      "Ejemplo"
    ],
    author: {
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
    id: "6570bb7db2ad523394706c13",
    title: "Nuevo post",
    content: "Este es un ejemplo de contenido de post",
    categories: [
      "Nuevo",
      "Ejemplo"
    ],
    author: {
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

### **Búsqueda y Filtrado**

- **`GET /posts/user/{:idUser}`** - Ver todos los posts de un usuario específico.
- **Params**:
  ```typescript
  "idUser": string - required - id del usuario.
  ```
- **Query**:
- **header**:
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  [
    {
      id: '6570bb7db2ad523394706c13',
      title: 'Nuevo post',
      content: 'Este es un ejemplo de contenido de post',
    },
    // Otros resultados de búsqueda...
  ];
  ```

Volver al [Índice](#índice)

- **`GET /posts/search`** - Buscar posts por título, contenido, etc. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10)
- **Params**:
- **Query**:
  ```typescript
  "query": string - required - Término de búsqueda.
  "page": number - optional - Número de página (por defecto es 1).
  "limit": number - optional - Cantidad de resultados por página (por defecto es 10).
  ```
- **header**:
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  [
    {
      id: '6570bb7db2ad523394706c13',
      title: 'Nuevo post',
      content: 'Este es un ejemplo de contenido de post',
    },
    // Otros resultados de búsqueda...
  ];
  ```

Volver al [Índice](#índice)

- **`GET /posts/filter`** - Endpoints adicionales para filtrar posts por categoría o autor
- **Params**:
- **Query**:
  ```typescript
  "category": string - optional - Categoría por la cual filtrar los posts.
  "author": string - optional - ID del autor por el cual filtrar los posts.
  "page": number - optional - Número de página (por defecto es 1).
  "limit": number - optional - Cantidad de resultados por página (por defecto es 10).
  ```
- **header**:
- **Body**:
- **Request Body** example: Status **200**
  ```typescript
  [
    {
      id: '6570bb7db2ad523394706c13',
      title: 'Nuevo post',
      content: 'Este es un ejemplo de contenido de post',
    },
    // Otros resultados de búsqueda...
  ];
  ```

Volver al [Índice](#índice)

### **Administración**

- **`GET /admin/users`** - (restringido a administradores) Obtener todos los usuarios.
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
    // Otros resultados de búsqueda...
  ];
  ```

Volver al [Índice](#índice)

- **`DELETE /admin/users/{:id}`** - (restringido a administradores) Eliminar usuarios.
- **Params**:
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

- **`GET /admin/posts`** - Obtener todos los posts con opciones de moderación (borrar o editar) .
- **Params**:
- **Query**:
- **header**:
  ```typescript
  "bearer": string - required - token de acceso de usuario.
  ```
- **Body**:
- **Request Body** example - Status **200**:
  ```typescript
  [
    {
      id: 'post_id_1',
      title: 'Título del Post 1',
      content: 'Contenido del Post 1',
    },
    // Otros resultados de búsqueda...
  ];
  ```

**Nota:** _Si el usuario que realiza la solicitud es un administrador, se devolverán todos los posts. Si el usuario no es un administrador, se devolverán solo los posts asociados a ese usuario._

Volver al [Índice](#índice)

## \_\_

También se incluirán test.

## Uso

- Registra un nuevo usuario.
- Inicia sesión con tu usuario.
- Crea, actualiza y elimina posts.
- Explora el listado de posts y realiza búsquedas y filtros.
- Accede al panel de administración si tienes permisos de administrador.

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un issue o envía una solicitud de extracción (pull request).

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes ver más detalles en el archivo LICENSE.
