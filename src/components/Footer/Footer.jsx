import {
  WHATSAPP_NUMBER,
  EMAIL,
  SOCIAL_LINKS,
  getWhatsAppLink,
} from '../../data/contact.js'
import './Footer.css'

const footerNav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Cócteles', href: '#cocktails' },
  { label: 'Paquetes', href: '#packages' },
  { label: 'Contacto', href: '#contact' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  const hasSocialLinks = SOCIAL_LINKS.some((s) => s.url)

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        {/* Top — Brand */}
        <div className="footer__brand">
          <a
            href="#inicio"
            className="footer__logo"
            onClick={(e) => handleNavClick(e, '#inicio')}
          >
            KEROBARRA
          </a>
          <p className="footer__tagline">
            Servicio profesional de barman y coctelería para eventos.
            Creamos experiencias memorables en cada celebración.
          </p>
        </div>

        {/* Middle — Nav + Contact + Social */}
        <div className="footer__middle">
          {/* Navigation */}
          <nav className="footer__nav" aria-label="Navegación del pie de página">
            <h3 className="footer__heading">Navegación</h3>
            <ul className="footer__nav-list">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer__link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer__contact">
            <h3 className="footer__heading">Contacto</h3>
            <ul className="footer__contact-list">
              <li>
                {WHATSAPP_NUMBER ? (
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link footer__link--contact"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <span className="footer__link footer__link--placeholder">
                    WhatsApp
                  </span>
                )}
              </li>
              <li>
                {EMAIL ? (
                  <a
                    href={`mailto:${EMAIL}`}
                    className="footer__link footer__link--contact"
                  >
                    {EMAIL}
                  </a>
                ) : (
                  <span className="footer__link footer__link--placeholder">
                    Email
                  </span>
                )}
              </li>
            </ul>
          </div>

          {/* Social */}
          {hasSocialLinks && (
            <div className="footer__social">
              <h3 className="footer__heading">Síguenos</h3>
              <div className="footer__social-links">
                {SOCIAL_LINKS.filter((s) => s.url).map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={social.name}
                  >
                    {social.icon === 'instagram' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                      </svg>
                    )}
                    {social.icon === 'facebook' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    )}
                    {social.icon === 'tiktok' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom — Divider + Copyright */}
        <div className="footer__bottom">
          <div className="footer__divider" />
          <p className="footer__copyright">
            © {currentYear} Kerobarra. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
