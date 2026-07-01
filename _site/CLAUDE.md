# CLAUDE.md — mayc1030.github.io

Portfolio profesional + Blog de **Maycol Sánchez Salazar** construido con Jekyll 4, desplegado en GitHub Pages.

---

## Comandos esenciales

```bash
# Levantar servidor local (requiere Ruby 3.2 en PATH)
bundle exec jekyll serve --port 4000

# Build de producción
bundle exec jekyll build

# Ruby está en C:\Ruby32-x64\bin (instalado con winget)
# Si el PATH no lo reconoce:
$env:PATH = "C:\Ruby32-x64\bin;" + $env:PATH
```

> **Nota Windows:** `sass-embedded` está fijado a `~> 1.89.0` — no actualizar. La versión 1.100+ es incompatible con `jekyll-sass-converter 3.1.0`.

> **Importante:** cualquier cambio a `_config.yml` (colecciones, plugins, permalinks, defaults) requiere **reiniciar** el servidor — la auto-regeneración no lo recarga. Matar con `Ctrl+C` y volver a ejecutar `bundle exec jekyll serve`.

---

## Arquitectura — Separación de Responsabilidades (SoC)

```
CONTENIDO     →  _data/*.yml            YAML puro (perfil, experiencia, skills, educación, social)
PROYECTOS     →  _projects/*.md         Colección Jekyll. Front matter + contenido detallado.
                                        URL: /proyectos/:name/   |   site.projects en templates
POSTS         →  _posts/*.md            Markdown. URL: /blog/año/mes/dia/titulo/
ESTRUCTURA    →  _layouts/              default.html, post.html, project.html
COMPONENTES   →  _includes/sections/   Una sección = un archivo
                 _includes/components/ Piezas reutilizables
ESTILOS       →  assets/css/main.scss  Un solo archivo compilado por Jekyll (sin @use/@import)
COMPORTAMIENTO→  assets/js/main.js     Loader, i18n, dark mode, nav, skills, back-to-top,
                                        reading progress, paginador proyectos, buscador overlay
```

### Por qué `assets/css/main.scss` es un único archivo

`sass-embedded` falla al resolver `@use`/`@import` con esta versión de `jekyll-sass-converter`. Todo el CSS está en `assets/css/main.scss`. Los archivos en `_sass/` son referencia organizacional pero **no se usan en el build**.

---

## Datos estáticos (`_data/`)

| Archivo | Propósito |
|---|---|
| `profile.yml` | Nombre, rol, bio (ES+EN), email, teléfono, ubicación, disponibilidad |
| `experience.yml` | Lista de empleos (empresa, url, rol, período, logros, tech) |
| `skills.yml` | Skills agrupadas por categoría — `name`, `level` (1–5), `category_en` |
| `education.yml` | Formación académica |
| `social.yml` | Links sociales (GitHub, LinkedIn) |

> `_data/projects.yml` fue eliminado. Los proyectos ahora viven en `_projects/*.md`.

**Estructura de `experience.yml`:**
```yaml
- company: "Nombre Empresa"
  url: "https://empresa.com"
  role: "Rol"
  period: "17 Febrero 2020 — 21 Marzo 2025"
  current: false
  achievements:
    - "Logro 1"
  tech: ["PHP", "React"]
```

**Estructura de `skills.yml`:**
```yaml
- category: "Nombre Categoría"
  category_en: "Category Name"
  skills:
    - { name: "PHP", level: 4 }   # level: 1–5 estrellas
```

**Estructura de `profile.yml` (campos clave):**
```yaml
bio_long: |   # texto ES
bio_long_en: | # texto EN
phone: "(+57) 319 410 0343"
quick_facts:
  - icon: "map-pin"
    text: "Texto en español"
    text_en: "Text in English"
```

---

## Proyectos (`_projects/`)

Cada proyecto es un archivo Markdown con front matter + contenido de detalle.

**Nombre de archivo:** `NN-slug-del-proyecto.md` (prefijo numérico controla el orden)

**Front matter:**
```yaml
---
title: "Nombre del Proyecto"
description: "Descripción corta para la card."
emoji: "🌐"
featured: true          # muestra badge "★ Destacado"
order: 1                # posición en el grid (sort_by: order en _config.yml)
tech: ["Jekyll", "SCSS"]
url_demo: "https://..."  # vacío si no hay demo
url_repo: "https://..."  # vacío si no hay repo
---

Contenido detallado en Markdown...
```

**URL generada:** `/proyectos/slug-del-proyecto/`
**En templates:** `site.projects` (colección, ordenada por `order`)
**Paginación:** 6 por página, JS en `main.js` — sección `Projects Pagination`
**Layout:** `_layouts/project.html`

**Para agregar un proyecto:**
1. Crear `_projects/NN-nombre.md` con el front matter correcto
2. El grid y el paginador se actualizan automáticamente

---

## Blog (`_posts/`)

Los posts van en `_posts/` con nombre `YYYY-MM-DD-titulo-del-post.md`.

**Front matter de cada post:**
```yaml
---
title: "Título del post"
date: 2026-06-24
excerpt: "Resumen corto que aparece en la card."
categories: [Drupal, Desarrollo Web]
tags: [php, cms, backend]
image: ""         # ruta a imagen o vacío
emoji: "🔧"       # emoji de portada si no hay imagen
---
```

**URL generada:** `/blog/2026/06/24/titulo-del-post/`

**Categorías disponibles** (se crean automáticamente al agregarlas en front matter):
- General, Drupal, Desarrollo Web, PHP, JavaScript, React, Tutorial

**Paginación:** 9 por página, JS inline en `blog/index.html`
**Buscador:** icono de lupa en el header → overlay global. Usa `search.json` (fetch)
**Para publicar:** crear el archivo `.md` en `_posts/` y hacer `git push`.

---

## Secciones del portfolio (single-page scroll)

Orden definido en `index.html`:

1. `#inicio` — Hero (foto + nombre + bio corta + CTAs)
2. `#sobre-mi` — About (bio larga en ES/EN)
3. `#experiencia` — Timeline laboral con URL de empresa
4. `#proyectos` — Grid de project cards (6/página) + paginador
5. `#skills` — Skills con estrellas animadas por categoría
6. `#educacion` — Card de educación (centrada si es única)
7. `#contacto` — Email (copy), WhatsApp, ubicación, redes sociales

Páginas separadas: `/blog/` y `/proyectos/:name/`

---

## Sistema de i18n (ES / EN)

- Botón `ES | EN` en el header → persiste en `localStorage`.
- Elementos con `data-i18n="key"` son reemplazados por JS (`main.js`).
- Contenido dual en HTML: `[data-lang-es]` y `[data-lang-en]` (CSS oculta el inactivo).
- Traducciones en el objeto `i18n` dentro de `main.js`.
- Al agregar texto nuevo traducible: añadir `data-i18n="nueva.clave"` al HTML y la clave al objeto.

---

## Sistema de tokens (CSS custom properties)

Todos los valores visuales se definen en `:root` al inicio de `assets/css/main.scss`.

```css
/* Color principal: azul LinkedIn */
--color-primary:       #0A66C2
--color-primary-hover: #084e96
--color-primary-light: #deeaf8

/* Dark mode */
--color-primary:       #4d9de0   (sobre fondos oscuros)

/* Espaciado */
--space-2xs → --space-4xl   (escala: .25rem → 6rem)

/* Tipografía */
--text-xs → --text-6xl
--font-heading / --font-body / --font-mono

/* Layout */
--container-max: 1100px
```

**Dark mode:** `[data-theme="dark"]` en `<html>`. Toggle en header + `localStorage`.

---

## Componentes reutilizables

```liquid
{% include components/project-card.html project=project %}
{% include components/timeline-item.html job=job %}
{% include components/skill-badge.html skill=skill skill_index=forloop.index0 %}
{% include components/social-icon.html icon=link.icon %}
{% include components/post-card.html post=post %}
```

---

## Clases CSS clave

```
/* Portfolio */
.btn --primary / --ghost / --sm / --lg
.badge --tech / --skill / --featured
.hero__grid / .hero__avatar / .hero__content
.about-grid / .about-avatar / .about-text
.timeline / .timeline-item + __header / __role / __period / __company / __url / __achievements / __tech
.skill-category + __name / __list
.skill-item + __name / __stars / __star / __star--filled
.education-list (centra card única con :has) / .education-card
.contact-details / .contact-email / .contact-phone / .contact-location
.social-links

/* Proyectos */
.projects-grid / .projects-pagination
.project-card + __image / __body / __title / __description / __tech / __actions
.project-page + __back / __header / __hero / __badges / __title / __description / __tech / __actions
.project-content  ← reutiliza tipografía de .post-content

/* Blog */
.blog-page / .blog-filter (+ .is-active) / .blog-grid / .blog-pagination
.post-card + __image / __body / __categories / __title / __excerpt / __footer
.post-page + __header / __title / __meta / __categories / __tags / __nav
.post-content  ← tipografía del contenido Markdown (h2–h4, p, code, pre, blockquote, img)
.reading-progress-bar  ← barra fija top, width en % via JS

/* Buscador */
.search-btn  ← icono en header
.search-overlay (+ [hidden]) / __backdrop / __panel / __input-wrap / __input / __close / __results
.search-result-item + __title / __meta / __cat / __excerpt

/* UI global */
.site-loader (+ .is-loaded en body para fade-out)
.lang-toggle + __es / __sep / __en
.back-to-top (+ .is-visible)
.pagination + __arrow / __page (+ .is-active) / __ellipsis
[data-lang-es] / [data-lang-en]  ← visibilidad por idioma
```

---

## Funcionalidades JS (`assets/js/main.js`)

| Función | Descripción |
|---|---|
| Page loader | Fade-out al `window.load`, clase `is-loaded` en `<body>` |
| i18n | Toggle ES/EN, reemplaza `data-i18n`, persiste en `localStorage` |
| Dark mode | Toggle `data-theme`, persiste en `localStorage` |
| Back to top | Aparece al bajar 400px, scroll suave al top |
| Nav mobile | Toggle `is-open` en `#site-nav` |
| Copy email | Copia al portapapeles con feedback visual |
| Skills animation | IntersectionObserver activa `.is-visible` (una sola vez) |
| Active nav | IntersectionObserver marca `aria-current` en `/#section` y `#section` |
| Reading progress | Barra superior en posts, ancho en % según scroll en `.post-content` |
| Projects pagination | 6 proyectos/página en `#projects-grid`, paginador en `#projects-pagination` |
| Search overlay | Abre con icono header o `Ctrl+K`. Fetch `search.json`, filtra en tiempo real |

JS del blog (inline en `blog/index.html`):

| Función | Descripción |
|---|---|
| Category filter | Filtra `.post-card` por `data-categories`, resetea paginación |
| Blog pagination | 9 posts/página, paginador en `#blog-pagination` |

---

## Reglas de desarrollo activas

- **SoC estricto:** UI tonta, lógica ciega, datos en YAML / Markdown / colecciones Jekyll
- **Sin magic numbers:** solo tokens semánticos (`var(--space-md)`, no `16px`)
- **Componentización:** si un bloque UI se reutiliza o supera 20 líneas → extraer a `_includes/components/`
- **Resiliencia:** todo componente maneja estado vacío
- **i18n:** todo texto visible al usuario debe tener traducción EN
- **`[hidden]` funciona:** el reset incluye `[hidden] { display: none !important; }` para evitar que reglas de display con igual especificidad lo anulen

---

## Pendiente para completar el portfolio

- [ ] Foto real en `assets/images/profile.jpg`
- [ ] URLs reales de demo/repo en `_projects/*.md`
- [x] Logros detallados por empresa en `_data/experience.yml`

---

## Deploy

```bash
git add .
git commit -m "mensaje"
git push origin main
# GitHub Pages despliega automáticamente en https://mayc1030.github.io
```
