import { Component, computed, WritableSignal, signal, effect} from '@angular/core';
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

  constructor(){
    effect(() => {console.log('Utilisateur courant : ', this.username())});
    effect(() => {console.log ('nombre de student : ', this.students().length)});
    effect(() => {console.log ('derniere suppression : ', this.lastDelete()?.firstname)});
  }

  students: WritableSignal<Student[]> = signal([
    new Student(1,"Rayan", "Tournay","DaMS",4, new Date(2022,11,1)),
    new Student(2,"Nayarr", "Luffy","DaMS",3, new Date()),
    new Student(3,"kaka", "koko","DaMS",5, new Date())
  ]);

  showForm = signal(false);

  studentCount = computed(() => this.students().length);

  lastDelete : WritableSignal<Student|null> = signal(null);


  toggleForm(): void {
    this.showForm.update(show => !show);
  }

  addStudent(student: Student){
    this.students.update(list => [...list, student]);
    this.showForm.set(false);
  }
  
  onDelete(student : Student){
    this.lastDelete.set(student);
    this.students.update(list => list.filter(s => s.id !== student.id));
  }

  username = signal('Alice')

  changeUsername() : void{
    this.username.update(value => 'Bob');
  }

}
