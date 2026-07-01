---
title: "Penalty Strike 2026 (3D Web Game)"
description: "Videojuego web 3D de tanda de penaltis con física de balística realista, control táctil por gestos y audio 100% sintetizado. Desarrollado con Vite, TypeScript, Three.js y Rapier."
emoji: "🎮"
featured: true
order: 2
tech: ["TypeScript", "Three.js", "Rapier 3D", "Vite", "GSAP", "Web Audio API"]
---

## 🎮 Resumen Ejecutivo

**Penalty Strike 2026** es un videojuego web 3D de penaltis con calidad profesional, optimizado para ejecutarse con máxima fluidez tanto en dispositivos móviles (mediante control táctil por gestos) como en navegadores de escritorio.

Desarrollado desde cero con **Vite + TypeScript en modo estricto**, el proyecto prescinde de motores pesados como Unity o Unreal para ejecutarse de forma nativa en el navegador aprovechando la aceleración de hardware con **Three.js r170**, simulación física determinista en WebAssembly mediante **Rapier 3D** y animaciones cinemáticas con **GSAP**.

---

## 🏗️ Arquitectura de Alto Rendimiento y Separación de Responsabilidades (SoC)

El diseño del motor sigue una estricta modularidad orientada a maximizar los FPS (cuadros por segundo) y minimizar los tiempos de carga iniciales:

```
[ index.html (Portada DOM/CSS 2 kB) ] ──(Clic 'Iniciar')──► [ import('./boot') ]
                                                                 │
      ┌─────────────────────────────────┬────────────────────────┴───┐
      ▼                                 ▼                            ▼
[ Three.js r170 ]             [ Rapier 3D (WASM) ]          [ Web Audio API ]
 (Render WebGL/GPU)            (Balística & Magnus)          (Sonido Sintetizado)
```

### ⚡ 1. Arranque Diferido (*Ultra-Light Lazy Booting*)
El punto de entrada inicial (`main.ts`) pesa apenas **~2 kB** y muestra de forma instantánea la portada HTML/CSS nativa ("INICIAR JUEGO") sin descargar el motor 3D ni los assets. Únicamente cuando el jugador interactúa, se importa el bundle pesado (`boot.ts`) en un *chunk* dinámico de Vite. Al salir al menú, el sistema limpia la memoria WebGL y WASM por completo para prevenir fugas de memoria (*memory leaks*).

### 🎵 2. Audio 100% Sintetizado Proceduralmente
A diferencia de los juegos web convencionales que descargan megabytes de archivos `.mp3` o `.wav`, **Penalty Strike 2026 genera todos sus efectos de sonido en tiempo real** utilizando la **Web Audio API**. El silbato del árbitro, el impacto del guayo contra el cuero, el rugido de la grada y los golpes en el poste se sintetizan mediante osciladores y filtros matemáticos, reduciendo la huella de red prácticamente a cero.

---

## ⚽ Balística Avanzada e Inteligencia Artificial

### 🎯 Motor Balístico y Control por Swipe
El sistema de disparo convierte los gestos táctiles (*swipes*) en vectores de fuerza 3D dentro del mundo físico de **Rapier**:
- **Efecto Magnus y Resistencia Aerodinámica:** El balón responde a la rotación angular impartida por el trazo del dedo, permitiendo cobrar tiros con efecto (rosca) pronunciado para esquivar la barrera o engañar al portero.
- **Detección de Subfases en Tiempo Real:** El orquestador monitorea el cruce de la línea de gol frame a frame para resolver rebotes en travesaños y postes con precisión milimétrica.

### 🧤 IA del Portero (`KeeperBrain`) & Animación Procedural
- **Matriz de Análisis de Patrones:** El portero rival no actúa de manera aleatoria; mantiene una rejilla 3×3 en memoria que analiza el historial de disparos del jugador para anticipar sus zonas predilectas en rondas de muerte súbita.
- **Cinemática sobre Huesos (*Procedural Rigging*):** El disparo del jugador y las estiradas del portero aplican transformaciones procedurales directamente sobre las cadenas de huesos (*Armatures*) en el espacio 3D coordinadas con **GSAP**, combinándose con clips de captura de movimiento sin distorsionar las mallas.

---

## 🔬 Aseguramiento de Calidad: QA Headless y Automatización

Para garantizar un rendimiento estable en todos los climas del juego (Noche, Lluvia, Viento, Nublado) sin requerir test manual repetitivo, el proyecto integra una suite de **QA E2E automatizada en Node.js + Puppeteer**:
- Simulación de partidos completos de 5 rondas en **Google Chrome Headless** emulando gestos táctiles sintéticos en tiempo real (`test-gameplay.mjs`).
- Hooks de inspección en vivo (`window.__qa`) que auditan las rotaciones óseas, posición del balón y transiciones de la máquina de estados de Zustand/Store.
