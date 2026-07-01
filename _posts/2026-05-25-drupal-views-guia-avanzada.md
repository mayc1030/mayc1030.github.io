---
title: "Drupal Views: más allá de lo básico"
date: 2026-05-25
excerpt: "Relaciones, argumentos contextuales y caché de Views. Lo que no aprenderás en la documentación oficial."
categories: [Drupal]
tags: [drupal, views, backend]
image: ""
emoji: "🔩"
---

Views es uno de los módulos más poderosos de Drupal. Pero la mayoría lo usa solo al 20%. Esto es lo que uso en proyectos complejos.

## Relaciones

Las relaciones te permiten acceder a campos de entidades referenciadas:

1. **Add relationship** → elige el campo de referencia (ej. `field_author`)
2. Los campos del nodo relacionado ahora están disponibles en la vista

Ejemplo: mostrar el avatar del autor de cada artículo sin escribir una sola línea de PHP.

## Argumentos contextuales

Los argumentos permiten filtrar la vista desde la URL:

```
/blog/categoria/%  ← el % es el argumento
```

Configura la validación en **Contextual filters → When the filter value is NOT available** para controlar qué pasa cuando no hay argumento.

## Caché de Views

Por defecto Views usa caché de tiempo. En producción siempre cambio a **tag-based caching**:

- Navegas a la vista → Edit → Advanced → Caching
- Selecciona **Tag based** para query y rendered output

Con tag-based, la caché se invalida automáticamente cuando se actualiza el contenido relacionado. Es más eficiente y más correcto que un timeout fijo.

## Exposed filters con AJAX

Habilitar **Use AJAX** en la vista hace que los filtros expuestos actualicen el contenido sin recargar la página. Solo recuerda que necesitas `drupal_attach_library('core/drupal.ajax')` si personalizas el template.
