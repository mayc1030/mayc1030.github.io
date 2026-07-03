---
title: "Portfolio Personal"
description: "Sitio web de portafolio profesional construido con Jekyll y desplegado en GitHub Pages. Diseño minimalista con dark mode, tokens de diseño y arquitectura de componentes atómicos."
emoji: "🌐"
featured: false
published: false
hidden: true
order: 4
tech: ["Jekyll", "SCSS", "Liquid", "GitHub Pages"]
url_demo: "https://mayc1030.github.io"
url_repo: "https://mayc1030.github.io"
---

## El proyecto

Este es el sitio que estás viendo ahora mismo. Lo construí para tener un espacio propio donde mostrar mi trabajo, escribir sobre desarrollo web y experimentar con tecnologías que me interesan.

## Por qué Jekyll

Podría haber usado React, Next.js o cualquier framework moderno. Elegí Jekyll por una razón simple: **el contenido es estático, no necesita un servidor**. GitHub Pages lo despliega directamente desde el repositorio, sin costos de infraestructura.

El trade-off es que no hay interactividad del lado del servidor, pero para un portfolio eso es irrelevante.

## Arquitectura

El proyecto sigue una separación de responsabilidades estricta:

- **Contenido** → archivos YAML y Markdown. Cero HTML en los datos.
- **Estructura** → layouts de Liquid. Solo se encarga de dónde van las cosas.
- **Estilos** → un único archivo SCSS compilado por Jekyll.
- **Comportamiento** → vanilla JS sin dependencias.

## Sistema de tokens CSS

Todo el diseño se define en custom properties en `:root`. Esto hace que el dark mode sea trivial: solo redefino los tokens bajo `[data-theme="dark"]`.

```scss
:root {
  --color-primary: #0A66C2;
  --color-surface: #FFFFFF;
}

[data-theme="dark"] {
  --color-primary: #4d9de0;
  --color-surface: #0F172A;
}
```

## Decisiones técnicas

- **Sin `@import`/`@use` en SCSS**: la versión de `sass-embedded` compatible con `jekyll-sass-converter 3.1.0` no los soporta correctamente. Todo el CSS va en un único archivo.
- **i18n sin plugin**: las traducciones ES/EN se manejan con `data-i18n` y un objeto JS. Simple y sin dependencias.
- **Paginación JS**: tanto el blog como los proyectos paginan en el cliente para no necesitar `jekyll-paginate-v2`.
