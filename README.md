# Portfolio Terminal - Ingeniero Informático

Un portafolio web interactivo que simula una terminal Linux, combinando una interfaz de línea de comandos (CLI) con un área de visualización de contenido moderno.

## Características

- **Terminal Linux Interactiva**: Emulador de terminal completamente funcional con historial de comandos (flechas arriba/abajo)
- **Interfaz Dividida**: Layout responsivo con Grid CSS - terminal a la izquierda, contenido a la derecha
- **Tema Oscuro**: Diseño inspirado en terminales Linux con colores verde, negro y fuentes monoespaciadas
- **Comandos Funcionales**: Sistema de comandos extensible con navegación por secciones

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **SASS/CSS Modules** - Estilos modulares y mantenibles
- **Fira Code** - Fuente monoespaciada

## Estructura del Proyecto

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal de Next.js
│   │   ├── page.tsx            # Página principal
│   │   └── globals.scss        # Estilos globales
│   ├── components/
│   │   ├── AppLayout/          # Contenedor principal con Grid
│   │   │   ├── AppLayout.tsx
│   │   │   └── AppLayout.module.scss
│   │   ├── TerminalEmulator/   # Componente de la terminal
│   │   │   ├── TerminalEmulator.tsx
│   │   │   └── TerminalEmulator.module.scss
│   │   ├── ContentPanel/       # Panel de contenido visual
│   │   │   ├── ContentPanel.tsx
│   │   │   └── ContentPanel.module.scss
│   │   └── views/
│   │       └── AboutMeComponent/
│   │           ├── AboutMeComponent.tsx
│   │           └── AboutMeComponent.module.scss
│   ├── types/
│   │   └── terminal.ts         # Tipos TypeScript
│   └── utils/
│       └── commandProcessor.ts # Lógica de procesamiento de comandos
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `help` | Muestra la lista de comandos disponibles |
| `ls` | Lista los directorios y archivos principales |
| `cd <dir>` | Navega a una sección (about, portfolio, blog, contact) |
| `cd ..` | Vuelve a la pantalla de bienvenida |
| `clear` | Limpia el historial de la terminal |
| `cat <file>` | Muestra el contenido de un archivo |

## Funcionalidades Implementadas

### TerminalEmulator
- ✅ Input funcional con prompt `[user@portfolio ~]$`
- ✅ Historial de comandos (flechas arriba/abajo)
- ✅ Scroll automático
- ✅ Header estilo ventana de terminal con botones (cerrar, minimizar, maximizar)
- ✅ Colores diferenciados para comandos, output y errores

### ContentPanel
- ✅ Mensaje de bienvenida con ASCII art
- ✅ Instrucciones de uso
- ✅ Cambio dinámico de contenido según comando `cd`
- ✅ Animaciones de transición

### AppLayout
- ✅ Grid layout 50/50 en desktop
- ✅ Layout vertical en mobile
- ✅ Borde verde divisorio

### Sistema de Comandos
- ✅ Procesador de comandos extensible
- ✅ Manejo de errores
- ✅ Comandos: help, ls, cd, clear, cat

## Próximos Pasos

### Componentes Pendientes
- [ ] PortfolioComponent - Galería de proyectos
- [ ] BlogComponent - Lista de artículos
- [ ] ContactComponent - Formulario de contacto
- [ ] ResumeComponent - CV visualizado

### Funcionalidades Adicionales
- [ ] Comando `cat resume.pdf` para mostrar CV
- [ ] Auto-completado con tecla Tab
- [ ] Comando `neofetch` con información del sistema
- [ ] Comando `tree` para mostrar estructura
- [ ] Temas de color personalizables
- [ ] Animaciones y efectos de escritura
- [ ] Persistencia del historial de comandos

### Mejoras
- [ ] SEO y meta tags
- [ ] Analytics
- [ ] Modo claro/oscuro
- [ ] Accesibilidad (ARIA labels)
- [ ] Tests unitarios

## Personalización

### Cambiar Colores

Edita [src/app/globals.scss](src/app/globals.scss) y los archivos `.module.scss` para personalizar los colores del tema:

```scss
$terminal-green: #00ff00;
$terminal-bg: #0a0a0a;
$terminal-border: #00ff00;
```

### Añadir Nuevos Comandos

Edita [src/utils/commandProcessor.ts](src/utils/commandProcessor.ts):

```typescript
case 'tu-comando':
  return {
    output: ['Tu output aquí'],
    contentView: 'tu-vista' // opcional
  }
```

### Añadir Nuevas Vistas

1. Crea un componente en `src/components/views/`
2. Añade el tipo en [src/types/terminal.ts](src/types/terminal.ts)
3. Importa y usa en [src/components/ContentPanel/ContentPanel.tsx](src/components/ContentPanel/ContentPanel.tsx)

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
