import { Injectable, inject, signal } from '@angular/core';
import { UserDto } from '../types/user-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient)
  private readonly _users = signal<UserDto[]>([])

  nextID = this._users().length + 1

  readonly users = this._users.asReadonly()

  add(user: Omit<UserDto, 'id'>): void {
    this.http.post<UserDto>(`${environment.apiUrl}/users`, user).pipe(
      tap(newUser => this._users.update(list => [...list, newUser])),
      catchError(err => {
        console.error('❌ Erreur ajout:', err);
        return of(null); // Renvoie null pour indiquer l'échec
      })
    ).subscribe();
  }

  remove(id: number): void {
    this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      tap(() => this._users.update(list => list.filter(u => u.id !== id))),
      catchError(err => {
        console.error('❌ Erreur suppression:', err);
        return of(null);
      })
    ).subscribe();
  }

  findByID(id : number): UserDto | undefined {
    return this._users().find(u => u.id === id)
  }

  loadAll(): void {
    this.http.get<UserDto[]>(`${environment.apiUrl}/users`).pipe(
      tap(users => this._users.set(users)),
      catchError(err => {
        console.error(' Erreur chargement utilisateurs:', err);
        return of([]); // Renvoie un tableau vide → _users.set([])
      })
    ).subscribe();
  }


}
