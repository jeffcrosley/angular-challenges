import { adminRoutes } from '@angular-challenges/module-to-standalone/admin/feature';
import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { userRoutes } from '@angular-challenges/module-to-standalone/user/shell';
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
    children: adminRoutes,
  },
  {
    path: 'user',
    children: userRoutes,
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (c) => c.ForbiddenComponent,
      ),
  },
];
