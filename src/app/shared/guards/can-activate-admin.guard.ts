import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const canActivateAdminGuard: CanActivateFn = (route, state) => {
  const serviceLogin = inject(LoginService)

  if (serviceLogin.isAdmin()) {
    return true
  }
  
  return false;
};
