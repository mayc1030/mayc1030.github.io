---
title: "Guía práctica de React Hooks en 2026"
date: 2026-06-18
excerpt: "useState, useEffect, useCallback y cuándo usar cada uno sin complicarte la vida."
categories: [React, JavaScript]
tags: [react, hooks, frontend]
image: ""
emoji: "⚛️"
---

Los hooks de React siguen siendo la forma principal de manejar estado y efectos secundarios. Esta es mi guía de cuándo usar cada uno.

## useState — para estado simple

```jsx
const [count, setCount] = useState(0);
```

Úsalo cuando el estado es un valor primitivo o un objeto pequeño que solo le importa a ese componente.

## useEffect — para sincronizar con el exterior

```jsx
useEffect(() => {
  document.title = `${count} clicks`;
}, [count]);
```

La regla de oro: si necesitas sincronizar con algo fuera de React (DOM, API, suscripción), usa `useEffect`. No lo uses para transformar datos que puedes calcular durante el render.

## useCallback — para estabilizar referencias

```jsx
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []); // dependencias vacías = referencia estable
```

Solo vale la pena cuando pasas la función como prop a un componente memoizado con `React.memo`.

## useMemo — para cálculos costosos

```jsx
const filtered = useMemo(
  () => items.filter(item => item.active),
  [items]
);
```

La regla: si el cálculo tarda menos de 1ms, no lo memoices. El overhead de useMemo puede ser mayor que el cálculo.

La clave es no sobreusar hooks. Menos hooks suelen significar código más legible.
