import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (c) => c.HomeComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    children: [
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
    ],
  },
  {
    path: 'user',
    children: [
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
    ],
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (c) => c.ForbiddenComponent,
      ),
  },
];
