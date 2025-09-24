import { Injectable, signal } from '@angular/core';
import {Student} from '../student/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  private readonly _students = signal<Student[]>([
    {id : 1, firstname : 'Rayan', name :  'Tournay', filiere:'DaMS',promo : 4, date : new Date(2022,11,1)},
    {id : 2, firstname : 'Nayarr', name :  'Luffy', filiere:'DaMS',promo : 4, date : new Date()},
    {id : 1, firstname : 'kiki', name :  'kaka', filiere:'DaMS',promo : 3, date : new Date(2025,9,2)},
  ])

  readonly students = this._students.asReadonly()

  add(student : Student) : void {
    this._students.update(list => [...list, student])
  }

  remove(id : number): void {
    this._students.update(list => list.filter(s => s.id !== id))
  }

  removeAll() : void{
    this._students.set([])
  }

  findByID(id : number): Student | undefined{
    return this._students().find(s => s.id===id)
  }
}
