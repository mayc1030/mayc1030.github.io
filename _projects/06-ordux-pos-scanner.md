---
title: "ORDUX POS & Scanner App (Móvil Android Offline-First)"
description: "Sistema POS móvil e inventario con escaneo de código de barras, impresión térmica ESC/POS por Bluetooth/TCP y sincronización offline en Supabase."
emoji: "📱"
featured: true
order: 5
tech: ["React 18", "Capacitor 6", "Vite", "Supabase", "IndexedDB", "ESC/POS Bluetooth"]
---

## 📱 Resumen Ejecutivo

**ORDUX POS & Scanner App** es un ecosistema móvil de punto de venta (POS), control de inventario y facturación de grado empresarial empaquetado como aplicación nativa para Android mediante **Capacitor 6, React 18 y Vite**.

Concebida para entornos comerciales de alta exigencia (retail, almacenes y bodegas con conectividad intermitente), la aplicación opera bajo una filosofía **Offline-First**, permitiendo facturar, escanear productos e imprimir tickets térmicos en milisegundos sin depender de una conexión activa a internet.

---

## 🏗️ Arquitectura Offline-First y Separación de Responsabilidades (SoC)

La arquitectura de la aplicación aísla por completo la interfaz de usuario de las capas físicas de hardware (cámara e impresoras POS) y del motor de sincronización de datos:

```
[ Cámara Móvil / Scanner QR ] ──► [ React 18 + Vite UI ] ──► [ printerService.js ]
                                         │                            │
                                         ▼                            ▼
                            [ LocalForage / IndexedDB ]     [ Bluetooth LE / TCP Socket ]
                             (Transacciones Offline)        (Impresoras Térmicas ESC/POS)
                                         │
                                   (Sync Async)
                                         ▼
                            [ Supabase: PostgreSQL + RLS ]
```

### ⚡ 1. Motor de Persistencia Offline (`LocalForage` + IndexedDB)
Para evitar que una caída del internet detenga las ventas, el motor de datos local almacena el catálogo de productos, clientes y transacciones pendientes en **IndexedDB**. Al recuperar la conectividad, un trabajador en segundo plano sincroniza las órdenes de manera transaccional con la nube de **Supabase (PostgreSQL)**, resolviendo colisiones sin pérdida de información.

### 🛡️ 2. Licenciamiento Hardware-Bound y Seguridad RLS
El control de suscripciones no depende de simples contraseñas; se vincula al identificador de hardware único del terminal móvil (`device_id` mediante `@capacitor/device`). A través de políticas de seguridad en base de datos (**Row-Level Security**), el terminal solo tiene permiso para reportar su latido (*heartbeat*) de última conexión (`last_seen_at`), mientras que la modificación de planes o fechas de caducidad queda estrictamente restringida a un **Panel Administrativo Web independiente** (`admin-panel/`).

---

## 🖨️ Integración de Hardware e Impresión Térmica POS

### 🧾 Motor ESC/POS por Bluetooth LE y TCP Sockets (`printerService.js`)
Uno de los mayores logros técnicos del proyecto es prescindir de los lentos drivers de impresión del sistema operativo móvil para comunicarse directamente con el hardware:
- **Protocolo ESC/POS Binario:** Compilación en cliente de secuencias de bytes ESC/POS para formatear tablas, saltos de línea, negritas y códigos de barras en rollos térmicos de 58 mm y 80 mm.
- **Doble Conectividad:** Envío nativo por tramas **Bluetooth Low Energy (BLE)** (`@capacitor-community/bluetooth-le`) para impresoras portátiles de cintura o a través de **Sockets TCP IP directos** (`capacitor-tcp-socket`) para impresoras de red o cajones monederos en mostradores fijos.

### 📷 Escaneo Óptico de Alta Velocidad (`html5-qrcode` & Camera API)
Aprovechando la aceleración óptica nativa a través de `@capacitor/camera`, el módulo de escáner lee de forma instantánea códigos **EAN-13, UPC y QR**, añadiendo artículos al carrito de compras en una fracción de segundo con retroalimentación acústica y vibración háptica.
