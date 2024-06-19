import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const serviceLogin = inject(LoginService)
  const router = inject(Router)
  if (serviceLogin.isLoggedIn()) {
    return true
  }
  router.navigate(['/login'])
  return false;
};
