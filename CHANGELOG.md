# Changelog

## [2.0.0] - Sistema de Configuración YAML

### ✨ Nuevo
- **Configuración centralizada en YAML**: Todos los datos ahora se gestionan desde archivos YAML en `config/`
  - `personal.yml`: Información personal, contacto, habilidades, educación
  - `projects.yml`: Proyectos públicos y privados
  - `terminal.yml`: Configuración del terminal y archivos virtuales

- **Scripts de generación automática**: Los archivos YAML se procesan automáticamente en build
  - `npm run config`: Genera archivos TypeScript desde YAML
  - `npm run dev`: Regenera configs y arranca desarrollo
  - `npm run build`: Regenera configs y compila producción

- **Documentación completa**:
  - `CONFIGURACION.md`: Guía detallada de uso
  - `config/README.md`: Referencia rápida

### 🔄 Cambios
- Refactorizado sistema de datos para usar configuración generada
- Separación de concerns: configuración vs código
- Mejor organización de constantes y tipos

### 🏗️ Estructura
```
config/
  ├── personal.yml      # Tu información
  ├── projects.yml      # Tus proyectos
  ├── terminal.yml      # Config terminal
  └── README.md         # Guía rápida

scripts/
  └── loadConfig.js     # Parser YAML → TS

src/
  ├── config/           # (eliminado - ya no necesario)
  ├── constants/        # Constantes del proyecto
  │   ├── commands.ts
  │   ├── fileSystem.ts
  │   └── icons.ts
  ├── data/
  │   ├── generated/    # Auto-generado desde YAML
  │   ├── fileContents.ts
  │   ├── personal.ts
  │   └── projects.ts
  └── utils/
      ├── commandProcessor.ts
      └── fileHelpers.ts
```

## [1.0.0] - Código Limpio y Refactorización

### ✨ Mejoras de Código Limpio
- Extraídas constantes para valores mágicos
- Refactorizadas funciones largas en funciones más pequeñas
- Eliminado código duplicado
- Separación de responsabilidades

### 📁 Nueva Estructura
- Creados módulos de utilidades reutilizables
- Organización mejorada de componentes
- Constantes centralizadas

### 🎯 Componentes Optimizados
- `AboutMeComponent`: Uso de constantes, código más limpio
- `ProjectViewer`: Funciones separadas por responsabilidad
- `commandProcessor`: Configuración extraída a módulos

### ✅ Verificaciones
- Proyecto compila sin errores
- Build exitoso
- TypeScript validado
