import { useEffect, useRef } from 'react'
import services from '../../data/services.js'
import './Services.css'

function Services() {
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
      { threshold: 0.15 }
    )

    const cards = sectionRef.current?.querySelectorAll('.services__card')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" className="services section" ref={sectionRef}>
      <div className="container">
        <div className="services__header reveal">
          <p className="services__eyebrow">Lo que ofrecemos</p>
          <h2 className="services__title">Nuestros Servicios</h2>
          <p className="services__description">
            Soluciones completas de coctelería y servicio para hacer de tu
            evento un momento extraordinario.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="services__card reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="services__card-image">
                <div className="services__card-placeholder">
                  <span className="services__card-icon">
                    {service.title.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="services__card-content">
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-description">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
