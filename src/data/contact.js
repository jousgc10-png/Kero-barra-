// ============================================
// CONTACT CONFIGURATION
// ============================================
// Cambia estos valores cuando tengas los datos reales.
// NO inventar datos — dejar vacíos hasta tener información confirmada.
// ============================================

export const WHATSAPP_NUMBER = '' // Ej: '5215512345678' (código país + número, sin espacios ni símbolos)

export const WHATSAPP_MESSAGE =
  'Hola, quisiera información sobre sus servicios para mi evento.'

export const EMAIL = '' // Ej: 'contacto@kerobarra.com'

export const BUSINESS_HOURS = '' // Ej: 'Lun – Sáb · 9:00 – 19:00'

// Redes sociales — dejar vacías hasta tener URLs reales
export const SOCIAL_LINKS = [
  { name: 'Instagram', url: '', icon: 'instagram' },
  { name: 'Facebook', url: '', icon: 'facebook' },
  { name: 'TikTok', url: '', icon: 'tiktok' },
]

// Helper: genera el enlace de WhatsApp con mensaje prellenado
export function getWhatsAppLink() {
  if (!WHATSAPP_NUMBER) return '#'
  const encoded = encodeURIComponent(WHATSAPP_MESSAGE)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}
