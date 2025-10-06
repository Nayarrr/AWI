import { inject } from "@angular/core";
import { CanActivateFn, Router} from "@angular/router";

export const authGuard : CanActivateFn = () =>{
    const router = inject(Router)
    const allowed = Math.random() > 0.5
    if (allowed){
        return true
    }
    else{
        return router.createUrlTree(['/forbidden'])
    }
}