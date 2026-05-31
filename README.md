# 💰 Cashi App

**Cashi** es una aplicación móvil moderna para la gestión de transacciones y categorías personalizadas. Construida con **React Native**, **Expo** y **TypeScript**, ofrece una experiencia fluida y responsiva en iOS, Android y Web.

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=flat-square&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura](#-arquitectura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Autenticación](#-autenticación)
- [Almacenamiento de Datos](#-almacenamiento-de-datos)
- [Desarrollo](#-desarrollo)
- [Contribuir](#-contribuir)
- [Recursos](#-recursos)

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
```

### Credenciales de prueba

Para acceder a la aplicación durante el desarrollo, usa:

- **Email:** `usuario@correo.com`
- **Contraseña:** `1234`

---

## 📁 Estructura del Proyecto

```
cashi-app/
├── app/                          # Pantallas y navegación (Expo Router)
│   ├── _layout.tsx              # Layout raíz
│   ├── index.tsx                # Pantalla de login
│   └── (tabs)/                  # Grupo de rutas con navegación por tabs
│       ├── _layout.tsx          # Configuración de tabs
│       ├── index.tsx            # Pantalla principal
│       └── explore.tsx          # Pantalla de exploración
│
├── components/                   # Componentes reutilizables
│   ├── category-item.tsx        # Componente de categoría
│   ├── transaction-item.tsx     # Componente de transacción
│   └── ui/                      # Componentes UI base
│
├── hooks/                        # Custom hooks personalizados
│   ├── useLogin.ts              # Lógica de autenticación
│   ├── useTransactions.ts       # Gestión de transacciones
│   ├── useTransactionForm.ts    # Formulario de transacción
│   ├── useCategories.ts         # Gestión de categorías
│   └── useCategoryForm.ts       # Formulario de categoría
│
├── constants/                    # Constantes y configuración
│   └── theme.ts                 # Tema, colores y estilos globales
│
├── types/                        # Definiciones de tipos TypeScript
│   ├── transaction.ts           # Tipos de transacción
│   ├── category.ts              # Tipos de categoría
│   └── auth.ts                  # Tipos de autenticación
│
├── schemas/                      # Esquemas de validación (Zod)
│   └── transaction.ts           # Esquemas de validación
│
├── assets/                       # Imágenes, fuentes y recursos
│   └── images/                  # Archivos de imagen
│
├── public/                       # Recursos estáticos
│
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Este archivo
```

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

## 💻 Desarrollo

### Scripts disponibles

```bash
# Iniciar servidor de desarrollo
yarn start

# Iniciar en Android
yarn android

# Iniciar en iOS
yarn ios

# Iniciar en web
yarn web

# Ejecutar linter
yarn lint

# Ejecutar linter con fix automático
yarn lint --fix
```

### Estructura de commits recomendada

Sigue la convención de commits semánticos:

```
feat: añade nueva funcionalidad
fix: corrige un bug
docs: actualiza documentación
style: cambios de formato (sin cambios lógicos)
refactor: reorganiza código sin cambios funcionales
test: añade o modifica pruebas
chore: actualiza dependencias o configuración
```

### Variables de entorno (opcional)

Crea un archivo `.env` en la raíz del proyecto si necesitas variables:

```env
EXPO_PUBLIC_API_URL=https://api.ejemplo.com
EXPO_PUBLIC_APP_NAME=Cashi
```

---

## 📝 Desarrollo de Características

### Crear un nuevo hook

1. Crea el archivo en `hooks/useNombreDelHook.ts`
2. Define los tipos si es necesario
3. Exporta el hook desde el archivo

### Crear un nuevo componente

1. Crea el archivo en `components/NombreDelComponente.tsx`
2. Define los props con TypeScript
3. Exporta desde `components/index.ts` (si aplica)

### Crear una nueva pantalla

1. Crea el archivo en `app/nombre-pantalla.tsx`
2. Usa el layout existente con `<Stack />`
3. Importa los componentes y hooks necesarios

---

## 🐛 Troubleshooting

### Problema: "Cannot find module" error

**Solución:**
```bash
# Limpia cache y reinstala dependencias
yarn cache clean
rm -rf node_modules
yarn install
```

### Problema: Puerto 8081 ya está en uso

**Solución:**
```bash
# Mata el proceso en el puerto
lsof -i :8081
kill -9 <PID>

# O inicia en un puerto diferente
yarn start --port 8082
```

### Problema: AsyncStorage no persiste datos

**Solución:**
- Verifica que AsyncStorage esté correctamente instalado
- Asegúrate de que los datos se estén guardando correctamente
- En web, verifica que localStorage esté habilitado

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
