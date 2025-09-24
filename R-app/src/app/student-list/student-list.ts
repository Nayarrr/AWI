import { Component, computed, WritableSignal, signal, effect, inject} from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import { Formulaire } from '../formulaire/formulaire';
import { StudentListService } from '../service/studentlist/student-list-service';
import { StudentDto } from '../student-dto';

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

  svs = inject(StudentListService);

  students = this.svs.students;

  showForm = signal(false);

  studentCount = computed(() => this.students.length);

  lastDelete : WritableSignal<StudentDto|null> = signal(null);


  toggleForm(): void {
    this.showForm.update(show => !show);
  }

  addStudent(student: Omit<StudentDto, 'id'>){
    this.svs.add(student);
  }
  
  onDelete(id : number){
    this.svs.remove(id);
  }

  username = signal('Alice')

  changeUsername() : void{
    this.username.update(value => 'Bob');
  }

}
