import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isUserLoggedInGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const auth = inject(AuthService);
  if (!token) {
    auth.redirectToLogin();
    return false;
  }
  return auth.validateToken(token).pipe(map(respuesta => {
    console.log(respuesta);
    if (respuesta === "Token valido") {
      return true;
    } else {
      auth.redirectToLogin();
      return false;
    }
  }));
};
