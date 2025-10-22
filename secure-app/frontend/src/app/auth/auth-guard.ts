import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authsvs = inject(AuthService)
  if (authsvs.isLoggedIn()){
    return true
  } else {
    return false
  }
};