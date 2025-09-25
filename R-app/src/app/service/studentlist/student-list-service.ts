import { Injectable, signal } from '@angular/core';
import { StudentDto } from '../../types/student-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  private readonly _students = signal<StudentDto[]>([ //Private afin d'eviter de faire s= [] et readonly afin d'eviter que les fonctions mutable puissent modifier (par ex : s.set([]))
    {id : 1, firstname : 'Rayan', name :  'Tournay', filiere:'DaMS',promo : 4, date : new Date(2022,11,1)},
    {id : 2, firstname : 'Nayarr', name :  'Luffy', filiere:'DaMS',promo : 4, date : new Date()},
    {id : 3, firstname : 'kiki', name :  'kaka', filiere:'DaMS',promo : 3, date : new Date(2025,9,2)},
  ]) 

  nextID = this._students().length + 1;

  readonly students = this._students.asReadonly()

  add(student : Omit<StudentDto, 'id'>) : void {
    this._students.update(list => [...list, {...student, id : this.nextID}])
  }

  remove(id : number): void {
    this._students.update(list => list.filter(s => s.id !== id))
  }

  removeAll() : void{
    this._students.set([])
  }

  findByID(id : number): StudentDto | undefined{
    return this._students().find(s => s.id===id)
  }

}
