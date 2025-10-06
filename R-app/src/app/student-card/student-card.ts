import { Component, computed, inject, input, output} from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StudentDto } from '../types/student-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentListService } from '../service/studentlist/student-list-service';
import { LoggingService } from '../service/logging/logging-service';
import { map, filter } from 'rxjs';
import { toSignal} from '@angular/core/rxjs-interop'

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

  isDetail = computed(() => this.student?.() && this.studentRoute()); //mode détail permet d'agrandir l'affichage et afficher au centre. En bref passer en mode détail sur la route 

  // constructor(){
  //   effect(() => { this.})
  // }

  private id$ = this.route.paramMap.pipe( 
    map(params => params.get('id')), 
    filter((id) : id is string => id !== null),
    map(id => Number(id))
  )
  public routeID = toSignal(this.id$, {initialValue : null})
  showDetails() {
  }
}
