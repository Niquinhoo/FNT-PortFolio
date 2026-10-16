# Portfolio de Facundo Nicolás Triberti

Portfolio personal construido con React y Vite. Incluye cinco proyectos destacados y ocho proyectos personales y académicos, con fichas de detalle y vistas para escritorio y móvil.

## Actualización del 16 de octubre de 2026

Se agregaron tres proyectos a partir de sus repositorios públicos:

- [Pediloo](https://github.com/Niquinhoo/Final-Web1-React): tienda online y panel administrativo con React, TypeScript, Express y SQLite.
- [Facturador ARCA](https://github.com/Niquinhoo/facturador-ARCA): bot de Telegram en Python para emitir Factura C y generar PDF con QR.
- [Patrones de Diseño](https://github.com/Niquinhoo/tp1-patrones-diseno): ejemplos de Singleton, Observer y Strategy en Java, con UML y comprobaciones integradas.

Cada ficha nueva incluye una portada tipográfica local y un enlace al código. Las portadas son ilustraciones del proyecto, no capturas de sus aplicaciones. Se conserva la animación de los cinco proyectos destacados y el contador se calcula a partir del catálogo completo.

También se agregaron **EnergyCell** y **Osadía**, cada uno con tarjeta propia, dos capturas reales de su sitio público y un enlace para visitarlo. EnergyCell muestra el inicio y el seguimiento de reparaciones; Osadía, el inicio y el sistema de trabajo. Osadía conserva además sus imágenes anteriores dentro del caso LaunchUI.

## Ejecutar localmente

Requiere Node.js 22.12 o posterior.

```sh
npm ci
npm run dev
```

Abrir la dirección que muestra Vite con la ruta `/FNT-PortFolio/`.

## Comprobar cambios

```sh
node --test tests/projects.test.js
npm run build
npm run lint
```

Las pruebas comprueban identificadores únicos y el contenido, las portadas y los enlaces de los tres proyectos agregados. El lint del repositorio original tiene 11 errores previos; esta actualización no agrega errores de lint.

Los datos están en `src/data/projectsData.js` y las portadas en `public/projects/`. El workflow existente publica en GitHub Pages al hacer push a `master`.
