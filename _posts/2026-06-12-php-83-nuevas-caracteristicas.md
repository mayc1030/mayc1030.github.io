---
title: "PHP 8.3: las características que más uso"
date: 2026-06-12
excerpt: "Typed class constants, json_validate() y readonly en clases anónimas. Lo que realmente cambió mi flujo de trabajo."
categories: [PHP]
tags: [php, php83, backend]
image: ""
emoji: "🐘"
---

PHP 8.3 llegó con mejoras concretas que ya uso en producción. Estas son las que más impacto tienen.

## Typed class constants

Por fin podemos tipar las constantes de clase:

```php
class Status {
    const string ACTIVE   = 'active';
    const string INACTIVE = 'inactive';
    const int    MAX_RETRY = 3;
}
```

Antes cualquier override en una subclase podía cambiar el tipo sin advertencia. Ahora PHP lo valida.

## json_validate()

Valida JSON sin decodificarlo — mucho más eficiente para archivos grandes:

```php
if (json_validate($jsonString)) {
    $data = json_decode($jsonString, true);
}
```

Antes tenías que decodificar y revisar `json_last_error()`. Ahora es una sola llamada limpia.

## #[Override] attribute

Documenta explícitamente que un método sobreescribe uno del padre:

```php
class Child extends Parent {
    #[Override]
    public function process(): void {
        // PHP lanza error si el padre no tiene este método
    }
}
```

Útil para atrapar errores de refactoring cuando renombras métodos del padre.

## readonly en propiedades dinámicas

Las clases anónimas y los objetos ahora pueden tener propiedades readonly, lo que cierra el último hueco de mutabilidad accidental en DTOs.
