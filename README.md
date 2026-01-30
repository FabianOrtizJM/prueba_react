# FleetTracker - Sistema de Gestión de Vehículos
Aplicación web para la gestión de flotas de vehículos desarrollada con React 19, Vite y TanStack Query.

Tecnologías

**React 19.2.0** - Librería de UI
**Vite 7.2.4** - Build tool y dev server
**Axios 1.13.4** - Cliente HTTP
**Tailwind CSS 4.x** - Framework CSS
**json-server 0.17.4** - API REST mock

# Requisitos Previos
Node.js 18 o superiornpm o yarn

# Instalación

1. **Clonar o descargar el proyecto**

```bash
cd prueba_react
```

2. **Instalar dependencias**

```bash
npm install
```

# Ejecución del Proyecto

1. Iniciar el servidor de API (json-server)
En una terminal, ejecuta:
```bash
json-server --watch db.json --port 3001
```

El servidor estará disponible en: `http://localhost:3001`

# Iniciar la aplicación React
En otra terminal, ejecuta:
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173` (o el puerto que indique Vite)

# Estructura del Proyecto

```
prueba_react/
├── src/
│   ├── api/
│   │   └── vehicles.js          # Servicios HTTP con Axios
│   ├── components/
│   │   ├── Header.jsx            # Header fijo con navegación
│   │   ├── Pagination.jsx        # Componente de paginación
│   │   ├── SearchBar.jsx         # Barra de búsqueda
│   │   ├── StatusFilter.jsx      # Filtro por estado
│   │   └── VehicleTable.jsx      # Tabla de vehículos
│   ├── pages/
│   │   ├── vehiclelist.jsx       # Lista principal con filtros
│   │   ├── VehicleDetail.jsx     # Detalle del vehículo
│   │   └── VehicleForm.jsx       # Formulario crear/editar
│   ├── routes/
│   │   └── AppRouter.jsx         # Configuración de rutas
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json                       # Base de datos (38 vehículos)
└── package.json
```