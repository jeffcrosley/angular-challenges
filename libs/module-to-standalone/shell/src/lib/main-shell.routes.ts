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
  // {
  //   path: 'user',
  //   loadChildren: () =>
  //     import('@angular-challenges/module-to-standalone/user/shell').then(
  //       (m) => m.UserShellModule,
  //     ),
  // },

  // {
  //   path: 'forbidden',
  //   loadChildren: () =>
  //     import('@angular-challenges/module-to-standalone/forbidden').then(
  //       (m) => m.ForbiddenModule,
  //     ),
  // },
];
