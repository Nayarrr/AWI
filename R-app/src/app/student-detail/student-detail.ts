import { Component, input, ChangeDetectionStrategy, inject } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { StudentListService } from '../service/studentlist/student-list-service';
import { StudentDto } from '../student-dto';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.scss'
})
export class StudentDetail {
  
  id = input<number | null>();

  private readonly svs = inject(StudentListService);

  get student(): StudentDto | undefined {
    const id = this.id();
    if (id == null) return undefined;
    return this.svs.findByID(id);
  }
}
