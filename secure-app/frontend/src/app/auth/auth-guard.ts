import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authsvs = inject(AuthService)
  const router = inject(Router)
  if (authsvs.isLoggedIn()){
    return true
  } else {
    router.navigate(['/login'])
    return false
  }
};