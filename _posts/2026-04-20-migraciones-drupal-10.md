---
title: "Migraciones en Drupal 10: de D7 a D10 sin morir en el intento"
date: 2026-04-20
excerpt: "Migrate API, fuentes personalizadas y cómo depurar migraciones que fallan silenciosamente."
categories: [Drupal]
tags: [drupal, migraciones, backend, drupal10]
image: ""
emoji: "🔄"
---

Las migraciones de Drupal 7 a Drupal 10 siguen siendo el proyecto más común que encuentro. Esto es lo que aprendí haciéndolas en producción.

## Estructura de una migración YAML

```yaml
id: migrate_articles
label: 'Migrar artículos de D7'
source:
  plugin: d7_node
  node_type: article
process:
  title: title
  body/value: body/value
  body/format:
    plugin: default_value
    default_value: basic_html
destination:
  plugin: entity:node
  default_bundle: article
```

## Plugin de proceso más útil: `migration_lookup`

Para migrar referencias entre entidades:

```yaml
field_author:
  plugin: migration_lookup
  migration: migrate_users
  source: uid
```

Resuelve el ID del autor en el destino automáticamente. Sin este plugin, tendrías que hacer el lookup manual.

## Depuración

```bash
drush migrate:status migrate_articles
drush migrate:import migrate_articles --limit=10
drush migrate:messages migrate_articles
```

`migrate:messages` muestra los errores por fila. Es el comando más útil cuando la migración corre pero los datos no quedan bien.

## Rollback y reimport

```bash
drush migrate:rollback migrate_articles
drush migrate:import migrate_articles
```

Siempre prueba el rollback antes de ir a producción. Si no puedes hacer rollback limpiamente, la migración no está completa.
