# Integración con GitHub

Este portfolio ahora soporta la integración con repositorios de GitHub, permitiendo mostrar proyectos públicos y privados.

## Configuración de Proyectos

### 1. Editar la configuración de proyectos

Abre el archivo `src/data/projects.ts` y configura tus proyectos:

```typescript
export const PROJECTS: ProjectConfig[] = [
  {
    id: 'mi-proyecto',
    name: 'Mi Proyecto',
    description: 'Descripción del proyecto',
    tech: ['React', 'TypeScript', 'Next.js'],
    type: 'github', // 'github' para repos públicos, 'local' para privados
    source: 'tu-usuario/nombre-repo', // Solo para type: 'github'
    featured: true // Opcional: marca el proyecto como destacado
  }
]
```

### 2. Tipos de proyectos

#### Proyectos públicos de GitHub (`type: 'github'`)

Para proyectos públicos en GitHub:
- Establece `type: 'github'`
- Define `source` con el formato `usuario/repositorio`
- El sistema automáticamente cargará:
  - El README.md
  - La estructura de archivos
  - El contenido de los archivos

**Ejemplo:**
```typescript
{
  id: 'portfolio-terminal',
  name: 'Portfolio Terminal',
  description: 'Portfolio interactivo con interfaz de terminal',
  tech: ['Next.js', 'TypeScript', 'SCSS'],
  type: 'github',
  source: 'ismaellopez/portfolio-terminal',
  featured: true
}
```

#### Proyectos privados o locales (`type: 'local'`)

Para proyectos que no quieres exponer públicamente:
- Establece `type: 'local'`
- Define los archivos en el objeto `LOCAL_PROJECT_FILES`

**Ejemplo:**
```typescript
// En projects.ts
{
  id: 'mi-proyecto-privado',
  name: 'Mi Proyecto Privado',
  description: 'Un proyecto confidencial',
  tech: ['React', 'Node.js'],
  type: 'local',
  featured: true
}

// Luego define los archivos:
export const LOCAL_PROJECT_FILES: Record<string, Record<string, string>> = {
  'mi-proyecto-privado': {
    'README.md': `# Mi Proyecto Privado

Descripción del proyecto...

## Características
- Feature 1
- Feature 2
`,
    'package.json': `{
  "name": "mi-proyecto",
  "version": "1.0.0"
}`,
    'src/App.tsx': `import React from 'react'

export default function App() {
  return <div>Hola</div>
}`
  }
}
```

### 3. Aumentar el rate limit de GitHub (Opcional)

Por defecto, la API de GitHub tiene un límite de 60 peticiones por hora para usuarios no autenticados. Para aumentar este límite a 5000 peticiones/hora:

1. Crea un Personal Access Token en GitHub:
   - Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click en "Generate new token (classic)"
   - **NO necesitas seleccionar ningún scope** para repos públicos
   - Copia el token generado

2. Crea un archivo `.env.local` en la raíz del proyecto:
```bash
NEXT_PUBLIC_GITHUB_TOKEN=tu_token_aquí
```

3. Actualiza el servicio de GitHub (opcional, para usar el token):
```typescript
// En src/services/github.ts
export const githubService = new GitHubService(process.env.NEXT_PUBLIC_GITHUB_TOKEN)
```

**⚠️ IMPORTANTE:** El token con scopes públicos es seguro de exponer en el cliente ya que solo permite leer repositorios públicos. Si necesitas acceder a repos privados, deberías implementar un backend intermediario.

## Estructura del Sistema

```
src/
├── data/
│   └── projects.ts          # Configuración de proyectos
├── services/
│   └── github.ts             # Servicio de API de GitHub
├── components/
│   └── views/
│       ├── PortfolioView/    # Lista de proyectos
│       └── ProjectViewer/    # Navegador de archivos del proyecto
```

## Características

### Para proyectos de GitHub:
✅ Carga automática del README.md
✅ Navegación por directorios
✅ Visualización de archivos
✅ Indicador de tipo de proyecto
✅ Badges con tecnologías

### Para proyectos locales/privados:
✅ Control total sobre qué archivos mostrar
✅ Mantener proyectos confidenciales seguros
✅ Misma interfaz de usuario
✅ Sin exponer código sensible

## Agregar nuevos proyectos

1. **Proyecto público de GitHub:**
   - Añade el proyecto al array `PROJECTS` con `type: 'github'`
   - Define el `source` con tu usuario y repositorio
   - ¡Listo! El sistema cargará todo automáticamente

2. **Proyecto privado:**
   - Añade el proyecto al array `PROJECTS` con `type: 'local'`
   - Añade los archivos que quieres mostrar en `LOCAL_PROJECT_FILES`
   - Puedes incluir solo documentación sin exponer código sensible

## Ejemplo completo

```typescript
// src/data/projects.ts
export const PROJECTS: ProjectConfig[] = [
  // Proyecto público
  {
    id: 'awesome-project',
    name: 'Awesome Project',
    description: 'Un proyecto increíble de código abierto',
    tech: ['React', 'TypeScript'],
    type: 'github',
    source: 'username/awesome-project',
    featured: true
  },
  // Proyecto privado
  {
    id: 'secret-project',
    name: 'Secret Project',
    description: 'Proyecto confidencial para un cliente',
    tech: ['Vue', 'Node.js'],
    type: 'local',
    featured: false
  }
]

export const LOCAL_PROJECT_FILES = {
  'secret-project': {
    'README.md': '# Secret Project\n\nDocumentación básica...',
    'FEATURES.md': '## Características\n- Feature 1\n- Feature 2'
  }
}
```

## Notas de seguridad

- ✅ Los proyectos `type: 'local'` nunca exponen código que no defines explícitamente
- ✅ Los tokens de GitHub sin scopes solo pueden leer repos públicos
- ✅ Todo el código se ejecuta en el cliente, sin backend que almacene datos sensibles
- ⚠️ NO incluyas variables de entorno, credenciales o información sensible en `LOCAL_PROJECT_FILES`
