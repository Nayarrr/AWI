import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../types/post';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-list-component',
  imports: [],
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss'
})
export class PostListComponent {
  readonly http = inject(HttpClient)
  readonly data$ = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1')
  haha = toSignal(this.data$)
}
