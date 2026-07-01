---
title: "Mi flujo de trabajo con Git en proyectos reales"
date: 2026-05-30
excerpt: "Cómo organizo ramas, commits y code reviews para no perder el hilo en proyectos con varios desarrolladores."
categories: [General, Tutorial]
tags: [git, workflow, herramientas]
image: ""
emoji: "🌿"
---

Después de trabajar en proyectos con equipos de distintos tamaños, este es el flujo que funciona sin importar el tamaño del equipo.

## Estructura de ramas

```
main          ← producción, siempre estable
develop       ← integración, se despliega a staging
feature/xxx   ← una rama por feature o bug
hotfix/xxx    ← arreglos urgentes sobre main
```

## Commits semánticos

```
feat: agrega filtro por categoría en blog
fix: corrige paginación al cambiar filtro
refactor: extrae lógica de fetch a helper
docs: actualiza CLAUDE.md con instrucciones de build
```

El prefijo importa. `feat` y `fix` generan notas de release automáticamente si usas herramientas como `conventional-changelog`.

## Antes de hacer merge

```bash
git fetch origin
git rebase origin/develop   # actualiza sin crear merge commit
git push --force-with-lease  # seguro con rebase
```

`--force-with-lease` evita sobreescribir el trabajo de otros accidentalmente.

## Pull Requests

- Título descriptivo (máximo 70 caracteres)
- Descripción con el "por qué", no el "qué"
- Máximo 400 líneas por PR — si es más, divide

La disciplina en los commits hace que el `git log` sea documentación real del proyecto.
