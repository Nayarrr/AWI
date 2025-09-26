import { Component, computed, WritableSignal, signal, effect, inject} from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import { Formulaire } from '../formulaire/formulaire';
import { StudentListService } from '../service/studentlist/student-list-service';
import { StudentDto } from '../types/student-dto';
import { LoggingService } from '../service/logging/logging-service';

@Component({
  selector: 'app-student-list',
  imports: [StudentCard, Formulaire],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList {

  svs = inject(StudentListService);

  ls = inject(LoggingService);

  students = this.svs.students;

  showForm = signal(false);

  studentCount = computed(() => this.students().length);

  toggleForm(): void {
    this.showForm.update(show => !show);
  }

  addStudent(student: Omit<StudentDto, 'id'>){
    this.svs.add(student);
    this.ls.log(`Student added: ${student.firstname} ${student.name}`, 'StudentList');
    this.showForm.set(false);
    
  }
  
  onDelete(id : number){
    this.svs.remove(id);
    this.ls.log(`Id du student supprimé : ${id}`, 'StudentList');
  }

  deleteAll(){
    this.svs.removeAll();
    this.ls.log('Et la sentance est irrévocable !', 'StudentList');
  }

  updateStudent(id : number){
    this.svs.update(id);
    this.ls.log(`ID du student modifié : ${id}`, 'StudentList');

  }
}
