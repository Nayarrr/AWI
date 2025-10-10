import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostDTO } from '../types/post-dto';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { PostFormComponent } from '../post-form-component/post-form-component';

@Component({
  selector: 'app-post-list-component',
  imports: [JsonPipe, PostFormComponent],
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss'
})
export class PostListComponent {
  readonly http = inject(HttpClient)
  // readonly data$ = this.http.get<PostDTO>('https://jsonplaceholder.typicode.com/posts')
  // haha = toSignal(this.data$)
  // TOUT CE QUI EST EN COMMENTAIRE LA ACTUELLEMENT C'EST LE GET PAS LE POST 
  // readonly posts = httpResource<PostDTO[]>(() => ({url : 'https://jsonplaceholder.typicode.com/posts'}))

  showForm = signal(false);

  toggleForm(): void {
    this.showForm.update(show => !show);
  }

  postsAPI = toSignal(this.http.get<PostDTO[]>('https://jsonplaceholder.typicode.com/posts'), { initialValue: null })

  pNews = signal<PostDTO[]>([])

  posts = computed(() => {
    return [...this.postsAPI() ?? [], ...this.pNews()]
  })

  addPost(post : PostDTO) : void{
    this.http.post<PostDTO>('https://jsonplaceholder.typicode.com/posts', post).subscribe(newPost => {this.pNews.update(arr => [...arr , newPost])})
    this.showForm.set(false)
  }

  testAPI() : void{
    this.http.get('https://api/bad-url')
  }
}
