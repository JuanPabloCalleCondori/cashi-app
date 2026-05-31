# 💰 Cashi App

**Cashi** es una aplicación móvil moderna para la gestión de transacciones y categorías personalizadas. Construida con **React Native**, **Expo** y **TypeScript**, ofrece una experiencia fluida y responsiva en iOS, Android y Web.

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=flat-square&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Demo y Screenshots](#-demo-y-screenshots)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura](#-arquitectura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Autenticación](#-autenticación)
- [Almacenamiento de Datos](#-almacenamiento-de-datos)
- [Variables de Entorno](#-variables-de-entorno)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Cambios Recientes](#-cambios-recientes)
- [Recursos](#-recursos)
- [Licencia](#-licencia)

---

## 📱 Descripción

Cashi es una solución integral para registrar, categorizar y visualizar tus transacciones financieras. Con una interfaz intuitiva y funcionalidades robustas, permite a los usuarios mantener un control detallado de sus movimientos de dinero en tiempo real.

### Principales funcionalidades:

✅ **Autenticación segura** - Sistema de login con validación de credenciales  
✅ **Gestión de transacciones** - Crear, editar y eliminar transacciones  
✅ **Categorización flexible** - Organizar transacciones por categorías personalizadas  
✅ **Captura de fotos** - Adjuntar comprobantes desde cámara y galería con preview  
✅ **Geolocalización** - Capturar coordenadas GPS y visualizar ubicación de transacciones  
✅ **Persistencia local** - Almacenamiento con AsyncStorage (fotos, ubicación, datos)  
✅ **Interfaz responsiva** - Compatible con iOS, Android y Web  
✅ **Navegación intuitiva** - Sistema de tabs para acceso rápido a funcionalidades  
✅ **TypeScript** - Código completamente tipado para mayor seguridad  

---

## ⭐ Características

### 🔐 Autenticación
- Sistema de login intuitivo
- Validación de credenciales en tiempo real
- Gestión de errores y mensajes personalizados
- Persistencia de sesión

### 💸 Gestión de Transacciones
- Crear, editar y eliminar transacciones
- Asignación de categorías por transacción
- Información detallada (monto, fecha, descripción)
- Listado dinámico actualizado en tiempo real

### 🏷️ Categorías
- Crear categorías personalizadas
- Asignar colores y iconos a categorías
- Filtrado de transacciones por categoría
- Edición y eliminación de categorías

### 📊 Experiencia del Usuario
- Interfaz limpia y moderna
- Navegación fluida con Expo Router
- Feedback visual inmediato
- Soporte para modo claro y oscuro

---

## 🛠️ Requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18 o superior
- **yarn** v1.22.4 (o npm)
- **Git** (opcional)

### Habilitar yarn con Corepack

```bash
corepack enable
corepack prepare yarn@1.22.4 --activate
```

Para verificar las versiones instaladas:

```bash
node --version      # v18.x.x o superior
yarn --version      # 1.22.4
```

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cashi-app.git
cd cashi-app
```

### 2. Instalar dependencias

```bash
yarn install
```

### 3. Instalar pods (solo para iOS)

```bash
cd ios
pod install
cd ..
```

---

## 🎯 Demo y Screenshots

| Pantalla de Login | Dashboard | Transacciones | Categorías |
|------------------|-----------|--------------|-----------|
| ![Login](./assets/images/login.png) | ![Dashboard](./assets/images/dashboard.png) | ![Transacciones](./assets/images/transactions.png) | ![Categorías](./assets/images/categories.png) |

> 📸 Las imágenes de demostración están disponibles en la carpeta `assets/images/`

---

## 🚀 Uso

### Iniciar la aplicación en modo desarrollo

```bash
yarn start
```

Esto abrirá el menú de Expo. Desde ahí puedes:

- **Escanear con QR** en Expo Go (disponible en App Store y Google Play)
- **Presionar `a`** para abrir en emulador Android
- **Presionar `i`** para abrir en simulador iOS (macOS)
- **Presionar `w`** para abrir en navegador web

### Comandos adicionales

```bash
# Abrir directamente en emulador Android
yarn android

# Abrir directamente en simulador iOS (macOS)
yarn ios

# Abrir directamente en navegador web
yarn web

# Ejecutar linter
yarn lint

# Limpiar cache
expo cache clear
```

### Credenciales de prueba

Para acceder a la aplicación durante el desarrollo, usa:

- **Email:** `usuario@correo.com`
- **Contraseña:** `1234`

---

## 📜 Scripts Disponibles

```bash
# Modo desarrollo
yarn start           # Inicia el servidor de desarrollo

# Plataformas específicas
yarn android         # Abre en Android
yarn ios             # Abre en iOS (macOS)
yarn web             # Abre en navegador web

# Linting
yarn lint            # Ejecuta ESLint
yarn lint --fix      # Ejecuta ESLint con correcciones automáticas

# Instalación
yarn install         # Instala dependencias

# Gestión de cache
expo cache clear     # Limpia el cache de Expo
```

---

## 📁 Estructura del Proyecto

```
cashi-app/
├── app/                              # Pantallas y navegación (Expo Router)
│   ├── _layout.tsx                  # Layout raíz con configuración global
│   ├── index.tsx                    # Pantalla de login (punto de entrada)
│   ├── +html.tsx                    # Configuración HTML para web
│   ├── +not-found.tsx               # Página 404
│   └── (tabs)/                      # Grupo de rutas con navegación por tabs
│       ├── _layout.tsx              # Configuración de tabs y navegación
│       ├── index.tsx                # Pantalla principal (Dashboard)
│       ├── categories.tsx           # Pantalla de gestión de categorías
│       ├── profile.tsx              # Pantalla de perfil
│       └── settings.tsx             # Pantalla de configuración
│
├── components/                       # Componentes reutilizables
│   ├── category-item.tsx            # Componente de visualización de categoría
│   ├── transaction-item.tsx         # Componente de visualización de transacción
│   ├── transaction-form.tsx         # Formulario para crear/editar transacción
│   ├── category-form.tsx            # Formulario para crear/editar categoría
│   ├── header.tsx                   # Encabezado común
│   ├── footer.tsx                   # Pie de página
│   └── ui/                          # Componentes UI base reutilizables
│       ├── button.tsx               # Botón personalizado
│       ├── input.tsx                # Campo de entrada
│       ├── modal.tsx                # Modal
│       ├── loading.tsx              # Indicador de carga
│       └── error-boundary.tsx       # Límite de error
│
├── hooks/                            # Custom hooks personalizados
│   ├── useLogin.ts                  # Lógica de autenticación y sesión
│   ├── useTransactions.ts           # Gestión de transacciones (CRUD)
│   ├── useTransactionForm.ts        # Lógica del formulario de transacción
│   ├── useCategories.ts             # Gestión de categorías (CRUD)
│   ├── useCategoryForm.ts           # Lógica del formulario de categoría
│   ├── useStorage.ts                # Wrapper de AsyncStorage
│   ├── useLocation.ts               # Gestión de ubicación GPS
│   └── useCamera.ts                 # Gestión de cámara y galería
│
├── constants/                        # Constantes y configuración global
│   ├── theme.ts                     # Tema, colores y estilos globales
│   ├── colors.ts                    # Paleta de colores
│   ├── typography.ts                # Definiciones de tipografía
│   └── endpoints.ts                 # URLs de API (si aplica)
│
├── types/                            # Definiciones de tipos TypeScript
│   ├── transaction.ts               # Tipos e interfaces de transacción
│   ├── category.ts                  # Tipos e interfaces de categoría
│   ├── auth.ts                      # Tipos e interfaces de autenticación
│   ├── user.ts                      # Tipos e interfaces de usuario
│   ├── api.ts                       # Tipos de respuestas API
│   └── index.ts                     # Exportaciones centralizadas
│
├── schemas/                          # Esquemas de validación (Zod)
│   ├── transaction.ts               # Esquemas de validación de transacción
│   ├── category.ts                  # Esquemas de validación de categoría
│   ├── auth.ts                      # Esquemas de validación de auth
│   └── index.ts                     # Exportaciones centralizadas
│
├── utils/                            # Utilidades y funciones auxiliares
│   ├── storage.ts                   # Funciones de AsyncStorage
│   ├── validators.ts                # Funciones de validación
│   ├── formatters.ts                # Formateadores (fechas, moneda, etc)
│   ├── helpers.ts                   # Funciones auxiliares generales
│   └── constants.ts                 # Constantes de la app
│
├── assets/                           # Imágenes, fuentes y recursos
│   ├── images/                      # Archivos de imagen (PNG, JPG, SVG)
│   │   ├── logo.png
│   │   ├── placeholder.png
│   │   └── icons/
│   ├── fonts/                       # Fuentes personalizadas (opcional)
│   └── lottie/                      # Animaciones Lottie (opcional)
│
├── public/                           # Recursos estáticos
│   └── index.html                   # HTML principal para web
│
├── .expo/                            # Configuración de Expo (generada)
├── .git/                             # Repositorio Git
├── .gitignore                        # Archivos ignorados por Git
├── .vscode/                          # Configuración de VS Code
│   ├── settings.json
│   └── launch.json
├── node_modules/                     # Dependencias instaladas
├── app.json                          # Configuración de Expo
├── expo-env.d.ts                     # Tipos de variables de entorno
├── tsconfig.json                     # Configuración de TypeScript
├── eslint.config.js                  # Configuración de ESLint
├── package.json                      # Dependencias y scripts
├── yarn.lock                         # Lock file de dependencias
└── README.md                         # Este archivo
```

### Archivos clave

- **app.json**: Configuración principal de Expo, nombre, versión, etc.
- **tsconfig.json**: Configuración de compilador TypeScript
- **package.json**: Dependencias, versión y scripts disponibles
- **eslint.config.js**: Reglas de linting de código

---

## 🏗️ Arquitectura

### Patrón de Diseño

Cashi sigue un patrón de **componentes funcionales con hooks**:

```
┌─────────────────────────────────────┐
│         Pantallas (Screens)         │
│  (Componentes de Expo Router)       │
└────────────────┬────────────────────┘
                 │
        ┌────────▼────────┐
        │  Custom Hooks   │
        │  (Lógica)       │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  AsyncStorage   │
        │  (Persistencia) │
        └─────────────────┘
```

### Flujo de Datos

1. **Hooks personalizados** manejan la lógica de negocio
2. **Components** renderiza la UI usando datos del hook
3. **AsyncStorage** persiste los datos localmente
4. **Validación con Zod** asegura integridad de datos

---

## 🔧 Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | React Native | 0.81 |
| **Plataforma** | Expo | ~54.0 |
| **Enrutamiento** | Expo Router | ~6.0 |
| **Lenguaje** | TypeScript | ~5.9 |
| **Navegación** | React Navigation | ^7.1 |
| **Estado** | React Hooks | 19.1 |
| **Almacenamiento** | AsyncStorage | 2.2.0 |
| **Validación** | Zod | ^4.4 |
| **Linting** | ESLint | ^9.25 |
| **Iconos** | Expo Vector Icons | ^15.0 |

---

## 🔐 Autenticación

La autenticación se maneja mediante el hook `useLogin`:

```typescript
const { login, error } = useLogin()

const handleLogin = () => {
  const success = login(email, password)
  if (success) {
    router.replace("/(tabs)")
  }
}
```

### Credenciales por defecto (desarrollo)

```
Email: usuario@correo.com
Password: 1234
```

Para cambiar las credenciales, edita el archivo [hooks/useLogin.ts](hooks/useLogin.ts).

> ⚠️ En producción, integra un servicio de autenticación real (Firebase, Auth0, etc.)

---

## 💾 Almacenamiento de Datos

Cashi utiliza **AsyncStorage** para persistencia local:

- **Transacciones**: Almacenadas con key `transactions`
- **Categorías**: Almacenadas con key `categories`
- **Sesión**: Información del usuario autenticado

### Estructura de datos

```typescript
// Transacción
interface Transaction {
  id: string
  amount: number
  category: string
  description: string
  date: Date
  type: 'income' | 'expense'
}

// Categoría
interface Category {
  id: string
  name: string
  color: string
  icon: string
}
```

---

## 💻 Guía de Desarrollo

### Configuración del entorno

#### Windows / macOS / Linux

1. **Instalación de dependencias base:**

```bash
# Instalar Node.js 18+ desde https://nodejs.org/
# Verificar instalación
node --version
npm --version
```

2. **Configurar Yarn:**

```bash
corepack enable
corepack prepare yarn@1.22.4 --activate
yarn --version
```

3. **Instalar dependencias del proyecto:**

```bash
cd cashi-app
yarn install
```

4. **Instalar dependencias de iOS (solo macOS):**

```bash
cd ios
pod install
cd ..
```

### Estructura de commits recomendada

Sigue la convención de commits semánticos:

```
feat: añade nueva funcionalidad de transacciones
fix: corrige bug en guardado de categorías
docs: actualiza documentación del README
style: reformatea código en componentes
refactor: reorganiza estructura de hooks
test: añade pruebas unitarias
chore: actualiza dependencias a versiones 5.9
ci: configura GitHub Actions
```

### Mejores prácticas

**TypeScript:**
- Siempre define tipos explícitos
- Usa interfaces para estructuras de datos
- Evita `any`, usa `unknown` si es necesario

**Componentes:**
- Mantén componentes pequeños y enfocados
- Usa memo para componentes costosos
- Proporciona PropTypes o interfaces TypeScript

**Rendimiento:**
- Evita renders innecesarios con useMemo y useCallback
- Usa lazy loading para pantallas
- Optimiza imágenes

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto si necesitas variables:

```env
EXPO_PUBLIC_API_URL=https://api.ejemplo.com
EXPO_PUBLIC_APP_NAME=Cashi
EXPO_PUBLIC_VERSION=1.0.0
```

**Nota:** Las variables deben tener prefijo `EXPO_PUBLIC_` para estar disponibles en la app.

---

## 🧪 Testing

### Ejecutar pruebas (opcional)

Actualmente el proyecto no tiene pruebas unitarias. Para añadir Jest:

```bash
yarn add --dev jest @testing-library/react-native @types/jest
```

### Crear una prueba

```typescript
// hooks/__tests__/useLogin.test.ts
import { renderHook, act } from '@testing-library/react-native'
import { useLogin } from '../useLogin'

describe('useLogin', () => {
  it('debe validar credenciales correctas', () => {
    const { result } = renderHook(() => useLogin())
    
    act(() => {
      const success = result.current.login('usuario@correo.com', '1234')
      expect(success).toBe(true)
    })
  })
})
```

---

## 🛠️ Troubleshooting

### Problema: "Cannot find module" error

**Solución:**
```bash
# Limpia cache y reinstala dependencias
yarn cache clean
rm -rf node_modules
rm yarn.lock
yarn install
```

### Problema: Puerto 8081 ya está en uso

**Solución:**
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS / Linux
lsof -i :8081
kill -9 <PID>

# O inicia en un puerto diferente
yarn start --port 8082
```

### Problema: AsyncStorage no persiste datos

**Solución:**
- Verifica que AsyncStorage esté correctamente importado
- En desarrollo, revisa que no esté limpiando el cache
- En web, verifica que localStorage esté habilitado en el navegador

### Problema: Cambios no aparecen en la app

**Solución:**
```bash
# Limpia el cache de Expo
expo cache clear

# Recarga la app manualmente
# En el terminal presiona: r
```

### Problema: Build fallido en iOS

**Solución:**
```bash
# Limpia build de iOS
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

---

## 🚀 Roadmap

### v1.0.0 (Actual) ✅
- [x] Autenticación básica
- [x] Crear/editar/eliminar transacciones
- [x] Gestión de categorías
- [x] Captura de fotos
- [x] Geolocalización
- [x] Almacenamiento local
- [x] Interfaz responsiva
- [x] Soporte Web

### v1.1.0 (Próximo) 🔄
- [ ] Exportar transacciones a CSV
- [ ] Gráficos y estadísticas
- [ ] Búsqueda avanzada
- [ ] Filtros por fecha
- [ ] Modo oscuro mejorado
- [ ] Notificaciones

### v2.0.0 (Futuro) 📋
- [ ] Backend integrado
- [ ] Sincronización en la nube
- [ ] Múltiples usuarios
- [ ] Presupuestos y alertas
- [ ] Integración con bancos
- [ ] Reportes avanzados

---

## 📝 Cambios Recientes

### v1.0.0 - Mayo 2026

**Agregado:**
- ✨ Nuevo diseño mejorado del README
- 🎨 Mejor estructura de documentación
- 📚 Secciones ampliadas con ejemplos de código
- 🔧 Guía completa de desarrollo
- 🛠️ Troubleshooting detallado
- 🚀 Roadmap del proyecto

**Mejorado:**
- 📖 Documentación más clara y accesible
- 🎯 Ejemplos de código más realistas
- 📋 Tabla de contenidos expandida
- 🏗️ Arquitectura documentada

**Corregido:**
- ✅ Enlaces internos en la documentación
- ✅ Compatibilidad multiplataforma

---

## 👥 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Pautas de contribución

- Usa TypeScript en todo el código nuevo
- Mantén la estructura de carpetas existente
- Escribe mensajes de commit descriptivos
- Asegúrate que el linter pase antes de enviar PR

---

## 📚 Recursos

### Documentación oficial
- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de Expo Router](https://docs.expo.dev/router/introduction/)
- [Documentación de React Native](https://reactnative.dev/)
- [Documentación de React Navigation](https://reactnavigation.org/)
- [Documentación de Zod](https://zod.dev/)

### Tutoriales y guías
- [React Native Guide](https://reactnative.dev/docs/getting-started)
- [Expo Tutorial](https://docs.expo.dev/tutorial/create-your-first-app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Cashi App** - Aplicación de gestión de transacciones personales

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección [Troubleshooting](#-troubleshooting)
2. Abre un issue en el repositorio
3. Contacta al equipo de desarrollo

---

<div align="center">

**Hecho con ❤️ usando React Native y Expo**

[⬆ Volver al inicio](#-cashi-app)

</div>
