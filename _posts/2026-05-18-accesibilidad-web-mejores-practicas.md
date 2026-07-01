---
title: "Accesibilidad web: errores comunes y cómo corregirlos"
date: 2026-05-18
excerpt: "Los 5 errores de accesibilidad que aparecen en casi todos los proyectos y cómo solucionarlos en menos de una hora."
categories: [Desarrollo Web, Tutorial]
tags: [accesibilidad, html, a11y]
image: ""
emoji: "♿"
---

La accesibilidad no es un feature opcional. Es parte del código correcto. Estos son los errores que encuentro en casi todos los proyectos.

## 1. Imágenes sin alt

```html
<!-- Mal -->
<img src="hero.jpg">

<!-- Bien -->
<img src="hero.jpg" alt="Maycol trabajando en su computador">

<!-- Decorativa: alt vacío explícito -->
<img src="decoration.svg" alt="">
```

## 2. Botones sin label accesible

```html
<!-- Mal: el lector de pantalla dice "botón" -->
<button>
  <svg>...</svg>
</button>

<!-- Bien -->
<button aria-label="Cerrar menú">
  <svg aria-hidden="true">...</svg>
</button>
```

## 3. Contraste insuficiente

Usa la herramienta de contraste de Chrome DevTools o [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). El mínimo WCAG AA es 4.5:1 para texto normal.

## 4. Formularios sin labels

```html
<!-- Mal -->
<input type="email" placeholder="Tu email">

<!-- Bien -->
<label for="email">Email</label>
<input type="email" id="email" placeholder="nombre@ejemplo.com">
```

## 5. Focus no visible

Nunca hagas esto:

```css
:focus { outline: none; }
```

Si el outline por defecto es feo, reemplázalo — no lo elimines:

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
```

Con estos cinco fixes cubres la mayoría de auditorías de accesibilidad básicas.
