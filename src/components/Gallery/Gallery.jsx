import { useEffect, useRef, useState, useCallback } from 'react'
import galleryItems from '../../data/gallery.js'
import './Gallery.css'

function Gallery() {
  const sectionRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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

    const items = sectionRef.current?.querySelectorAll('.gallery__reveal')
    items?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    )
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    )
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext])

  return (
    <section id="galeria" className="gallery section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="gallery__header gallery__reveal">
          <p className="gallery__eyebrow">Galería</p>
          <h2 className="gallery__title">
            Momentos que hablan
            <br />
            <span className="gallery__title-accent">por sí solos</span>
          </h2>
          <p className="gallery__description">
            Descubre algunos momentos de nuestra experiencia.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="gallery__grid">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              className={`gallery__item gallery__item--${item.size} gallery__reveal`}
              style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
              onClick={() => openLightbox(index)}
              aria-label={`Ver imagen: ${item.alt}`}
            >
              <div className="gallery__image-wrapper">
                {/* PLACEHOLDER — Reemplazar con imagen real.
                    Colocar imagen en src/assets/images/gallery-{item.id}.jpg
                    y actualizar el src del <img> debajo. */}
                <div className="gallery__placeholder">
                  <span className="gallery__placeholder-icon">
                    {item.category === 'Eventos' ? '◆' : '◇'}
                  </span>
                </div>
                {/* Descomentar cuando se tenga la imagen real:
                <img
                  src={`/src/assets/images/gallery-${item.id}.jpg`}
                  alt={item.alt}
                  className="gallery__image"
                  loading="lazy"
                />
                */}

                {/* Hover overlay */}
                <div className="gallery__overlay">
                  <div className="gallery__overlay-content">
                    <span className="gallery__view-icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </span>
                    <span className="gallery__view-text">Ver</span>
                  </div>
                </div>
              </div>
              <div className="gallery__meta">
                <span className="gallery__category">{item.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
        >
          <div
            className="lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="lightbox__close"
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <svg
                width="20"
                height="20"
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

            {/* Navigation */}
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={goToPrev}
              aria-label="Imagen anterior"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={goToNext}
              aria-label="Imagen siguiente"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Image */}
            <div className="lightbox__image-wrapper">
              <div className="lightbox__placeholder">
                <span className="lightbox__placeholder-text">
                  {galleryItems[currentIndex].alt}
                </span>
              </div>
              {/* Descomentar cuando se tengan imágenes reales:
              <img
                src={galleryItems[currentIndex].image}
                alt={galleryItems[currentIndex].alt}
                className="lightbox__image"
              />
              */}
            </div>

            {/* Counter */}
            <div className="lightbox__counter">
              {currentIndex + 1} / {galleryItems.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
