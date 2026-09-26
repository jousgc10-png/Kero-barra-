import { useEffect, useRef } from 'react'
import './Experience.css'

const benefits = [
  'Bartenders profesionales',
  'Cócteles personalizados',
  'Barra equipada',
  'Presentación elegante',
  'Atención personalizada',
]

function Experience() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const reveals = sectionRef.current?.querySelectorAll('.experience__reveal')
    reveals?.forEach((el) => observer.observe(el))

    // Subtle parallax on the image — no dependencies, rAF-throttled
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect()
            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.04
            imageRef.current.style.transform = `translateY(${offset}px)`
          }
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="experiencia" className="experience section" ref={sectionRef}>
      <div className="container experience__grid">
        {/* Left — Image */}
        <div className="experience__media experience__reveal">
          <div className="experience__image-frame" ref={imageRef}>
            {/* PLACEHOLDER IMAGE — Reemplazar con fotografía real.
                Colocar la imagen en src/assets/images/experience.jpg
                y actualizar el src del <img> debajo. */}
            <div className="experience__image-placeholder">
              <svg
                className="experience__placeholder-icon"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 20h40l-4 24a6 6 0 01-6 6H22a6 6 0 01-6-6L12 20z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 20c0-6 6-10 14-10s14 4 14 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M32 10V4m0 0h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M24 34v8m8-8v12m8-12v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* Descomentar cuando se tenga la imagen real:
            <img
              src="/src/assets/images/experience.jpg"
              alt="Bartender preparando cócteles en evento"
              className="experience__image"
            />
            */}
          </div>
        </div>

        {/* Right — Content */}
        <div className="experience__content experience__reveal">
          <p className="experience__eyebrow">La Experiencia</p>
          <h2 className="experience__title">
            Más que una barra,
            <br />
            <span className="experience__title-accent">creamos una experiencia.</span>
          </h2>
          <p className="experience__description">
            Cada detalle está pensado para que tus vivan un momento único:
            desde la presentación de la barra hasta el último sorbo.
          </p>

          <ul className="experience__benefits">
            {benefits.map((benefit) => (
              <li key={benefit} className="experience__benefit">
                <span className="experience__check">✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          <a
            href="#servicios"
            className="experience__cta"
            onClick={(e) => handleNavClick(e, '#servicios')}
          >
            Conoce nuestros servicios
            <span className="experience__cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Experience
