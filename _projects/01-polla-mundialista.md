---
title: "Polla Mundialista 2026"
description: "Plataforma web Single-Page Application (SPA) para pronósticos y gestión en vivo de la Copa Mundial FIFA 2026. Arquitectura Frontend nativa con Vanilla JS y Backend Serverless en Supabase."
emoji: "⚽"
featured: false

order: 1
tech: ["Vanilla JS", "Supabase", "PostgreSQL", "Jekyll", "CSS3", "Edge Functions"]
url_demo: "https://msscodex.github.io/pollamundialista/"
---

## 🏆 Resumen Ejecutivo

**Polla Mundialista 2026** es una aplicación web de alto rendimiento orientada a la gestión de quinielas, pronósticos en tiempo real y torneos de predicción para la Copa Mundial de la FIFA 2026. 

Construida bajo el paradigma de **Single-Page Application (SPA)** sin frameworks de cliente pesados, combina la ligereza extrema de **Vanilla JavaScript** con la robustez transaccional de **Supabase (PostgreSQL + Row-Level Security)** y el hosting estático de **GitHub Pages / Jekyll**.

---

## 🏗️ Arquitectura del Sistema y Separación de Responsabilidades (SoC)

El diseño del proyecto sigue principios de ingeniería de software estrictos para maximizar la velocidad de ejecución en el navegador y garantizar la consistencia en la base de datos:

```
[ Frontend: Vanilla JS + CSS ]  ←→  [ Supabase: PostgreSQL + RLS ]  ←→  [ Edge Functions: Deno/TS ]
        ↑ (Despliegue CDNs)                 ↑ (Fuente de Verdad)               ↑ (Lógica de Negocio)
[ GitHub Pages / Jekyll ]             [ Autenticación & Realtime ]       [ Gestión de Usuarios ]
```

### 1. Capa de Presentación y Lógica de Cliente (`app.js` & `style.css`)
- **Cero Frameworks Bloqueantes:** Más de 3,700 líneas de código JavaScript nativo modular estructurado para gestionar el enrutamiento de la SPA, el renderizado reactivo del DOM y la validación de pronósticos sin sobrecarga de dependencias ni procesos de transpilación (*buildless frontend*).
- **Sistema de Estilos Tokenizado:** Implementación completa con CSS3 moderno (+3,300 líneas), soporte de temas (*Dark / Light Mode* automático), y diseño 100% responsivo adaptado para visualización intensiva de tablas y llaves de torneo en dispositivos móviles.

### 2. Capa de Persistencia y Sincronización Híbrida
Para ofrecer una experiencia de usuario fluida y tolerante a fallos de red, se implementó un patrón de sincronización en tres niveles:
1. **`localStorage` (Borrador Local):** Registra de manera inmediata cada edición en los marcadores de grupos o eliminatorias.
2. **`STATE` en Memoria:** Objeto global reactivo (`{ player, scores, bracket, bonuses }`) que alimenta las vistas en tiempo real.
3. **Supabase PostgreSQL (Persistencia Real):** Sincronización transaccional al momento de confirmar pronósticos, asegurada mediante políticas de **Row-Level Security (RLS)** donde cada usuario solo puede modificar su propio registro.

---

## ⚡ Funcionalidades Clave

- **⚽ Motor de Pronósticos de Fase de Grupos (12 Grupos / 72 Partidos):** Cálculo automático de puntos por partido (acierto de marcador exacto vs. acierto de tendencia/ganador), actualización automática de tablas de posiciones y criterios de desempate.
- **🏆 Llaves Eliminatorias Interactivas (Bracket R32 → Final):** Propagación dinámica de clasificados desde Dieciseisavos de Final hasta la Gran Final y el partido por el Tercer Puesto, con bloqueo granular de rondas controladas por el administrador.
- **🎯 Sistema de Bonificaciones Estratégicas:** Pronósticos de alto valor añadido (Campeón del Mundo, Subcampeón, Goleador del Torneo y Selecciones Revelación/Decepción).
- **🛡️ Panel de Administración en Vivo:** Módulo exclusivo con privilegios para actualizar los resultados oficiales (`official_results`), auditar tablas, habilitar importaciones masivas y ejecutar cierres de ronda programados.
- **📊 Exportación y Reportes Empresariales:** Integración con **SheetJS** para la generación de reportes analíticos consolidados en libros de Excel (`.xlsx`) con múltiples pestañas y exportación de comprobantes en PDF.
- **🎮 Módulo de Gamificación 3D:** Experiencia complementaria interactiva integrada en el subdirectorio `/game/` construida con herramientas de renderizado tridimensional.

---

## 🔬 Decisiones de Diseño Técnico

### ¿Por qué Vanilla JS en lugar de React / Angular?
En plataformas de apuestas o quinielas en vivo, el usuario interactúa simultáneamente con decenas de *inputs* numéricos en tablas densas. El uso de Virtual DOM en listas gigantescas suele introducir latencia de renderizado en dispositivos móviles de gama media. Al operar directamente con manipulaciones nativas del DOM e event delegation, la aplicación logra un tiempo de respuesta instántaneo (<16ms por frame).

### Infraestructura Serverless con Supabase
El uso de **Supabase** elimina la necesidad de mantener un servidor backend dedicado 24/7. Las reglas de negocio críticas, los permisos de escritura y las rutinas de registro se ejecutan de forma segura a nivel del motor de base de datos (`PostgreSQL Triggers` y `RLS`) y microservicios sin servidor (**Deno Edge Functions**).
