---
title: "Planificador Diario & Gestor de Tareas Pro"
description: "Aplicación web SPA de productividad empresarial con analíticas en vivo (Chart.js), exportación multinivel en Excel/JSON y reportes corporativos en PDF."
emoji: "📅"
featured: false
order: 4
tech: ["Vanilla JS", "Bootstrap 5", "Chart.js", "SheetJS (Excel)", "jsPDF", "Obfuscator CI"]
---

## 📅 Resumen Ejecutivo

**Planificador Diario & Gestor de Tareas Pro** es una solución web Single-Page Application (SPA) avanzada concebida para la gestión integral del tiempo, auditoría de productividad y organización operativa por bloques horarios.

Diseñada con foco en la autonomía y la seguridad de los datos, la herramienta combina una interfaz reactiva en **Vanilla JavaScript y Bootstrap 5** con potentes motores de generación documental en cliente (**jsPDF**, **SheetJS**) y un pipeline propio de minificación y ofuscación de código en **Node.js**.

---

## 🏗️ Arquitectura de la Aplicación y Separación de Responsabilidades (SoC)

La plataforma opera completamente en el navegador bajo una arquitectura de cero latencia, separando la capa visual de los motores de exportación y el almacenamiento persistente:

```
                  ┌── Chart.js ───────────► Visualización Analítica (Día / Semana)
[ SPA Vanilla JS ]┼── SheetJS (xlsx) ─────► Exportación/Importación de Libros Excel
                  ├── jsPDF + AutoTable ──► Generación de Reportes PDF Corporativos
                  └── LocalStorage Engine ► Persistencia Inmediata sin Servidor
```

### ⚡ 1. Persistencia Local e Interoperabilidad Total
Eliminando la dependencia de servidores externos o bases de datos lentas, el sistema estructura el almacenamiento en el navegador (`localStorage`) permitiendo operaciones CRUD instantáneas sobre tareas, subtareas y proyectos. Además, cuenta con un módulo de **Backup Maestro** que importa y exporta el estado global en formatos estándar (`JSON` y `.xlsx`), garantizando la portabilidad de la información.

### 📊 2. Motor Analítico en Tiempo Real (`Chart.js`)
El planificador audita de forma automática el tiempo invertido en cada actividad para alimentar dos paneles estadísticos renderizados sobre `<canvas>`:
- **Resumen Diario:** Gráficos de distribución proporcional por proyecto con asignación de color personalizada.
- **Resumen Semanal:** Evolución del rendimiento y comparativa de carga laboral a lo largo de los días de la semana.

---

## 📑 Reportes Corporativos e Integración Documental

### 📄 Generador de Reportes PDF (`jsPDF + AutoTable`)
A diferencia de simples impresiones de pantalla (`window.print`), la aplicación integra un motor que construye reportes formales paginados orientados a clientes o gerencia:
- **Personalización de Marca:** Configuración de cabeceras, colores corporativos, nombre, rol y correo del profesional.
- **Soporte Dual de Logos:** Inyección de logotipos empresariales (izquierdo y derecho) procesados en Base64 para incrustación vectorial inmutable en el PDF final.

### 📈 Exportación Multinivel en Excel (`SheetJS`)
Permite descargar reportes granulares adaptados a contabilidad y auditorías de proyectos:
- Exportación selectiva del **día actual**.
- Consolidado de la **semana completa**.
- Descarga total del historial en libros de Excel estructurados y formateados.

---

## 🛡️ Pipeline de Construcción y Protección de Seguridad (`build-obfuscate.js`)

Para proteger la propiedad intelectual de la lógica empresarial y permitir la distribución en un único archivo ejecutable autónomo (`planificador.html`), el proyecto implementa una cadena de construcción automatizada en **Node.js**:

1. **Extracción y Minificación (`JSDOM` + `Terser`):** Un script CLI procesa el DOM, extrae la lógica y aplica 3 pasadas de compresión agresiva eliminando código muerto y consolas de depuración.
2. **Ofuscación de Alto Nivel (`javascript-obfuscator`):** Se aplica aplanamiento de flujo de control (*Control Flow Flattening*), inyección de trampas anti-depuración y transformación de identificadores a formato hexadecimal/Base64.
3. **Encapsulamiento Autodesplegable (`wrap-body-base64.js`):** Empaqueta la interfaz y la lógica en un *payload* Base64 inmutable que se autodescomprime de manera segura al abrirse en cualquier navegador web moderno sin requerir conexión a internet.
