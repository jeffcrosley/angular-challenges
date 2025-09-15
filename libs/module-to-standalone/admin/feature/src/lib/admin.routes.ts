import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (c) => c.DashboardComponent,
      ),
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (c) => c.CreateUserComponent,
      ),
  },
];
