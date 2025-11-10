'use client'

import { useState } from 'react'
import { FaGithub, FaLock, FaArrowRight } from 'react-icons/fa'
import { PROJECTS, ProjectConfig } from '@/data/projects'
import ProjectViewer from '@/components/views/ProjectViewer/ProjectViewer'
import styles from './PortfolioView.module.scss'

interface PortfolioViewProps {
  onProjectSelect?: (projectId: string) => void
}

export default function PortfolioView({ onProjectSelect }: PortfolioViewProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectConfig | null>(null)

  const handleProjectClick = (project: ProjectConfig) => {
    setSelectedProject(project)
    onProjectSelect?.(project.id)
  }

  const handleBack = () => {
    setSelectedProject(null)
  }

  if (selectedProject) {
    return <ProjectViewer project={selectedProject} onBack={handleBack} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Portfolio</h1>
        <p className={styles.subtitle}>
          Proyectos que he desarrollado, tanto públicos en GitHub como privados
        </p>
      </div>

      <div className={styles.projects}>
        {PROJECTS.map(project => (
          <div
            key={project.id}
            className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
            onClick={() => handleProjectClick(project)}
          >
            <div className={styles.cardHeader}>
              <h3>{project.name}</h3>
              <div className={styles.typeIcon}>
                {project.type === 'github' ? (
                  <FaGithub title="Repositorio público en GitHub" />
                ) : (
                  <FaLock title="Proyecto privado" />
                )}
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.techStack}>
              {project.tech.map(tech => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.viewProject}>
                Ver proyecto <FaArrowRight />
              </span>
            </div>

            {project.featured && (
              <div className={styles.featuredBadge}>★ Destacado</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.info}>
        <div className={styles.infoBox}>
          <FaGithub />
          <div>
            <h4>Proyectos públicos</h4>
            <p>Los proyectos con el icono de GitHub son repositorios públicos que puedes explorar</p>
          </div>
        </div>
        <div className={styles.infoBox}>
          <FaLock />
          <div>
            <h4>Proyectos privados</h4>
            <p>Algunos proyectos son privados pero puedes ver su documentación y archivos principales</p>
          </div>
        </div>
      </div>
    </div>
  )
}
