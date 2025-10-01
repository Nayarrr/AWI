import { Component, input, output, effect } from '@angular/core';
import { StudentDto } from '../types/student-dto';  
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { UsernameValidator } from '../validators/username-validator';

@Component({
  selector: 'app-formulaire',
  standalone : true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.scss'
})

export class Formulaire {
  readonly form = new FormGroup({
    firstname : new FormControl<string >('', {nonNullable : true, 
      validators : [Validators.required, Validators.minLength(2), UsernameValidator.cannotContainSpace]}),
    name : new FormControl<string>('', {nonNullable : true,
      validators : [Validators.required, Validators.minLength(2), UsernameValidator.cannotContainSpace]}, ),
    filiere : new FormControl<string>('', {nonNullable : true,
      validators : [Validators.required, Validators.minLength(2)]}),
    promo : new FormControl<number>(0, {nonNullable : true, 
      validators : [Validators.required, Validators.maxLength(2)]}),
    date : new FormControl<string>('', {nonNullable : true,}),
  })

  student = input<StudentDto | null>();
  newStudent = output<Omit<StudentDto, 'id'>>()
  editStudent = output<StudentDto>()
  cancel = output<void>()

  constructor(){
    effect(() => {
      const s = this.student();
      if (s) {
        this.form.patchValue({
          firstname: s.firstname,
          name: s.name,
          filiere: s.filiere,
          promo: s.promo,
          date: s.date instanceof Date ? s.date.toISOString().slice(0,10) : String(s.date)
        });
      } else {
        this.form.reset({ firstname: '', name: '', filiere: '', promo: 0, date: '' });
      }
    })
  }

  onSubmit(event : Event) : void{
    event.preventDefault(); 

    const payload : Omit<StudentDto, 'id'> = {
      firstname : this.form.value.firstname as string,
      name : this.form.value.name as string,
      filiere : this.form.value.filiere as string,
      promo : this.form.value.promo as number,
      date: new Date(this.form.value.date as string),
    }

    const current = this.student();
    if (current) {
      this.editStudent.emit({ ...current, ...payload });
    } else {
      this.newStudent.emit(payload);
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.form.reset({ firstname: '', name: '', filiere: '', promo: 0, date: '' });
  }
}
