import { useEffect, useRef } from 'react'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  EMAIL,
  BUSINESS_HOURS,
  SOCIAL_LINKS,
  getWhatsAppLink,
} from '../../data/contact.js'
import './Contact.css'

function Contact() {
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

    const items = sectionRef.current?.querySelectorAll('.contact__reveal')
    items?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const hasSocialLinks = SOCIAL_LINKS.some((s) => s.url)

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="container contact__grid">
        {/* Left — CTA */}
        <div className="contact__left contact__reveal">
          <p className="contact__eyebrow">Hablemos de tu evento</p>
          <h2 className="contact__title">
            Cuéntanos qué
            <br />
            <span className="contact__title-accent">tienes en mente.</span>
          </h2>
          <p className="contact__description">
            Estamos listos para ayudarte a crear una experiencia de barra
            pensada para tu celebración.
          </p>

          {/* WhatsApp Button */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`contact__whatsapp-btn ${!WHATSAPP_NUMBER ? 'contact__whatsapp-btn--disabled' : ''}`}
            aria-label="Hablar por WhatsApp"
            onClick={!WHATSAPP_NUMBER ? (e) => e.preventDefault() : undefined}
          >
            <svg
              className="contact__whatsapp-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hablar por WhatsApp
          </a>

          {/* Config hint (dev only — remove in production) */}
          {!WHATSAPP_NUMBER && (
            <p className="contact__config-hint">
              Configura tu número en <code>src/data/contact.js</code>
            </p>
          )}
        </div>

        {/* Right — Info */}
        <div className="contact__right contact__reveal">
          <div className="contact__info-card">
            <h3 className="contact__info-title">Información de contacto</h3>

            <ul className="contact__info-list">
              {/* WhatsApp */}
              <li className="contact__info-item">
                <span className="contact__info-label">WhatsApp</span>
                {WHATSAPP_NUMBER ? (
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__info-value contact__info-value--link"
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                ) : (
                  <span className="contact__info-value contact__info-value--placeholder">
                    Por configurar
                  </span>
                )}
              </li>

              {/* Email */}
              <li className="contact__info-item">
                <span className="contact__info-label">Email</span>
                {EMAIL ? (
                  <a
                    href={`mailto:${EMAIL}`}
                    className="contact__info-value contact__info-value--link"
                  >
                    {EMAIL}
                  </a>
                ) : (
                  <span className="contact__info-value contact__info-value--placeholder">
                    Por configurar
                  </span>
                )}
              </li>

              {/* Hours */}
              <li className="contact__info-item">
                <span className="contact__info-label">Horario</span>
                {BUSINESS_HOURS ? (
                  <span className="contact__info-value">{BUSINESS_HOURS}</span>
                ) : (
                  <span className="contact__info-value contact__info-value--placeholder">
                    Por configurar
                  </span>
                )}
              </li>
            </ul>

            {/* Social links — only show if URLs exist */}
            {hasSocialLinks && (
              <div className="contact__social">
                <span className="contact__social-label">Síguenos</span>
                <div className="contact__social-links">
                  {SOCIAL_LINKS.filter((s) => s.url).map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__social-link"
                      aria-label={social.name}
                    >
                      {social.icon === 'instagram' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                        </svg>
                      )}
                      {social.icon === 'facebook' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      )}
                      {social.icon === 'tiktok' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
