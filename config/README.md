# Configuración del Portfolio

Esta carpeta contiene todos los archivos de configuración en formato YAML para personalizar tu portfolio de manera fácil y centralizada.

## 📁 Archivos de Configuración

### `personal.yml`
Contiene toda tu información personal:
- **profile**: Nombre, título, ubicación, estado
- **contact**: Email, teléfono, redes sociales
- **about**: Descripción personal corta y extendida
- **skills**: Habilidades técnicas organizadas por categorías
- **education**: Información educativa
- **interests**: Áreas de interés

### `projects.yml`
Define tus proyectos:
- **projects**: Lista de proyectos públicos (GitHub) y privados
- **local_projects**: Archivos de proyectos privados que quieres mostrar

### `terminal.yml`
Personaliza el emulador de terminal:
- **terminal**: Usuario y host del terminal
- **file_contents**: Contenido de archivos virtuales del sistema

## 🔧 Cómo usar

### 1. Editar información personal
Abre `personal.yml` y modifica cualquier campo:

```yaml
profile:
  name: "Tu Nombre"
  title: "Tu Título Profesional"
  # ...
```

### 2. Agregar un nuevo proyecto

En `projects.yml`:

```yaml
projects:
  - id: "mi-nuevo-proyecto"
    name: "Mi Nuevo Proyecto"
    description: "Descripción del proyecto"
    tech:
      - "React"
      - "Node.js"
    type: "github"  # o "local" para privados
    source: "usuario/repositorio"
    featured: true
```

### 3. Personalizar el terminal

En `terminal.yml`, modifica el contenido de archivos virtuales:

```yaml
file_contents:
  "~/README.md": |
    Tu contenido aquí
    Puede ser multilínea
```

## 📝 Notas importantes

- Los cambios en estos archivos se aplican automáticamente al compilar el proyecto
- Mantén el formato YAML correcto (indentación con espacios, no tabs)
- Los strings multilínea usan el símbolo `|` seguido de contenido indentado
- Las listas usan el símbolo `-` al principio de cada elemento

## 🔄 Aplicar cambios

Después de editar los archivos YAML:

```bash
npm run dev    # Para desarrollo
npm run build  # Para producción
```

## 💡 Tips

1. **Información sensible**: No incluyas contraseñas, API keys o información privada
2. **URLs**: Asegúrate de que todas las URLs estén correctas y actualizadas
3. **Formato**: Usa un editor con soporte YAML para evitar errores de sintaxis
4. **Validación**: El proyecto validará los archivos YAML al compilar

## 🆘 Solución de problemas

Si encuentras errores al compilar:
- Verifica que la indentación sea correcta (usa espacios, no tabs)
- Asegúrate de que las comillas estén balanceadas
- Revisa que no falten campos requeridos (id, name, etc.)
