---
title: "Composer: gestión de dependencias PHP que todo dev debería dominar"
date: 2026-05-07
excerpt: "Más allá del require básico. Scripts, autoloading y cómo mantener un composer.json limpio."
categories: [PHP, Tutorial]
tags: [php, composer, backend, herramientas]
image: ""
emoji: "📦"
---

Composer es tan fundamental en PHP como npm en Node.js. Pero muchos developers solo usan `composer require` y no aprovechan el resto.

## Scripts personalizados

```json
{
  "scripts": {
    "cs-fix":  "php-cs-fixer fix src/",
    "test":    "phpunit --colors=always",
    "analyze": "phpstan analyse src/ --level=8",
    "qa":      ["@cs-fix", "@analyze", "@test"]
  }
}
```

`composer qa` ejecuta los tres en secuencia. Ideal para CI.

## Autoloading correcto

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "App\\Tests\\": "tests/"
    }
  }
}
```

Separa `autoload` (producción) de `autoload-dev` (desarrollo). En prod el autoloader no incluye las clases de test.

## Versiones semánticas

```json
"dependencies": {
  "vendor/pkg": "^2.3",    // >=2.3.0 <3.0.0 — recomendado
  "vendor/pkg": "~2.3.1",  // >=2.3.1 <2.4.0 — más conservador
  "vendor/pkg": "2.3.1"    // exacta — solo para paquetes críticos
}
```

Usa `^` por defecto. Fija versiones exactas solo si el paquete tiene historial de breaking changes en patches.

## composer.lock en el repo

Sí, debe estar en git. El `.lock` garantiza que todos los entornos usen exactamente las mismas versiones. Solo omítelo si el proyecto es una librería reutilizable.
