import { useEffect, useRef, useState, useCallback } from 'react'
import './VideoExperience.css'

function VideoExperience() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Intersection Observer — pause when not visible
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  // Progress bar sync
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  // Show/hide controls on mouse move (desktop) — always visible on touch
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) {
      setShowControls(true)
      return
    }

    const section = sectionRef.current
    if (!section) return

    let hideTimeout

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(hideTimeout)
      hideTimeout = setTimeout(() => {
        if (videoRef.current && !videoRef.current.paused) {
          setShowControls(false)
        }
      }, 2500)
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(hideTimeout)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      // Autoplay visual is always muted per requirements
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }, [])

  const toggleFullscreen = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    }
  }, [])

  const handleSeek = useCallback((e) => {
    const video = videoRef.current
    if (!video || !video.duration) return

    const rect = progressRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = Math.max(0, Math.min(1, x / rect.width))
    video.currentTime = pct * video.duration
    setProgress(pct * 100)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === ' ' || e.key.toLowerCase() === 'k') {
        e.preventDefault()
        togglePlay()
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute()
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen()
      }
    },
    [togglePlay, toggleMute, toggleFullscreen]
  )

  return (
    <section className="video section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="video__header reveal">
          <p className="video__eyebrow">La Experiencia en Movimiento</p>
          <h2 className="video__title">
            Momentos que se viven,
            <br />
            <span className="video__title-accent">experiencias que se recuerdan.</span>
          </h2>
          <p className="video__description">
            Cada evento es una historia. Déjanos mostrarte cómo la contamos.
          </p>
        </div>

        {/* Video Container */}
        <div className="video__stage reveal">
          {/* PLACEHOLDER VIDEO — Reemplazar con video real.
              Colocar el archivo en src/assets/videos/experience.mp4
              y descomentar la etiqueta <video> + <source> debajo.
              El poster puede ser un frame o imagen de portada. */}

          {/* Placeholder visual temporal */}
          <div className="video__placeholder">
            <div className="video__placeholder-overlay">
              <div className="video__placeholder-content">
                <svg
                  className="video__placeholder-icon"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20h40l-4 24a6 6 0 01-6 6H22a6 6 0 01-6-6L12 20z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 20c0-6 6-10 14-10s14 4 14 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32 10V4m0 0h6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="video__placeholder-label">
                  Video de experiencia
                </span>
              </div>
            </div>
          </div>

          {/* Descomentar cuando se tenga el video real:
          <video
            ref={videoRef}
            className="video__element"
            muted={isMuted}
            playsInline
            preload="metadata"
            poster="/src/assets/images/video-poster.jpg"
            onClick={togglePlay}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
          >
            <source src="/src/assets/videos/experience.mp4" type="video/mp4" />
          </video>
          */}

          {/* Play/Pause Center Button */}
          <button
            className={`video__play-btn ${isPlaying ? 'video__play-btn--playing' : ''}`}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar' : 'Reproducer'}
            tabIndex={0}
          >
            {isPlaying ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            )}
          </button>

          {/* Controls Bar */}
          <div className={`video__controls ${showControls ? '' : 'video__controls--hidden'}`}>
            {/* Progress bar */}
            <div
              className="video__progress"
              ref={progressRef}
              onClick={handleSeek}
              role="slider"
              aria-label="Progreso del video"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              tabIndex={0}
            >
              <div
                className="video__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="video__controls-row">
              <button
                className="video__ctrl-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5-11-6.5z" />
                  </svg>
                )}
              </button>

              <button
                className="video__ctrl-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                  </svg>
                )}
              </button>

              <button
                className="video__ctrl-btn"
                onClick={toggleFullscreen}
                aria-label="Pantalla completa"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoExperience
