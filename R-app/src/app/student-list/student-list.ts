import { Component, computed, WritableSignal, signal, effect, inject } from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import { Formulaire } from '../formulaire/formulaire';
import { StudentListService } from '../service/studentlist/student-list-service';
import { StudentDto } from '../types/student-dto';
import { LoggingService } from '../service/logging/logging-service';
import { LogViewer } from '../log-viewer/log-viewer';
import { toSignal} from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-student-list',
  imports: [StudentCard, Formulaire, LogViewer],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList {

  svs = inject(StudentListService);

  ls = inject(LoggingService);

  students = this.svs.students;

  showForm = signal(false);

  editing = signal<StudentDto | null>(null);

  studentCount = computed(() => this.students().length);

  toggleForm(): void {
    this.showForm.update(show => !show);
  }

  startEdit(id: number): void {
    const s = this.svs.findByID(id);
    this.editing.set(s ? { ...s } : null);
    this.showForm.set(true);
  }

  addStudent(student: Omit<StudentDto, 'id'>){
    this.svs.add(student);
    this.ls.log(`Student added: ${student.firstname} ${student.name}`, 'StudentList');
    this.showForm.set(false);
  }

  applyUpdatedStudent(updated: StudentDto){
    if (updated.id == null) {
      this.ls.log('Il a pas de id', 'StudentList');
      return;
    }
    this.svs.update(updated);
    this.ls.log(`Student mis a jour: ${updated.firstname} ${updated.name}`, 'StudentList');
    this.editing.set(null);
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
}
