'use client'

import { FaBriefcase, FaCode, FaGraduationCap, FaHeart, FaTerminal } from 'react-icons/fa'
import styles from './AboutMeComponent.module.scss'

export default function AboutMeComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <FaTerminal size={24} />
        <h1>whoami</h1>
      </header>

      <section className={styles.section}>
        <h2><FaBriefcase size={18} /> Sobre Mí</h2>
        <p>
          Soy un Ingeniero Informático apasionado por el desarrollo de software
          y la creación de soluciones innovadoras. Me especializo en desarrollo
          web full-stack y disfruto trabajando con tecnologías modernas.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2><FaCode size={18} /> Habilidades Técnicas</h2>
        <div className={styles.skills}>
          <div className={styles.skillCategory}>
            <h3>Frontend</h3>
            <div className={styles.skillTags}>
              <span>React / Next.js</span>
              <span>TypeScript</span>
              <span>HTML5 / CSS3</span>
              <span>SASS / SCSS</span>
              <span>Responsive Design</span>
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3>Backend</h3>
            <div className={styles.skillTags}>
              <span>Node.js</span>
              <span>Python</span>
              <span>APIs RESTful</span>
              <span>Bases de Datos</span>
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3>Herramientas y DevOps</h3>
            <div className={styles.skillTags}>
              <span>Git / GitHub</span>
              <span>Docker</span>
              <span>Linux</span>
              <span>VS Code</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2><FaGraduationCap size={18} /> Educación</h2>
        <div className={styles.education}>
          <h3>Ingeniería Informática</h3>
          <p className={styles.institution}>Universidad Politécnica de Madrid</p>
          <p className={styles.year}>2018 - 2023</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2><FaHeart size={18} /> Intereses</h2>
        <div className={styles.interestTags}>
          <span>Desarrollo Web</span>
          <span>Open Source</span>
          <span>Inteligencia Artificial</span>
          <span>Ciberseguridad</span>
          <span>Linux & Terminal</span>
        </div>
      </section>

      <div className={styles.footer}>
        <p>Escribe <code>help</code> para ver todos los comandos o <code>cd ..</code> para volver.</p>
      </div>
    </div>
  )
}
