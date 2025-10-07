import { Component } from '@angular/core';
import { PostDTO } from '../types/post-dto';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { signal } from '@angular/core'

@Component({
  selector: 'app-post-form-component',
  imports: [],
  templateUrl: './post-form-component.html',
  styleUrl: './post-form-component.scss'
})

export class PostFormComponent {
  readonly form = new FormGroup({
    userId : new FormControl<number>(0, {nonNullable : true}),
    id : new FormControl<number | undefined>(0, {nonNullable : true}),
    title : new FormControl<string>('', {nonNullable : true}),
    body : new FormControl<string>('', {nonNullable : true})
  })

  posts = signal<PostDTO[]>([])
  
}
