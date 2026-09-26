import { useEffect, useRef } from 'react'
import packages from '../../data/packages.js'
import './Packages.css'

function Packages() {
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
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('.packages__reveal')
    items?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="packages" className="packages section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="packages__header packages__reveal">
          <p className="packages__eyebrow">Paquetes</p>
          <h2 className="packages__title">
            Elige la experiencia ideal
            <br />
            <span className="packages__title-accent">para tu evento.</span>
          </h2>
          <p className="packages__description">
            Opciones pensadas para adaptarnos al estilo y tamaño de cada celebración.
          </p>
        </div>

        {/* Cards */}
        <div className="packages__grid">
          {packages.map((pkg, index) => (
            <article
              key={pkg.id}
              className={`packages__card packages__reveal ${
                pkg.highlighted ? 'packages__card--highlighted' : ''
              }`}
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              {/* Highlight badge */}
              {pkg.highlighted && (
                <div className="packages__badge">Más elegante</div>
              )}

              {/* Image placeholder */}
              <div className="packages__image-wrapper">
                {/* PLACEHOLDER — Reemplazar con imagen real.
                    Colocar imagen en src/assets/images/packages/{id}.jpg
                    y actualizar el src del <img> debajo. */}
                <div className="packages__placeholder">
                  <span className="packages__placeholder-icon">
                    {pkg.name.charAt(0)}
                  </span>
                </div>
                {/* Descomentar cuando se tenga la imagen real:
                <img
                  src={`/src/assets/images/packages/${pkg.id}.jpg`}
                  alt={pkg.name}
                  className="packages__image"
                  loading="lazy"
                />
                */}
              </div>

              {/* Content */}
              <div className="packages__content">
                <h3 className="packages__name">{pkg.name}</h3>
                <p className="packages__description-text">{pkg.description}</p>

                <ul className="packages__features">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="packages__feature">
                      <span className="packages__check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className="packages__cta"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`${pkg.ctaText} — Paquete ${pkg.name}`}
                >
                  {pkg.ctaText}
                  <span className="packages__cta-arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Packages
