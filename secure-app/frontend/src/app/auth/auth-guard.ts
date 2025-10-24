import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authsvs = inject(AuthService)
  if (authsvs.isLoggedIn()){
    return true
  } else {
    return false
  }
};