import { Component, output } from '@angular/core';
import { StudentDto } from '../student-dto';  


@Component({
  selector: 'app-formulaire',
  standalone : true,
  imports: [],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.scss'
})

export class Formulaire {
  newStudent = output<Omit<StudentDto, 'id'>>();

  onSubmit(event : Event) : void{
    event.preventDefault(); //Empêche le rechargement de la page

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const newStudent: Omit<StudentDto, 'id'> = {
      firstname: (formData.get('firstname') as string),
      name: (formData.get('name') as string),
      filiere: (formData.get('filiere') as string),
      promo: Number(formData.get('promo')),
      date: new Date((formData.get('date') as string))
    };

    this.newStudent.emit(newStudent);
  }
}
