---
title: "Construyendo APIs REST con Node.js sin frameworks pesados"
date: 2026-05-12
excerpt: "Cómo estructuro APIs en Node.js con Express mínimo y sin dependencias innecesarias."
categories: [JavaScript]
tags: [nodejs, api, rest, backend]
image: ""
emoji: "🚀"
---

No necesitas NestJS ni un framework complejo para una API bien estructurada. Esto es lo que uso en proyectos medianos.

## Estructura de proyecto

```
src/
  routes/       ← definición de endpoints
  controllers/  ← lógica de cada endpoint
  services/     ← lógica de negocio
  middleware/   ← auth, validación, error handler
  index.js      ← arranque del servidor
```

## Error handler centralizado

```javascript
// middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
  const status = err.statusCode ?? 500;
  res.status(status).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
```

Todos los errores van a este handler. En los controllers solo hago `next(error)`.

## Validación de entrada con Zod

```javascript
import { z } from 'zod';

const CreatePostSchema = z.object({
  title:   z.string().min(3).max(100),
  content: z.string().min(10),
  tags:    z.array(z.string()).optional(),
});

// En el controller:
const data = CreatePostSchema.parse(req.body);
```

Zod es mi opción por su integración con TypeScript y sus mensajes de error claros.

## Rate limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/api', limiter);
```

Siempre en producción, nunca opcional.
