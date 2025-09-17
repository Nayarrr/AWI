import { Component, output } from '@angular/core';
import { Student } from '../student/student';


@Component({
  selector: 'app-formulaire',
  standalone : true,
  imports: [],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.scss'
})

export class Formulaire {
  newStudent = output<Student>();
  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }

  onSubmit(event : Event) : void{
    event.preventDefault(); //Empêche le rechargement de la page

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const student =  new Student(
      this.generateId(),
      formData.get('firstname') as string,
      formData.get('name') as string,
      formData.get('filiere') as string,
      Number(formData.get('promo')),
      new Date(formData.get('date') as string));

    this.newStudent.emit(student);
  }
}
