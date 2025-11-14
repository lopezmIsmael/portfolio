# 🎨 Guía de Configuración del Portfolio

¡Bienvenido! Este portfolio está diseñado para que puedas personalizar toda tu información de manera fácil y centralizada editando archivos YAML.

## 📋 Tabla de Contenidos

1. [Inicio Rápido](#-inicio-rápido)
2. [Archivos de Configuración](#-archivos-de-configuración)
3. [Cómo Personalizar](#-cómo-personalizar)
4. [Comandos Útiles](#-comandos-útiles)
5. [Solución de Problemas](#-solución-de-problemas)

---

## 🚀 Inicio Rápido

### 1. Edita tus datos personales

Abre el archivo [`config/personal.yml`](config/personal.yml) y actualiza:

```yaml
profile:
  name: "Tu Nombre"
  title: "Tu Título Profesional"
  location: "Tu Ciudad, País"
  # ... más campos
```

### 2. Agrega tus proyectos

Abre el archivo [`config/projects.yml`](config/projects.yml) y añade tus proyectos:

```yaml
projects:
  - id: "mi-proyecto"
    name: "Mi Proyecto Increíble"
    description: "Descripción breve"
    tech: ["React", "Node.js"]
    type: "github"
    source: "tu-usuario/repo"
    featured: true
```

### 3. Aplica los cambios

```bash
npm run dev    # Para desarrollo
# o
npm run build  # Para producción
```

Los archivos YAML se procesarán automáticamente y tus cambios se reflejarán en el portfolio.

---

## 📁 Archivos de Configuración

Todos los archivos de configuración están en la carpeta [`config/`](config/):

### 1. [`personal.yml`](config/personal.yml) - Información Personal

Este archivo contiene toda tu información:

#### **profile** - Perfil básico
```yaml
profile:
  name: "Ismael López"              # Tu nombre completo
  title: "Ingeniero Informático"   # Tu título/profesión
  location: "Talavera, España"     # Tu ubicación
  status: "Disponible para..."     # Tu estado actual
  image: "/images/perfil.jpg"      # Ruta a tu foto
```

#### **contact** - Información de contacto
```yaml
contact:
  email: "tu@email.com"
  phone: "+34600000000"            # Opcional
  linkedin: "https://..."
  github: "https://..."
  whatsapp: "https://wa.me/..."   # Opcional
```

#### **about** - Descripción personal
```yaml
about:
  description: |                   # Descripción corta (2-3 líneas)
    Tu descripción aquí...

  extended: |                      # Descripción extendida
    Más detalles sobre ti...
```

#### **skills** - Habilidades técnicas
```yaml
skills:
  frontend:
    - "React / Next.js"
    - "TypeScript"
  backend:
    - "Node.js"
    - "Python"
  tools:
    - "Git / GitHub"
    - "Docker"
```

#### **education** - Educación
```yaml
education:
  degree: "Ingeniería Informática"
  institution: "Universidad XYZ"
  period: "2018 - 2023"
```

#### **interests** - Intereses
```yaml
interests:
  - "Desarrollo Web"
  - "Open Source"
```

---

### 2. [`projects.yml`](config/projects.yml) - Proyectos

#### Proyectos públicos (GitHub)

```yaml
projects:
  - id: "portfolio"                    # ID único
    name: "Portfolio Terminal"         # Nombre del proyecto
    description: "Portfolio interactivo..." # Descripción breve
    tech:                               # Tecnologías usadas
      - "Next.js"
      - "TypeScript"
    type: "github"                      # Tipo: github o local
    source: "usuario/repositorio"      # Usuario/repo en GitHub
    featured: true                      # Proyecto destacado
```

#### Proyectos privados/locales

Para proyectos que no quieres exponer en GitHub:

```yaml
projects:
  - id: "proyecto-privado"
    name: "Mi Proyecto Privado"
    description: "Proyecto confidencial"
    tech: ["Vue", "Node.js"]
    type: "local"                       # ← Tipo local
    featured: false

local_projects:
  proyecto-privado:                     # Mismo ID que arriba
    files:
      "README.md": |
        # Mi Proyecto

        Documentación del proyecto...

      "package.json": |
        {
          "name": "mi-proyecto",
          "version": "1.0.0"
        }
```

---

### 3. [`terminal.yml`](config/terminal.yml) - Terminal

Personaliza el emulador de terminal:

#### Configuración del terminal
```yaml
terminal:
  user: "tuusuario"        # Usuario del prompt
  host: "portfolio"        # Host del prompt
```

Esto afecta el prompt que se muestra: `usuario@host:~$`

#### Contenido de archivos virtuales

```yaml
file_contents:
  "~/README.md": |
    # Portfolio Terminal

    Tu contenido personalizado...

  "~/contact/info.txt": |
    Email: tu@email.com
    ...
```

---

## 🎯 Cómo Personalizar

### Cambiar tu información personal

1. Abre [`config/personal.yml`](config/personal.yml)
2. Edita los campos que quieras cambiar
3. Guarda el archivo
4. Ejecuta `npm run dev` o `npm run build`

### Agregar un nuevo proyecto

1. Abre [`config/projects.yml`](config/projects.yml)
2. Añade un nuevo proyecto a la lista:

```yaml
projects:
  # ... proyectos existentes ...

  - id: "nuevo-proyecto"              # ← Nuevo proyecto
    name: "Mi Nuevo Proyecto"
    description: "Descripción"
    tech: ["React", "Express"]
    type: "github"
    source: "usuario/repo"
    featured: false
```

3. Guarda y ejecuta `npm run build`

### Modificar archivos del terminal virtual

1. Abre [`config/terminal.yml`](config/terminal.yml)
2. Edita o añade archivos:

```yaml
file_contents:
  "~/mi-archivo.txt": |
    Contenido de mi archivo
    Puede ser multilínea
```

---

## 💻 Comandos Útiles

### Desarrollo

```bash
npm run dev
```
- Genera configuraciones desde YAML
- Inicia servidor de desarrollo
- Recarga automáticamente al guardar cambios

### Producción

```bash
npm run build
npm start
```
- Construye versión optimizada
- Inicia servidor de producción

### Solo regenerar configuraciones

```bash
npm run config
```
- Útil si solo quieres ver los archivos generados sin compilar

---

## 🔧 Solución de Problemas

### Error: "Module not found"

**Problema**: No se encuentran los archivos de configuración generados.

**Solución**:
```bash
npm run config
```

### Error de sintaxis YAML

**Problema**: Error al parsear archivos YAML.

**Solución**:
- Verifica la indentación (usa espacios, NO tabs)
- Asegúrate de que las comillas estén balanceadas
- Los strings multilínea usan `|` seguido de contenido indentado:

```yaml
description: |
  Primera línea
  Segunda línea
```

### Cambios no se reflejan

**Problema**: Edité el YAML pero no veo cambios.

**Solución**:
1. Asegúrate de guardar el archivo YAML
2. Detén el servidor (`Ctrl+C`)
3. Ejecuta `npm run config`
4. Inicia de nuevo `npm run dev`

### Imagen de perfil no se muestra

**Problema**: La imagen no aparece.

**Solución**:
1. Coloca la imagen en `public/images/`
2. En `personal.yml`, usa la ruta: `/images/tu-foto.jpg`
3. Asegúrate de que el archivo exista

---

## 📝 Notas Importantes

### Seguridad

❌ **NO incluyas**:
- Contraseñas
- API keys
- Tokens de acceso
- Información sensible

✅ **SÍ incluye**:
- URLs públicas
- Información que quieras mostrar
- Datos de contacto públicos

### Formato YAML

- **Indentación**: 2 espacios (no tabs)
- **Listas**: Usa `-` al inicio
- **Strings multilínea**: Usa `|`
- **Comentarios**: Usa `#`

### Archivos Generados

Los archivos en `src/data/generated/` son **generados automáticamente**.

- ❌ NO los edites manualmente
- ✅ Edita los archivos YAML en `config/`
- 🔄 Se regeneran automáticamente con `npm run build` o `npm run dev`

---

## 🆘 ¿Necesitas Ayuda?

1. Revisa la [documentación de YAML](https://yaml.org/spec/1.2/spec.html)
2. Mira los ejemplos en [`config/README.md`](config/README.md)
3. Verifica que la sintaxis sea correcta

---

## 🎉 ¡Listo!

Ahora tienes todo lo que necesitas para personalizar tu portfolio. ¡Edita los archivos YAML y haz que sea tuyo!

**Archivo principal a editar**: [`config/personal.yml`](config/personal.yml)
