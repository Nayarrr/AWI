import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { AdminComponent } from './admin/admin-component/admin-component';
import { authGuard } from './auth/auth-guard';
import { adminGuard } from './admin/admin-guard';

export const routes: Routes = [
    { path : '', redirectTo : '/login', pathMatch : 'full'}, //pathMatch ne renvoit que si l'URL est exactement comme decrite c'est a dire sans rien derriere. Sinon boucle infinie car chaque URL commence techniquement par une chaine vide
    { path : 'login', component : LoginComponent, title : 'Login'},
    { path : 'admin', component : AdminComponent, title : 'Admin', canActivate : [authGuard,adminGuard]}
];
