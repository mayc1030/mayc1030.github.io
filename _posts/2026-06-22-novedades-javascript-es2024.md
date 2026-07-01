---
title: "Novedades de JavaScript ES2024 que debes conocer"
date: 2026-06-22
excerpt: "ES2024 trae mejoras importantes al lenguaje. Repaso las características más útiles con ejemplos prácticos."
categories: [JavaScript, Desarrollo Web]
tags: [javascript, es2024, frontend]
image: ""
emoji: "⚡"
---

ES2024 (ECMAScript 2024) llegó con varias características que simplifican el código del día a día. Estas son las que más uso en proyectos reales.

## Object.groupBy

Agrupa elementos de un array sin necesidad de librerías externas:

```javascript
const posts = [
  { title: 'Post A', category: 'drupal' },
  { title: 'Post B', category: 'react' },
  { title: 'Post C', category: 'drupal' },
];

const grouped = Object.groupBy(posts, post => post.category);
// { drupal: [...], react: [...] }
```

## Promise.withResolvers

Expone `resolve` y `reject` fuera del constructor:

```javascript
const { promise, resolve, reject } = Promise.withResolvers();

setTimeout(() => resolve('listo'), 1000);
await promise; // 'listo'
```

## Array.prototype.toSorted / toReversed

Versiones inmutables de `sort` y `reverse`:

```javascript
const nums = [3, 1, 4, 1, 5];
const sorted = nums.toSorted(); // nuevo array ordenado
// nums no cambia
```

Estas tres ya tienen soporte en todos los navegadores modernos y son las que más impacto tienen en el código cotidiano.
