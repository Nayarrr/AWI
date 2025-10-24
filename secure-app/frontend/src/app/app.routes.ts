import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { AdminComponent } from './admin/admin-component/admin-component';
import { authGuard } from './auth/auth-guard';
import { adminGuard } from './admin/admin-guard';

export const routes: Routes = [
    { path : '', redirectTo : '/Login', pathMatch : 'full'}, //pathMatch ne revoit que si l'URL est exactement comme decrite c'est a dire sans rien derriere. Sinon boucle infinie car chaque URL commence techniquement par une chaine vide
    { path : 'Login', component : LoginComponent, title : 'Login'},
    { path : 'Admin', component : AdminComponent, title : 'Admin', canActivate : [authGuard,adminGuard]}
];
