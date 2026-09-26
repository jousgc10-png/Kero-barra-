import { useEffect, useRef } from 'react'
import './Hero.css'

function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    // Entrance animations with staggered timing
    const elements = heroRef.current?.querySelectorAll('.hero__animate')
    elements?.forEach((el, i) => {
      el.style.animationDelay = `${0.15 * (i + 1)}s`
      el.classList.add('hero__animate--in')
    })
  }, [])

  const handleScrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="hero" ref={heroRef}>
      {/* Background with overlay */}
      <div className="hero__bg">
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="hero__content container">
        <p className="hero__eyebrow hero__animate">Servicio Profesional de Barman</p>
        <h1 className="hero__title hero__animate">
          Coctelería &amp; Elegancia
          <br />
          <span className="hero__title-accent">para tu Evento</span>
        </h1>
        <p className="hero__subtitle hero__animate">
          Transformamos cada celebración en una experiencia inolvidable con
          bartenders expertos, cócteles de autor y un servicio de primer nivel.
        </p>
        <div className="hero__actions hero__animate">
          <a
            href="#contacto"
            className="btn btn--primary"
            onClick={(e) => handleScrollTo(e, '#contacto')}
          >
            Cotizar mi evento
          </a>
          <a
            href="#servicios"
            className="btn btn--outline"
            onClick={(e) => handleScrollTo(e, '#servicios')}
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero
