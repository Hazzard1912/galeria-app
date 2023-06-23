import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isUserLoggedInGuard } from './pages/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'usuario',
    canActivate: [isUserLoggedInGuard],
    loadComponent: () =>
      import('./pages/user/user.component').then((m) => m.UserComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
