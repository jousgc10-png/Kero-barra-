# KEROBARRA

Landing page premium para empresa de servicios de barman y coctelería para eventos.

---

## Descripción

Proyecto de presentación comercial para una empresa de servicio profesional de barman. El sitio muestra visualmente la marca, servicios, experiencia y propuesta de coctelería, y facilita el contacto directo mediante WhatsApp.

**No es** un sistema de reservas, e-commerce, panel administrativo ni backend. Es una landing page de presentación.

---

## Tecnología

| Tecnología | Versión |
|------------|---------|
| React | ^18.3.1 |
| Vite | ^5.4.11 |
| @vitejs/plugin-react | ^4.3.4 |
| JavaScript | JSX |
| CSS | Custom Properties |
| npm | Gestor de paquetes |

---

## Estructura del Proyecto

```
kerobarra/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    │   ├── images/          (vacío — placeholders en componentes)
    │   └── videos/          (vacío — placeholder en VideoExperience)
    ├── data/
    │   ├── contact.js       (WhatsApp, email, horarios, redes)
    │   ├── cocktails.js     (6 cócteles)
    │   ├── gallery.js       (8 imágenes)
    │   ├── packages.js      (3 paquetes)
    │   └── services.js      (4 servicios)
    └── components/
        ├── Navbar/
        ├── Hero/
        ├── Services/
        ├── Experience/
        ├── Gallery/
        ├── VideoExperience/
        ├── Cocktails/
        ├── Packages/
        ├── CTA/
        ├── Contact/
        ├── Footer/
        └── WhatsAppButton/
```

### Carpetas principales

| Carpeta | Función |
|---------|---------|
| `src/data/` | Datos separados de componentes (configuración, servicios, cócteles, paquetes, galería) |
| `src/components/` | Componentes React organizados por sección |
| `src/assets/` | Carpeta preparada para imágenes y videos reales |

---

## Instalación

```bash
npm install
```

---

## Desarrollo

```bash
npm run dev
```

La aplicación se abre en `http://localhost:5173`

---

## Build

```bash
npm run build
```

Los archivos de producción se generan en `dist/`

### Preview del build

```bash
npm run preview
```

---

## Configuración

### WhatsApp, Email y Redes Sociales

**Archivo único de configuración:** `src/data/contact.js`

```js
export const WHATSAPP_NUMBER = ''        // Código país + número, sin espacios
export const WHATSAPP_MESSAGE = '...'    // Mensaje prellenado
export const EMAIL = ''                  // Email de contacto
export const BUSINESS_HOURS = ''         // Horario de atención
export const SOCIAL_LINKS = [...]        // URLs de redes sociales
```

La función `getWhatsAppLink()` genera el enlace `https://wa.me/NUMERO?text=MENSAJE` dinámicamente.

### Contenido editable sin tocar componentes

| Contenido | Archivo |
|-----------|---------|
| Servicios | `src/data/services.js` |
| Cócteles | `src/data/cocktails.js` |
| Paquetes | `src/data/packages.js` |
| Galería | `src/data/gallery.js` |
| Contacto/WhatsApp | `src/data/contact.js` |

### Imágenes y Videos

| Tipo | Ubicación | Estado |
|------|-----------|--------|
| Imágenes de servicios | `src/assets/images/` | Placeholder (gradiente + inicial) |
| Imágenes de galería | `src/assets/images/` | Placeholder (gradiente + icono) |
| Imágenes de cócteles | `src/assets/images/cocktails/` | Placeholder (gradiente + inicial) |
| Imágenes de paquetes | `src/assets/images/packages/` | Placeholder (gradiente + inicial) |
| Video de experiencia | `src/assets/videos/` | Placeholder visual |
| Imagen de fondo CTA | `src/assets/images/` | Placeholder (gradiente) |

Para reemplazar: colocar el archivo en la ubicación indicada y descomentar el `<img>` correspondiente en el componente.

---

## WhatsApp

### Cómo funciona

1. **Contact / WhatsApp**: Sección con botón que abre `https://wa.me/NUMERO?text=MENSAJE`
2. **Botón flotante**: Mismo enlace, siempre visible en pantalla
3. **Configuración compartida**: Ambos importan desde `src/data/contact.js`

**No se duplica el número en ningún lugar.**

### Estado actual

| Elemento | Estado |
|----------|--------|
| Botón flotante | Visible con estado "pendiente" (badge dorado) |
| Botón en Contact | Visible, deshabilitado si no hay número |
| Número configurado | No |

---

## Diseño

**Identidad visual:** oscuro cinematográfico, premium, elegante.

| Color | Uso |
|-------|-----|
| Negro/carbono `#0a0a0a` | Fondo principal |
| Blanco `#ffffff` | Textos |
| Dorado/ámbar `#c9a96e` | Acentos, CTAs, detalles |

**Tipografía:**
- Títulos: Playfair Display (serif)
- Cuerpo: Inter (sans-serif)

**Animaciones:** sutiles, basadas en IntersectionObserver para activarse al hacer scroll. Todas respetan `prefers-reduced-motion`.

---

## Responsive

| Breakpoint | Layout |
|------------|--------|
| Desktop (>1024px) | Navbar horizontal, grids multi-columna |
| Tablet (769-1024px) | Navbar compacta, grids reducidos |
| Móvil (≤768px) | Menú hamburguesa, una columna, botones full-width |

El botón flotante respeta el área segura de dispositivos con notch.

---

## Secciones Implementadas

✅ Navbar (fijo, con scroll suave)
✅ Hero (pantalla completa, placeholder cinematográfico)
✅ Services (4 tarjetas con datos en services.js)
✅ Experience (dos columnas, parallax sutil)
✅ Gallery (masonry editorial + lightbox)
✅ Video Experience (placeholder, controles preparados)
✅ Cocktails (6 cards + modal de detalle)
✅ Packages (3 paquetes, resaltado configurable)
✅ CTA (invitación cinematográfica)
✅ Contact / WhatsApp (dos columnas, config en contact.js)
✅ Footer (navegación, contacto, redes, copyright dinámico)
✅ Botón flotante WhatsApp (configuración compartida)

---

## Estado Actual

### Implementado

- Estructura completa de la landing
- Sistema de diseño (colores, tipografía, espaciado)
- Animaciones de entrada con IntersectionObserver
- Responsive en todas las secciones
- Lightbox en galería
- Modal en cócteles
- Botón flotante de WhatsApp
- Configuración centralizada de contacto
- Datos separados de componentes

### Pendiente

- Número real de WhatsApp
- Email real
- Horario de atención real
- URLs de redes sociales
- Imágenes reales (servicios, galería, cócteles, paquetes, CTA)
- Video real de experiencia
- Favicon
- Open Graph / SEO

---

## Reglas para Futuras Modificaciones

1. Analizar la estructura existente antes de modificar código
2. No reescribir componentes que ya funcionan
3. No instalar dependencias innecesarias
4. Mantener los datos separados de los componentes
5. Reutilizar configuraciones existentes
6. No duplicar el número de WhatsApp
7. No inventar información real de la empresa
8. Mantener responsive
9. Mantener accesibilidad (aria-labels, focus-visible, contraste)
10. Ejecutar `npm run build` después de cambios importantes
11. Verificar consola y errores
12. No romper secciones anteriores al agregar una nueva
13. Mantener el diseño premium existente

---

## Próximas Posibles Mejoras

- Reemplazar imágenes temporales por fotografías reales
- Agregar video real de la empresa
- Configurar número real de WhatsApp
- Configurar redes sociales
- Configurar email
- SEO (meta tags, Open Graph)
- Favicon
- Optimización de imágenes (WebP, srcset)
- Deployment en hosting estático
- Dominio personalizado

---

## Publicación

El proyecto puede desplegarse en servicios compatibles con Vite/React:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Cualquier hosting estático con soporte SPA

Requisito: configurar fallback a `index.html` para rutas SPA.

---

## Contexto para Continuar el Proyecto con Otra IA

### Qué es el proyecto

Landing page premium para empresa de barman/eventos. React + Vite, sin backend, sin base de datos. Presentación comercial con contacto por WhatsApp.

### Tecnologías

- React 18 + Vite 5
- JavaScript (JSX)
- CSS con Custom Properties
- Sin librerías externas (solo React + ReactDOM)

### Qué está terminado

Todas las secciones visuales están implementadas y funcionales. El diseño premium está completo. Las animaciones son sutiles y responsivas.

### Arquitectura

- Componentes en `src/components/[Nombre]/[Nombre].jsx + .css`
- Datos en `src/data/*.js`
- Configuración de contacto en `src/data/contact.js`
- Design system en `src/index.css` (custom properties)

### Reglas que debe respetar la IA

1. NO instalar librerías sin autorización explícita
2. NO modificar secciones aprobadas sin permiso
3. NO inventar datos de la empresa (números, emails, URLs)
4. NO duplicar la configuración de WhatsApp
5. Mantener la separación datos/componentes
6. Respetar `prefers-reduced-motion`
7. Mantener accesibilidad (aria-labels, focus-visible)
8. Ejecutar `npm run build` después de cambios
9. Verificar que no haya errores de consola

### Dónde modificar contenido

- **WhatsApp/Email/Redes:** `src/data/contact.js`
- **Servicios:** `src/data/services.js`
- **Cócteles:** `src/data/cocktails.js`
- **Paquetes:** `src/data/packages.js`
- **Galería:** `src/data/gallery.js`
- **Imágenes:** `src/assets/images/` (descomentar `<img>` en componentes)

### Cómo ejecutar

```bash
npm install
npm run dev      # Desarrollo en localhost:5173
npm run build    # Build de producción en dist/
npm run preview  # Preview del build
```

### Qué NO debe hacer sin autorización

- Agregar nuevas secciones
- Cambiar la paleta de colores
- Instalar dependencias
- Modificar componentes existentes
- Crear backend o base de datos
- Desplegar el proyecto
