export interface ProjectConfig {
  id: string
  name: string
  description: string
  tech: string[]
  type: 'github' | 'local' // github for public repos, local for private/local projects
  source?: string // GitHub repo path (e.g., "username/repo") for github type
  localPath?: string // Path to local project files for local type
  featured?: boolean
}

export const PROJECTS: ProjectConfig[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Portfolio interactivo con interfaz de terminal',
    tech: ['Next.js', 'TypeScript', 'SCSS'],
    type: 'github',
    source: 'lopezmIsmael/portfolio', // Cambia esto por tu repo real
    featured: true
  },
  {
    id: 'ecommerce-platform',
    name: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico completa',
    tech: ['React', 'Node.js', 'MongoDB'],
    type: 'local', // Proyecto privado
    featured: true
  },
  {
    id: 'task-manager',
    name: 'Task Manager',
    description: 'Aplicación de gestión de tareas',
    tech: ['React', 'TypeScript', 'Firebase'],
    type: 'github',
    source: 'tu-usuario/task-manager', // Cambia esto por tu repo real
    featured: false
  }
]

// Mock data for local/private projects
// En producción, estos archivos podrían cargarse desde tu servidor
export const LOCAL_PROJECT_FILES: Record<string, Record<string, string>> = {
  'ecommerce-platform': {
    'README.md': `# E-commerce Platform

Una plataforma completa de comercio electrónico construida con React y Node.js.

## Características

- 🛒 Carrito de compras persistente
- 💳 Integración con pasarelas de pago
- 📦 Sistema de gestión de inventario
- 👥 Panel de administración completo
- 📱 Diseño responsive

## Tecnologías

- **Frontend**: React, Redux, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Pagos**: Stripe API
- **Autenticación**: JWT + bcrypt

## Instalación

\`\`\`bash
npm install
npm run dev
\`\`\`

## Variables de entorno

\`\`\`
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_key
JWT_SECRET=your_jwt_secret
\`\`\``,
    'package.json': `{
  "name": "ecommerce-platform",
  "version": "1.0.0",
  "description": "Full-stack e-commerce platform",
  "main": "server.js",
  "scripts": {
    "dev": "concurrently \\"npm run server\\" \\"npm run client\\"",
    "server": "nodemon server.js",
    "client": "cd client && npm start"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0",
    "stripe": "^12.0.0",
    "jsonwebtoken": "^9.0.0"
  }
}`,
    'src/components/ProductCard.tsx': `import React from 'react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span className="price">\${product.price}</span>
      <button onClick={() => onAddToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  )
}`
  }
}
