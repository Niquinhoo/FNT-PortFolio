import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { featuredProjects, sideProjects } from '../src/data/projectsData.js';

test('todos los proyectos tienen un identificador único', () => {
  const projects = [...featuredProjects, ...sideProjects];
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
});

test('EnergyCell y Osadía tienen tarjeta propia, dos capturas y enlace al sitio', () => {
  for (const [title, liveUrl] of [
    ['EnergyCell', 'https://energycell-front.nicotrib699.workers.dev/'],
    ['Osadía', 'https://osadia-landing.vercel.app/'],
  ]) {
    const project = sideProjects.find(item => item.title.startsWith(`${title} | `));
    assert.ok(project, title);
    assert.equal(project.liveUrl, liveUrl);
    assert.equal(project.gallery.length, 2);
    assert.equal(new Set(project.gallery).size, 2);
    assert.equal(project.desktopImg, project.gallery[0]);
    for (const image of project.gallery) {
      assert.ok(existsSync(new URL(`../public/${image}`, import.meta.url)), image);
    }
  }
});

test('los proyectos nuevos tienen contenido, portada local y repositorio público', () => {
  const repositories = ['Final-Web1-React', 'facturador-ARCA', 'tp1-patrones-diseno'];
  for (const repository of repositories) {
    const project = sideProjects.find(item => item.sourceUrl === `https://github.com/Niquinhoo/${repository}`);
    assert.ok(project, repository);
    assert.ok(project.title && project.description && project.problemSolved);
    assert.ok(project.tags.length > 0);
    for (const image of [project.desktopImg, project.mobileImg]) {
      assert.ok(existsSync(new URL(`../public/${image}`, import.meta.url)), image);
    }
  }
});
