import { Component, computed, WritableSignal, signal} from '@angular/core';
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

  students: WritableSignal<Student[]> = signal([
    new Student(1,"Rayan", "Tournay","DaMS",4, new Date(2022,11,1)),
    new Student(2,"Nayarr", "Luffy","DaMS",3, new Date()),
    new Student(3,"kaka", "koko","DaMS",5, new Date())
  ]);

  showForm = signal(false);

  studentCount = computed(() => this.students().length);


  toggleForm(): void {
    this.showForm.update(show => !show);
  }

  addStudent(student: Student){
    this.students.update(list => [...list, student]);
    this.showForm.set(false);
  }
  
  onDelete(id : number | null ){
    this.students.update(list => list.filter(s => s.id !== id));
  }
}
