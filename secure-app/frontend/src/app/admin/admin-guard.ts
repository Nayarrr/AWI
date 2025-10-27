import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authSvs = inject(AuthService)
  const router = inject(Router)
  if(authSvs.isAdmin()){
    return true 
  }else{
    router.navigate(['/home'])
    return false
  }
};
