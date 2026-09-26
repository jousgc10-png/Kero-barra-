import { useEffect, useRef } from 'react'
import './CTA.css'

function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    const reveals = sectionRef.current?.querySelectorAll('.cta__reveal')
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta" className="cta section" ref={sectionRef}>
      {/* Background */}
      <div className="cta__bg">
        {/* PLACEHOLDER — Reemplazar con imagen real.
            Colocar imagen en src/assets/images/cta-bg.jpg
            y descomentar el <img> debajo. */}
        <div className="cta__bg-placeholder" />
        {/* Descomentar con imagen real:
        <img
          src="/src/assets/images/cta-bg.jpg"
          alt=""
          className="cta__bg-image"
          loading="lazy"
        />
        */}
        <div className="cta__overlay" />
      </div>

      {/* Content */}
      <div className="cta__content container">
        <p className="cta__eyebrow cta__reveal">Tu evento comienza aquí</p>
        <h2 className="cta__title cta__reveal">
          ¿Listo para crear una
          <br />
          <span className="cta__title-accent">experiencia inolvidable?</span>
        </h2>
        <p className="cta__description cta__reveal">
          Cuéntanos sobre tu evento y preparemos una propuesta pensada para ti.
        </p>
        <div className="cta__actions cta__reveal">
          <a
            href="#contacto"
            className="cta__btn cta__btn--primary"
            onClick={(e) => e.preventDefault()}
            aria-label="Cotizar mi evento"
          >
            Cotizar mi evento
            <span className="cta__btn-arrow">→</span>
          </a>
          <a
            href="#contacto"
            className="cta__btn cta__btn--outline"
            onClick={(e) => e.preventDefault()}
            aria-label="Hablar con nosotros"
          >
            Hablar con nosotros
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
