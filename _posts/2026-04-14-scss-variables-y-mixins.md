---
title: "SCSS: variables, mixins y cuándo usar custom properties de CSS"
date: 2026-04-14
excerpt: "La diferencia práctica entre variables SCSS y CSS custom properties, y mixins que realmente ahorran tiempo."
categories: [Tutorial, Desarrollo Web]
tags: [scss, css, frontend, tutorial]
image: ""
emoji: "💅"
---

Con CSS nativo teniendo custom properties (`var(--)`), ¿para qué seguir usando variables SCSS? La respuesta es: para cosas distintas.

## Variables SCSS vs CSS custom properties

**Variables SCSS** — se resuelven en tiempo de compilación:

```scss
$breakpoint-md: 768px;

@media (min-width: $breakpoint-md) { ... }
```

No puedes usar `var(--breakpoint-md)` en un `@media`. Las variables SCSS son la única opción aquí.

**CSS custom properties** — se resuelven en tiempo de ejecución:

```css
:root { --color-primary: #0A66C2; }
[data-theme="dark"] { --color-primary: #4d9de0; }
```

El tema oscuro funciona porque el valor cambia en el DOM, algo imposible con variables SCSS.

**Regla práctica:** usa SCSS para valores que nunca cambian en runtime (breakpoints, z-indexes). Usa custom properties para tokens visuales que pueden cambiar.

## Mixins útiles

```scss
@mixin visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin truncate($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

`visually-hidden` es el más importante: oculta visualmente sin quitar del DOM (accesibilidad). `truncate` lo uso casi en todos los proyectos para texto con overflow.
