import { Component, output } from '@angular/core';
import {Student } from '../student/student';


@Component({
  selector: 'app-formulaire',
  imports: [],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.scss'
})
export class Formulaire {
  newStudent = output<Student>();
  
  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }

  
}
