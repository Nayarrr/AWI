import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { inject } from '@angular/core';
import { elementAt } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authSvs = inject(AuthService)
  if(authSvs.isAdmin()){
    return true 
  }else{
    return false
  }
};
