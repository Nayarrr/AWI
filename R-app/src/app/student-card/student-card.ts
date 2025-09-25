import { Component, input, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StudentDto } from '../types/student-dto';

@Component({
  selector: 'app-student-card',
  standalone : true,
  imports: [DatePipe, UpperCasePipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './student-card.html',
  styleUrl: './student-card.scss'
})

export class StudentCard {
  student = input<StudentDto>()
  remove = output<number>()
}
