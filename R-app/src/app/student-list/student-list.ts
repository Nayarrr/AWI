import { Component, input } from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import {Student} from '../student/student'
import { Formulaire } from '../formulaire/formulaire';

@Component({
  selector: 'app-student-list',
  imports: [StudentCard, Formulaire],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList {

  students : Student[] = [new Student(1,"Rayan", "Tournay","DaMS",4, new Date(2022,11,1)), 
                          new Student(2,"Nayarr", "Luffy","DaMS",3, new Date()),
                          new Student(3,"kaka", "koko","DaMS",5, new Date())
                        ]

  showForm : boolean = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addStudent(student: Student){
    this.students = [...this.students, student];
    this.showForm = false;
  }
  
  onDelete(id : number | null ){
    this.students= this.students.filter(s => s.id !== id)
  }
}
