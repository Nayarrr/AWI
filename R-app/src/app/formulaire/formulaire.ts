import { Component, output } from '@angular/core';
import { StudentDto } from '../types/student-dto';  
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
 

@Component({
  selector: 'app-formulaire',
  standalone : true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.scss'
})

export class Formulaire {
  readonly form = new FormGroup({
    firstname : new FormControl<string >('', {nonNullable : true}),
    name : new FormControl<string>('', {nonNullable : true}),
    filiere : new FormControl<string>('', {nonNullable : true}),
    promo : new FormControl<number>(0, {nonNullable : true}),
    date : new FormControl<string>('', {nonNullable : true}),
  })

  newStudent = output<Omit<StudentDto, 'id'>>()

  onSubmit(event : Event) : void{
    event.preventDefault(); 

    const student : Omit<StudentDto, 'id'> = {
      firstname : this.form.value.firstname as string,
      name : this.form.value.name as string,
      filiere : this.form.value.filiere as string,
      promo : this.form.value.promo as number,
      date: new Date(this.form.value.date as string),
    }
    
    this.newStudent.emit(student);
  }
}
