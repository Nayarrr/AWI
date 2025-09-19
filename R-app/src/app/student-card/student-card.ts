import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Student } from '../student/student';

@Component({
  selector: 'app-student-card',
  standalone : true,
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './student-card.html',
  styleUrl: './student-card.scss'
})

export class StudentCard {
  student = input<Student>()
  remove = output<Student>()
}
