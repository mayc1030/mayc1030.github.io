---
title: "Arquitectura Serverless y Vanilla JS en Polla Mundialista 2026"
date: 2026-07-01
excerpt: "Análisis técnico y lecciones de arquitectura tras construir una plataforma SPA de pronósticos en tiempo real para el Mundial FIFA 2026 usando Vanilla JS, Supabase y PostgreSQL."
categories: [Desarrollo Web, JavaScript]
tags: [vanillajs, supabase, postgresql, serverless, jekyll]
image: ""
emoji: "⚽"
---

Cuando nos enfrentamos al desarrollo de aplicaciones interactivas con manejo intensivo de estado —como una plataforma en vivo para pronosticar los 72 partidos y las llaves eliminatorias de la **Copa Mundial FIFA 2026**—, el reflejo habitual del desarrollador moderno es inicializar un framework como Next.js, React o Vue. 

Sin embargo, para el proyecto **[Polla Mundialista 2026](https://github.com/msscodex/pollamundialista)**, decidí tomar una ruta arquitectónica diferente, enfocada en el máximo rendimiento del navegador y la simplicidad operacional: **Vanilla JavaScript puro en el cliente y Supabase en el backend serverless**.

---

## 💡 El reto: Latencia cero en tablas de pronósticos masivas

Una quiniela de fútbol exige que el usuario ingrese y edite decenas de marcadores numéricos de manera casi simultánea. Cada cambio en un marcador de la fase de grupos no solo actualiza el partido individual, sino que:
1. Recalcula los puntos, goles a favor, goles en contra y diferencia de gol de los 4 equipos del grupo.
2. Reordena la tabla de posiciones aplicando criterios de desempate de la FIFA.
3. Determina qué selecciones clasifican como 1° y 2° de grupo, propagándolas automáticamente hacia las llaves eliminatorias (*Bracket* de 32avos hasta la Final).

En implementaciones con Virtual DOM, la actualización masiva y reactiva de cientos de celdas en dispositivos móviles puede generar micro-congelamientos. Al estructurar **más de 3,700 líneas de Vanilla JS** modular con delegación de eventos directa (*Event Delegation*), logramos que cada recálculo completo del torneo tome menos de **2 milisegundos**.

---

## 🏛️ El Stack Técnico: Buildless y Serverless

| Capa | Tecnología | Justificación Arquitectónica |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JS & CSS3 Puro | Cero *bundles* de transpilación. Archivos estáticos directos servidos sin bloqueos. |
| **Persistencia** | Supabase (PostgreSQL) | Motor relacional robusto con Row-Level Security (RLS) y suscripciones Realtime. |
| **Lógica Crítica** | Deno Edge Functions | Registro seguro de usuarios e integraciones atómicas en el borde (*Edge*). |
| **Despliegue** | GitHub Pages / Jekyll | Alojamiento de alta disponibilidad, rápido y sin costos de servidores dedicados. |

---

## 🔄 Persistencia en 3 Niveles: Resiliencia ante todo

Uno de los mayores dolores de cabeza en formularios extensos es la pérdida de conectividad. Para evitar que un usuario pierda 40 pronósticos ingresados si le falla el internet, implementamos un patrón de persistencia híbrida:

```
[ Input del Usuario ] → 1. localStorage (Borrador Inmediato)
                        → 2. STATE en Memoria (UI Reactiva)
                        → 3. Supabase PostgreSQL (Confirmación Asíncrona)
```

1. **Escritura en `localStorage`:** Cada dígito escrito se guarda en milisegundos en el navegador del usuario.
2. **Estado en Memoria (`STATE`):** Un objeto global reactivo mantiene sincronizadas las vistas de lectura y edición.
3. **Sincronización en Base de Datos:** Cuando el usuario presiona *"Enviar Polla"*, se envía el payload completo a Supabase bajo políticas estrictas de **Row-Level Security (RLS)**, garantizando que nadie pueda alterar las predicciones de otro participante ni editar después de la fecha de corte dispuesta por el administrador.

---

## 🛠️ Conclusiones y Aprendizajes

Construir **Polla Mundialista 2026** confirmó una valiosa lección de arquitectura de software: **la tecnología más compleja no siempre es la más eficiente**. Al aprovechar las APIs nativas del DOM moderno, módulos ES6 y herramientas *serverless* potentes como Supabase, es posible construir aplicaciones de grado corporativo ultrarrápidas, mantenibles y fáciles de escalar ante picos masivos de tráfico.

¿Te interesa explorar el código o implementar tu propio torneo? Puedes revisar el repositorio y la demo en vivo desde la sección de [Proyectos](/proyectos/02-polla-mundialista/).
