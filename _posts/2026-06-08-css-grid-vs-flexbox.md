---
title: "CSS Grid vs Flexbox: cuándo usar cada uno"
date: 2026-06-08
excerpt: "La regla simple que uso para decidir entre Grid y Flexbox sin pensarlo dos veces."
categories: [Tutorial, Desarrollo Web]
tags: [css, grid, flexbox, frontend]
image: ""
emoji: "🎨"
---

La pregunta sale en cada proyecto: ¿Grid o Flexbox? La respuesta corta: **Flexbox para una dimensión, Grid para dos**.

## Flexbox: una dirección a la vez

Flexbox organiza elementos en una fila o columna. Es ideal cuando:

- Tienes una barra de navegación con elementos alineados horizontalmente
- Centras vertical y horizontalmente un elemento
- Distribuyes espacio entre botones de un formulario

```css
.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}
```

## Grid: dos dimensiones simultáneas

Grid controla filas Y columnas al mismo tiempo. Úsalo para:

- Layouts de página completos (header, sidebar, main, footer)
- Galerías de imágenes
- Cards que deben alinearse en filas y columnas

```css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

## La regla práctica

- ¿El contenido dicta el tamaño de los contenedores? → **Flexbox**
- ¿Los contenedores dictan el tamaño del contenido? → **Grid**

En la práctica, los dos coexisten en el mismo layout. Un Grid en el nivel de página con Flexbox dentro de cada celda es lo más común y funciona bien.
