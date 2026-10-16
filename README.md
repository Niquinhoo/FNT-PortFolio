# Portfolio de Facundo Nicolás Triberti

Portfolio personal construido con React y Vite. Incluye siete proyectos principales y tres proyectos de juegos y herramientas, con fichas de detalle y vistas para escritorio y móvil.

## Proyectos

Citax es el proyecto insignia: ocupa el centro de la animación de escritorio y encabeza la línea de tiempo móvil. Lo acompañan Courtix, CalmaVM, EnergyCell, Osadía, WillItRain y LaunchUI.

EnergyCell y Osadía incluyen dos capturas reales de sus sitios públicos y un enlace para visitarlos. EnergyCell muestra el inicio y el seguimiento de reparaciones; Osadía, el inicio y el sistema de trabajo.

Los proyectos secundarios son SplitIt, HPoker y VMImpostor. El contador se calcula a partir del catálogo completo.

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

Las pruebas comprueban identificadores únicos, la ubicación de los proyectos principales y la existencia de todas las imágenes y videos del catálogo. El lint del repositorio original tiene 11 errores previos.

Los datos están en `src/data/projectsData.js` y las capturas en `public/projects/`. El workflow existente publica en GitHub Pages al hacer push a `master`.
