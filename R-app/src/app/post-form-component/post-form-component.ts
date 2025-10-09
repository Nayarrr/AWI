import { Component, output} from '@angular/core';
import { PostDTO } from '../types/post-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form-component',
  standalone : true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-form-component.html',
  styleUrl: './post-form-component.scss'
})

export class PostFormComponent {

  newP = output<PostDTO>()
  cancel = output<void>()

  readonly form= new FormGroup({
    userId : new FormControl<number>(0, {nonNullable : true}),
    id : new FormControl<number | undefined>(0, {nonNullable : true}),
    title : new FormControl<string>('', {nonNullable : true}),
    body : new FormControl<string>('', {nonNullable : true})
  })

  onSubmit(event : Event) : void{
    event.preventDefault()

    const newPost : PostDTO = {
      userId : this.form.value.userId as number,
      id : this.form.value.id as number,
      title : this.form.value.title as string,
      body : this.form.value.body as string,
    }
    this.newP.emit(newPost)
  }

  onCancel(): void {
    this.cancel.emit();
    this.form.reset({ userId: 0, id: 0, title: '', body: '' });
  }
  
}
