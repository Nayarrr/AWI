import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { PostDTO } from '../types/post-dto';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-post-list-component',
  imports: [JsonPipe],
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss'
})
export class PostListComponent {
  readonly http = inject(HttpClient)
  // readonly data$ = this.http.get<PostDTO>('https://jsonplaceholder.typicode.com/posts')
  // haha = toSignal(this.data$)
  // TOUT CE QUI EST EN COMMENTAIRE LA ACTUELLEMENT C'EST LE GET PAS LE POST 
  // readonly posts = httpResource<PostDTO[]>(() => ({url : 'https://jsonplaceholder.typicode.com/posts'}))

  postsAPI = toSignal(this.http.get<PostDTO>('https://jsonplaceholder.typicode.com/posts'))

  pNews = signal<PostDTO[]>([])

  posts = computed(() => {
    const plist = this.postsAPI() ?? []
    return [...plist, ...this.pNews()]
  })
  
  private readonly _posts = signal<PostDTO[]>([
    {userId : 1, id : 1, title : 'lalala', body : 'papapapapapapapa'}
  ])

  addPost(post : PostDTO) : void{
    this.http.post<PostDTO>('https://jsonplaceholder.typicode.com/posts', post).subscribe(newPost => {this.pNews.update(arr => [...arr , newPost])})
  }
}
