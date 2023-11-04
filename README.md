# Proyecto de Blog con Nest.js

Este es un proyecto de ejemplo que utiliza Nest.js para crear una aplicación de blog con funciones de gestión de usuarios y posts. La aplicación incluye autenticación y autorización, y se conecta a una base de datos MongoDB para almacenar datos de usuarios y posts.

## Funcionalidades

- Registro de usuarios
- Inicio de sesión de usuarios
- Creación, lectura, actualización y eliminación de posts
- Listado de usuarios (restringido a administradores)
- Listado de posts
- Búsqueda y filtrado de posts
- Panel de administración (solo para administradores)

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

4. Configura la base de datos MongoDB en el archivo .env:
```env
MONGODB_URI=your_mongodb_uri
```

5. Inicia la aplicación:
```bash
npm start
```

La aplicación estará disponible en http://localhost:3000.

## Uso
- Registra un nuevo usuario.
- Inicia sesión con tu usuario.
- Crea, actualiza y elimina posts.
- Explora el listado de posts y realiza búsquedas y filtros.
- Accede al panel de administración si tienes permisos de administrador.

## Documentación
Toda la documentación de la API estará disponible en http://localhost:3000/docs una vez que inicies la aplicación.

## Contribuciones
Si deseas contribuir a este proyecto, por favor abre un issue o envía una solicitud de extracción (pull request).

## Licencia
Este proyecto está bajo la Licencia MIT. Puedes ver más detalles en el archivo LICENSE.