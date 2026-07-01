---
title: "Optimización de rendimiento en React: lo que realmente importa"
date: 2026-04-28
excerpt: "Profiler, re-renders innecesarios y cuándo usar memo. Sin micro-optimizaciones que no cambian nada."
categories: [React, JavaScript]
tags: [react, performance, frontend]
image: ""
emoji: "🏎️"
---

La mayoría de problemas de rendimiento en React tienen la misma causa: re-renders innecesarios. Esta es mi checklist.

## Paso 1: medir antes de optimizar

Abre React DevTools Profiler y graba la interacción lenta. El profiler muestra qué componentes se re-renderizan y cuánto tardan. Sin datos, cualquier optimización es a ciegas.

## Paso 2: identificar la causa

Los re-renders innecesarios ocurren por:

1. **Estado en el nivel incorrecto** — Si el estado cambia frecuentemente, ponlo lo más cerca posible del componente que lo usa.

2. **Referencias nuevas en cada render** — Arrays u objetos creados inline como props cambian referencia en cada render:

```jsx
// Mal: nueva referencia en cada render
<List items={[1, 2, 3]} />

// Bien: estable
const ITEMS = [1, 2, 3];
<List items={ITEMS} />
```

3. **Context con valor grande** — Cada cambio al contexto re-renderiza todos los consumidores. Divide el contexto por dominio.

## React.memo con cuidado

```jsx
const Card = React.memo(function Card({ title, onClick }) {
  return <div onClick={onClick}>{title}</div>;
});
```

Solo vale la pena si el componente es costoso de renderizar O si renderiza muchas veces con las mismas props. No lo apliques por defecto a todos los componentes.

## Virtualización para listas largas

Si renderizas más de 100 elementos, usa `@tanstack/virtual`. Sin virtualización, 1000 nodos en el DOM es lento en cualquier máquina.
