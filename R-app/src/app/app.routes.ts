import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { StudentList } from './student-list/student-list';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { Counter } from './counter/counter';
import { StudentCard } from './student-card/student-card';
import { authGuard } from './guards/authGuard';
import { ForbiddenComponent } from './forbidden-component/forbidden-component';

export const routes: Routes = [
    { path: '', component : HomeComponent, title : 'La Maison'}, 
    { path : 'StudentList', component : StudentList, title : 'Liste des étudiants' },
    { path : 'Counter', component : Counter, title : 'Ca compte !', canActivate : [authGuard]},
    { path : 'Student/:id', component : StudentCard, title : 'Détails'},
    { path : 'forbidden', component : ForbiddenComponent, title : 'Forbidden'},

    { path : '**', component : NotFoundComponent}
];
