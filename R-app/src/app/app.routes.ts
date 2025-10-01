import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { StudentList } from './student-list/student-list';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { Counter } from './counter/counter';
import { StudentCard } from './student-card/student-card';

export const routes: Routes = [
    { path: '', component : HomeComponent}, 
    { path : 'StudentList', component : StudentList},
    { path : 'Counter', component : Counter},
    { path : 'student/:id', component : StudentCard},

    { path : '**', component : NotFoundComponent}
];
