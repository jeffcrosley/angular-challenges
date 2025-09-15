import { Route } from '@angular/router';

export const userRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (c) => c.UserShellComponent,
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent() {
          return import(
            '@angular-challenges/module-to-standalone/user/home'
          ).then((c) => c.UserHomeComponent);
        },
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadComponent() {
              return import(
                '@angular-challenges/module-to-standalone/user/contact'
              ).then((c) => c.ContactDashboardComponent);
            },
          },
          {
            path: 'create-contact',
            loadComponent() {
              return import(
                '@angular-challenges/module-to-standalone/user/contact'
              ).then((c) => c.CreateContactComponent);
            },
          },
        ],
      },
    ],
  },
];
