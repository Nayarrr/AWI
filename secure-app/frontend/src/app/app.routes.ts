import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { AdminComponent } from './admin/admin-component/admin-component';
import { authGuard } from './auth/auth-guard';
import { adminGuard } from './admin/admin-guard';
import { HomeComponent } from './home/home-component/home-component';

export const routes: Routes = [
    { path : 'login', component : LoginComponent, title : 'Login'},
    { path : 'home', component : HomeComponent, title : 'Home', canActivate : [authGuard]},
    { path : 'admin', component : AdminComponent, title : 'Admin', canActivate : [authGuard,adminGuard]},
    { path : '', redirectTo : 'home', pathMatch : 'full'}, //pathMatch ne renvoit que si l'URL est exactement comme decrite c'est a dire sans rien derriere. Sinon boucle infinie car chaque URL commence techniquement par une chaine vide
    

    { path : '**', redirectTo : 'home'}
];
