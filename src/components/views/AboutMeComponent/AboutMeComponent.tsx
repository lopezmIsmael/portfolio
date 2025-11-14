'use client'

import Image from 'next/image'
import {
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaHeart,
  FaTerminal,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaWhatsapp
} from 'react-icons/fa'
import { PERSONAL_INFO, CONTACT_INFO, ABOUT_INFO, SKILLS, EDUCATION, INTERESTS } from '@/data/personal'
import styles from './AboutMeComponent.module.scss'

const PROFILE_IMAGE_SIZE = 200
const ICON_SIZE = 24
const SOCIAL_ICON_SIZE = 20
const SECTION_ICON_SIZE = 18

export default function AboutMeComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <FaTerminal size={ICON_SIZE} />
        <h1>whoami</h1>
      </header>

      <section className={styles.profileSection}>
        <div className={styles.profileImageWrapper}>
          <div className={styles.profileImage}>
            <Image
              src={PERSONAL_INFO.image}
              alt="Profile"
              width={PROFILE_IMAGE_SIZE}
              height={PROFILE_IMAGE_SIZE}
              className={styles.image}
              style={{
                objectFit: 'cover',
                objectPosition: 'center 0%' 
              }}
              priority
            />
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>{PERSONAL_INFO.status}</span>
            </div>
          </div>
        </div>

        <div className={styles.profileInfo}>
          <h2 className={styles.name}>{PERSONAL_INFO.name}</h2>
          <p className={styles.title}>{PERSONAL_INFO.title}</p>
          <p className={styles.location}>
            <FaMapMarkerAlt /> {PERSONAL_INFO.location}
          </p>

          <div className={styles.socialLinks}>
            <a href={`mailto:${CONTACT_INFO.email}`} className={styles.socialLink} title="Email">
              <FaEnvelope size={SOCIAL_ICON_SIZE} />
            </a>
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="LinkedIn">
              <FaLinkedin size={SOCIAL_ICON_SIZE} />
            </a>
            <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="GitHub">
              <FaGithub size={SOCIAL_ICON_SIZE} />
            </a>
            <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="WhatsApp">
              <FaWhatsapp size={SOCIAL_ICON_SIZE} />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2><FaBriefcase size={SECTION_ICON_SIZE} /> Sobre Mí</h2>
        <p>{ABOUT_INFO.description}</p>
        <p>{ABOUT_INFO.extended}</p>
      </section>

      <section className={styles.section}>
        <h2><FaCode size={SECTION_ICON_SIZE} /> Habilidades Técnicas</h2>
        <div className={styles.skills}>
          <div className={styles.skillCategory}>
            <h3>Frontend</h3>
            <div className={styles.skillTags}>
              {SKILLS.frontend.map(skill => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3>Backend</h3>
            <div className={styles.skillTags}>
              {SKILLS.backend.map(skill => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3>Herramientas y DevOps</h3>
            <div className={styles.skillTags}>
              {SKILLS.tools.map(skill => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2><FaGraduationCap size={SECTION_ICON_SIZE} /> Educación</h2>
        <div className={styles.education}>
          <h3>{EDUCATION.degree}</h3>
          <p className={styles.institution}>{EDUCATION.institution}</p>
          <p className={styles.year}>{EDUCATION.period}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2><FaHeart size={SECTION_ICON_SIZE} /> Intereses</h2>
        <div className={styles.interestTags}>
          {INTERESTS.map(interest => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </section>

      <div className={styles.footer}>
        <p>Escribe <code>help</code> para ver todos los comandos o <code>cd ..</code> para volver.</p>
      </div>
    </div>
  )
}
