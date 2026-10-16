import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { featuredProjects, sideProjects } from '../src/data/projectsData.js';

test('todos los proyectos tienen un identificador único', () => {
  const projects = [...featuredProjects, ...sideProjects];
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
});

test('EnergyCell y Osadía son proyectos principales con capturas y enlace al sitio', () => {
  for (const [title, liveUrl] of [
    ['EnergyCell', 'https://energycell-front.nicotrib699.workers.dev/'],
    ['Osadía', 'https://osadia-landing.vercel.app/'],
  ]) {
    const project = featuredProjects.find(item => item.title.startsWith(`${title} | `));
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

test('el catálogo conserva siete principales, tres secundarios y todos sus recursos', () => {
  assert.equal(featuredProjects.length, 7);
  assert.deepEqual(sideProjects.map(project => project.id), [6, 7, 8]);
  for (const project of [...featuredProjects, ...sideProjects]) {
    assert.ok(![9, 10, 11].includes(project.id));
    for (const image of [project.desktopImg, project.mobileImg, ...project.gallery]) {
      assert.ok(existsSync(new URL(`../public/${image}`, import.meta.url)), image);
    }
    if (project.previewVideo) {
      assert.ok(existsSync(new URL(`../public/${project.previewVideo}`, import.meta.url)));
    }
  }
});
