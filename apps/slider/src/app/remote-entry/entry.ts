import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider';
import { ProjectSlide } from '../project-slide.model';

const PROJECTS: ProjectSlide[] = [
  {
    title: 'Realtime Order Dashboard',
    description:
      'A live operations dashboard streaming order and inventory events to warehouse staff, cutting fulfillment errors by 30%.',
    imageUrl: 'https://picsum.photos/seed/order-dashboard/960/540',
    link: 'https://example.com/projects/order-dashboard',
    tags: ['Angular', 'RxJS', 'WebSockets'],
  },
  {
    title: 'Microfrontend Design System',
    description:
      'A shared component library federated across five product teams, deployed independently of any single app.',
    imageUrl: 'https://picsum.photos/seed/design-system/960/540',
    link: 'https://example.com/projects/design-system',
    tags: ['Module Federation', 'Nx', 'Storybook'],
  },
  {
    title: 'Trail Route Planner',
    description:
      'A map-based route planner for hikers with offline caching and elevation profiles, built as a PWA.',
    imageUrl: 'https://picsum.photos/seed/trail-planner/960/540',
    link: 'https://example.com/projects/trail-planner',
    tags: ['PWA', 'Mapbox', 'IndexedDB'],
  },
];

@Component({
  imports: [SliderComponent],
  selector: 'app-slider-entry',
  template: `<app-slider [slides]="projects" label="Featured projects" />`,
})
export class RemoteEntry {
  protected readonly projects = PROJECTS;
}
