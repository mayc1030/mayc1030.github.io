---
title: "Los Angeles Barber (Barbería Elegance)"
description: "Plataforma web SPA de reservas en tiempo real y gestión empresarial para barberías premium. Construida con Vanilla JS, Supabase (PostgreSQL) y diseño Glassmorphism."
emoji: "💈"
featured: false
order: 3
tech: ["Vanilla JS", "Supabase", "PostgreSQL", "Jekyll", "CSS3 Glassmorphism"]
url_demo: "https://losangelesbarberco.github.io/losangelesbarber"
---

## 💈 Resumen Ejecutivo

**Los Angeles Barber (Barbería Elegance)** es una solución web integral orientada a la digitalización completa del flujo de reservas y gestión operativa para barberías y salones de estética de alta gama. 

Diseñada bajo el patrón de **Single-Page Application (SPA)** de latencia ultrabaja, elimina los cuellos de botella de los sistemas de agendamiento tradicionales al combinar un **Wizard interactivo de 5 pasos** en **Vanilla JavaScript** con un backend transaccional en tiempo real sobre **Supabase (PostgreSQL)** y hosting estático en **GitHub Pages / Jekyll**.

---

## 🏗️ Arquitectura y Separación de Responsabilidades (SoC)

Para garantizar la máxima velocidad de carga para el cliente final y un aislamiento estricto de la lógica administrativa, la plataforma modulariza su código en dos motores JS independientes y especializados:

```
                  ┌─── booking.js (31 KB)  → Portal de Clientes (Wizard 5 Pasos)
[ index.html ] ───┤
 (Shell SPA)      └─── admin.js (63 KB)    → Dashboard Administrativo en Vivo
                          │
                          ▼
            [ Supabase: PostgreSQL + RLS ]
```

### 1. Portal de Clientes (`booking.js` - ~31 KB)
Especializado exclusivamente en la conversión y agilidad del usuario. No carga librerías pesadas ni dependencias innecesarias, logrando un *First Contentful Paint (FCP)* prácticamente instantáneo en dispositivos móviles en redes 3G/4G.

### 2. Portal de Gestión y Administración (`admin.js` - ~63 KB)
Módulo aislado que se encarga del CRUD empresarial completo. Permite a los administradores y barberos controlar el negocio sin afectar el peso ni la seguridad de la interfaz pública de reservas.

---

## ⚡ Funcionalidades Clave y Experiencia de Usuario

### 📅 Motor de Reservas Inteligente (Wizard de 5 Pasos)
El proceso de agendamiento está estructurado como una experiencia fluida sin recargas de página:
1. **Selección de Servicio:** Catálogo dinámico con descripción, costo y duración de cada servicio (corte clásico, perfilado de barba, tratamientos premium).
2. **Elección de Profesional:** Listado de barberos disponibles con sus especialidades.
3. **Cálculo de Franjas Horarias (*Smart Slots*):** Consulta en tiempo real a Supabase para verificar los turnos ya ocupados y mostrar únicamente los bloques de tiempo libres, evitando empalmes o *double-booking*.
4. **Datos de Contacto:** Registro validado del cliente (nombre, teléfono y correo electrónico).
5. **Confirmación Inmediata:** Creación atómica de la cita en PostgreSQL e integración de confirmación directa.

### 🛡️ Dashboard Administrativo Pro
- **Gestión de Agenda en Tiempo Real:** Visualización y filtrado de citas por día, semana o barbero específico con actualización automática (*Realtime Subscriptions*).
- **Control de Catálogo y Precios:** Creación, edición o desactivación de servicios en caliente.
- **Configuración Horaria por Barbero:** Definición de turnos laborales, descansos y días libres para cada miembro del equipo.

### 💎 Diseño Estético Premium (*Glassmorphism*)
- Implementación de tarjetas translúcidas con desenfoque de fondo (`card-glass`) y bordes sutiles que transmiten exclusividad y elegancy.
- Integración vectorial optimizada con **Lucide Icons** e interfaces 100% responsivas para smartphones y pantallas de escritorio.

---

## 🔬 Decisiones Técnicas

### ¿Por qué evitar plataformas de agendamiento genéricas (SaaS)?
Las soluciones genéricas como Calendly o Booksy imponen altas comisiones mensuales, plantillas rígidas y tiempos de carga lentos debido a la inyección de iframes. Al construir una solución *custom* en **Vanilla JS + Supabase**, el negocio retiene el control total de sus datos, personaliza su marca al 100% y opera con un costo de infraestructura cercano a cero gracias al modelo *serverless*.
