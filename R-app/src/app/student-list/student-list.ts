import { Component, input } from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import {Student} from '../student/student'

@Component({
  selector: 'app-student-list',
  imports: [StudentCard],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList {
  student1 = new Student("Rayan", "Tournay","DaMS",4, new Date(2022,9,9))
  student2 = new Student("Nayarr", "Luffy","DaMS",3, new Date())
  student3 = new Student("kaka", "koko","DaMS",5, new Date())
}
