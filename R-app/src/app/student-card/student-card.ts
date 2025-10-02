import { Component, computed, inject, input, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StudentDto } from '../types/student-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentListService } from '../service/studentlist/student-list-service';

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
  edit = output<number>()
  studentRoute = input<StudentDto | undefined>(undefined)  

  router = inject(Router);
  route = inject(ActivatedRoute);
  svs = inject(StudentListService);

  studentAffiché = computed<StudentDto | undefined>(() => { //Stock l'étudiant récuperé depuis l'id de la route, on charge l'etudiant depuis le service et on le conserve ici
    return this.student() ?? this.studentRoute();
  });

  isDetail = computed(() => !this.student?.() && !!this.studentRoute()); //mode détail permet d'agrandir l'affichage et afficher au centre. En bref passer en mode détail sur la route 

  constructor(){
    this.route.paramMap.subscribe(pm => {
      const raw = pm.get('id');
      this.studentRoute.set(raw ? this.svs.findByID(Number(raw)) : undefined);
    }
  }
  showDetails() {

    if (id != null) {
      this.router.navigate(['/Student', id]);
    }
  }
}
