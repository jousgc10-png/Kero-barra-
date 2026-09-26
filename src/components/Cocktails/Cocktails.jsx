import { useEffect, useRef, useState, useCallback } from 'react'
import cocktails from '../../data/cocktails.js'
import './Cocktails.css'

function Cocktails() {
  const sectionRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCocktail, setSelectedCocktail] = useState(null)

  // Scroll reveal
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

    const items = sectionRef.current?.querySelectorAll('.cocktails__reveal')
    items?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Modal scroll lock
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  const openModal = useCallback((cocktail) => {
    setSelectedCocktail(cocktail)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  // ESC key + focus management
  useEffect(() => {
    if (!modalOpen) return

    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [modalOpen, closeModal])

  return (
    <section id="cocktails" className="cocktails section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="cocktails__header cocktails__reveal">
          <p className="cocktails__eyebrow">Carta de Cócteles</p>
          <h2 className="cocktails__title">
            Sabores que forman parte
            <br />
            <span className="cocktails__title-accent">de la experiencia.</span>
          </h2>
          <p className="cocktails__description">
            Una selección de cócteles preparados para complementar cada celebración.
          </p>
        </div>

        {/* Grid — editorial layout with varied sizes */}
        <div className="cocktails__grid">
          {cocktails.map((cocktail, index) => (
            <article
              key={cocktail.id}
              className={`cocktails__card cocktails__reveal ${
                index === 0 || index === 3
                  ? 'cocktails__card--wide'
                  : 'cocktails__card--standard'
              }`}
              style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
            >
              {/* Image */}
              <div className="cocktails__image-wrapper">
                {/* PLACEHOLDER — Reemplazar con imagen real.
                    Colocar imagen en src/assets/images/cocktails/{id}.jpg
                    y actualizar el src del <img> debajo. */}
                <div className="cocktails__placeholder">
                  <span className="cocktails__placeholder-letter">
                    {cocktail.name.charAt(0)}
                  </span>
                </div>
                {/* Descomentar cuando se tenga la imagen real:
                <img
                  src={`/src/assets/images/cocktails/${cocktail.id}.jpg`}
                  alt={cocktail.name}
                  className="cocktails__image"
                  loading="lazy"
                />
                */}

                {/* Hover overlay */}
                <div className="cocktails__overlay">
                  <span className="cocktails__view-btn">Ver cóctel</span>
                </div>
              </div>

              {/* Content */}
              <div className="cocktails__content">
                <span className="cocktails__category">{cocktail.category}</span>
                <h3 className="cocktails__name">{cocktail.name}</h3>
                <p className="cocktails__description-text">
                  {cocktail.description}
                </p>
                <p className="cocktails__ingredients">
                  {cocktail.ingredients.join(' · ')}
                </p>
                <button
                  className="cocktails__cta"
                  onClick={() => openModal(cocktail)}
                  aria-label={`Ver detalle de ${cocktail.name}`}
                >
                  Ver cóctel
                  <span className="cocktails__cta-arrow">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedCocktail && (
        <div
          className="cocktail-modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle de ${selectedCocktail.name}`}
        >
          <div
            className="cocktail-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="cocktail-modal__close"
              onClick={closeModal}
              aria-label="Cerrar detalle"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image */}
            <div className="cocktail-modal__image-wrapper">
              <div className="cocktail-modal__placeholder">
                <span className="cocktail-modal__placeholder-letter">
                  {selectedCocktail.name.charAt(0)}
                </span>
              </div>
              {/* Descomentar con imagen real:
              <img
                src={`/src/assets/images/cocktails/${selectedCocktail.id}.jpg`}
                alt={selectedCocktail.name}
                className="cocktail-modal__image"
              />
              */}
            </div>

            {/* Info */}
            <div className="cocktail-modal__info">
              <span className="cocktail-modal__category">
                {selectedCocktail.category}
              </span>
              <h3 className="cocktail-modal__name">{selectedCocktail.name}</h3>
              <p className="cocktail-modal__description">
                {selectedCocktail.description}
              </p>
              <div className="cocktail-modal__ingredients">
                <h4 className="cocktail-modal__ingredients-title">
                  Ingredientes
                </h4>
                <ul className="cocktail-modal__ingredients-list">
                  {selectedCocktail.ingredients.map((ing) => (
                    <li key={ing} className="cocktail-modal__ingredient">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cocktails
