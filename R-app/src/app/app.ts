import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloStudent } from './hello-student/hello-student';
import { StudentCard } from './student-card/student-card';
import { CurrencyPipe, DatePipe} from '@angular/common';
import { StudentList } from './student-list/student-list';
import { Counter } from './counter/counter';
import { Formulaire } from './formulaire/formulaire';


@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, HelloStudent, StudentCard, CurrencyPipe, DatePipe, StudentList, Counter,Formulaire],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('R-app');
}
