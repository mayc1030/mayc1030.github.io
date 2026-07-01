---
title: "Cómo construir un Sistema de Reservas SPA con Vanilla JS y Supabase"
date: 2026-07-01
excerpt: "Estudio de caso sobre la arquitectura detrás de Los Angeles Barber: agendamiento en tiempo real, cálculo de disponibilidad y separación de interfaces sin frameworks."
categories: [Desarrollo Web, Arquitectura]
tags: [vanillajs, supabase, postgresql, glassmorphism, spa]
image: ""
emoji: "💈"
---

El desarrollo de sistemas de agendamiento en tiempo real (*Booking Systems*) presenta desafíos técnicos fascinantes. Cuando un cliente intenta reservar una cita en un salón de alta demanda, el sistema debe ser capaz de calcular al instante las franjas horarias libres basándose en la duración del servicio, los horarios del profesional y las citas preexistentes, todo sin permitir reservas duplicadas ni condiciones de carrera (*race conditions*).

En el proyecto **[Los Angeles Barber](https://github.com/losangelesbarberco/losangelesbarber)**, resolvimos este problema prescindiendo por completo de frameworks de UI pesados o soluciones SaaS de pago, apostando por una arquitectura limpia y rápida basada en **Vanilla JavaScript y Supabase**.

---

## 🏛️ El Principio de Separación de Responsabilidades (SoC) en SPAs

Uno de los mayores errores al construir aplicaciones con panel de cliente y panel administrativo es mezclar toda la lógica en un único gran paquete JavaScript. Esto ralentiza la experiencia pública de agendamiento y expone innecesariamente código de gestión.

Para **Los Angeles Barber**, se diseñaron dos núcleos independientes:
- **`booking.js` (~31 KB):** Un motor ligero centrado exclusivamente en guiar al cliente a través de un *Wizard* de 5 pasos (Servicio → Barbero → Fecha/Hora → Contacto → Confirmación).
- **`admin.js` (~63 KB):** Un dashboard completo en tiempo real para los administradores que maneja la gestión de personal, horarios laborales y auditoría de citas.

Al separar los motores, la vista del cliente carga de forma instantánea, logrando conversiones en dispositivos móviles en cuestión de segundos.

---

## ⏱️ Cálculo Algorítmico de Franjas Horarias (*Smart Slots*)

Para determinar los horarios disponibles de un barbero en un día específico sin saturar el servidor, la aplicación ejecuta el siguiente flujo eficiente:
1. Consulta la jornada laboral asignada al barbero en Supabase (ej. 9:00 AM a 7:00 PM).
2. Obtiene las citas ya confirmadas para ese día y profesional mediante una consulta SQL indexada.
3. El motor en cliente segmenta el día en bloques según la duración del servicio seleccionado (ej. 45 minutos para *Corte + Barba*) y filtra automáticamente cualquier bloque que colisione con una cita existente.

Gracias a la concurrencia y transaccionalidad de **PostgreSQL en Supabase**, garantizamos la integridad relacional del calendario sin requerir servidores intermedios de Node.js o Python.

---

## 🎨 Diseño Estético Premium: Glassmorphism y CSS3

Una plataforma para un salón de belleza premium debe reflejar elegancia desde la interfaz web. Utilizando custom properties en CSS (`:root`), implementamos un diseño basado en **Glassmorphism** —superficies oscuras translúcidas con desenfoque de fondo y bordes iluminados— que eleva la percepción de calidad de la marca frente a plantillas genéricas.

Puedes explorar los detalles técnicos y acceder a la demostración en vivo en la sección de [Proyectos](/proyectos/03-los-angeles-barber/).
