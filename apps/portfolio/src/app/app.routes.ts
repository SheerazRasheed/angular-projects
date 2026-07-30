import { Home } from './home/home';
import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';

export const appRoutes: Route[] = [
  {
    path: 'slider',
    loadChildren: () =>
      loadRemote<typeof import('slider/Routes')>('slider/Routes').then(
        (m) => m!.remoteRoutes,
      ),
  },
  {
    path: '',
    component: Home,
  },
];
