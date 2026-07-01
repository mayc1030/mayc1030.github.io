---
title: "Arquitectura Offline-First e Impresión Térmica ESC/POS por Bluetooth en Apps Móviles Híbridas"
date: 2026-07-01
excerpt: "Cómo construir un sistema POS móvil nativo para Android en React y Capacitor con sincronización en IndexedDB e impresión térmica sin drivers."
categories: [Desarrollo Móvil, Arquitectura]
tags: [react, capacitor, android, bluetooth, escpos, offlinefirst, supabase]
image: ""
emoji: "📱"
---

El desarrollo de aplicaciones comerciales móviles críticas, como un **Punto de Venta (POS) y Scanner de Inventario**, impone dos retos arquitectónicos que suelen romper las abstracciones web tradicionales: la **resiliencia ante caídas de internet** y la **comunicación a bajo nivel con periféricos de hardware** (impresoras térmicas e interfaces de escaneo).

En el desarrollo de **ORDUX POS & Scanner App**, abordamos estos desafíos combinando **React 18 + Vite** dentro de **Capacitor 6** para compilar una aplicación nativa de Android ultra rápida, segura y 100% funcional en modo desconectado.

---

## ⚡ Patrón Offline-First: Sincronización Asíncrona con IndexedDB y Supabase

Un vendedor en un almacén de retail o bodega no puede permitirse que una factura tarde 5 segundos en procesarse por culpa de un servidor lento. Por ello, invertimos el flujo de transacciones clásico:
1. **Lectura y Escritura Local Instantánea:** Al escanear un producto, la orden se guarda y deduce del stock local directamente en **IndexedDB** a través de `LocalForage` en menos de 10 milisegundos.
2. **Cola de Sincronización en Segundo Plano:** Un demonio asíncrono detecta la restauración de red y transmite los lotes de facturación hacia **Supabase (PostgreSQL)** en un hilo secundario sin interrumpir la experiencia de usuario.

---

## 🖨️ Impresión Térmica Directa (Protocolo ESC/POS Binario)

El ecosistema web de móviles carece de APIs estándar completas para enviar recibos a impresoras de tickets térmicos sin pasar por diálogos del sistema operativo. Para solucionarlo, implementamos un servicio dedicado (`printerService.js`):
- **Traducción de Documentos a Tramas Binarias ESC/POS:** En lugar de generar archivos PDF o imágenes, el código transforma el texto, tablas de productos y totales en secuencias de bytes ESC/POS nativas (por ejemplo, `0x1B 0x40` para inicializar impresora o `0x1D 0x56` para cortar el papel).
- **Comunicación Bluetooth LE y Sockets TCP:** Mediante `@capacitor-community/bluetooth-le` transmitimos los paquetes directamente por canales GATT a impresoras portátiles bluetooth, o enviamos tramas IP con `capacitor-tcp-socket` para impresoras fijas en red de 80 mm.

---

## 🛡️ Licenciamiento Hardware-Bound con Row-Level Security (RLS)

Para prevenir la clonación no autorizada de cuentas comerciales, la aplicación se vincula a la firma criptográfica del hardware (`device_id`). En el lado de **Supabase**, aplicamos políticas RLS estrictas: la aplicación móvil solo tiene privilegios para consultar su estado o actualizar el registro de última conexión (`last_seen_at`). Cualquier intento de manipular la fecha de caducidad o el plan contractual desde el cliente es rechazado de raíz por el motor PostgreSQL.

Puedes conocer todos los detalles de esta aplicación en nuestra sección de [Proyectos](/proyectos/06-ordux-pos-scanner/).
