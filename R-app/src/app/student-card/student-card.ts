import { Component, computed, inject, input, output} from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StudentDto } from '../types/student-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentListService } from '../service/studentlist/student-list-service';
import { map, filter } from 'rxjs';
import { toSignal} from '@angular/core/rxjs-interop';


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

  studentAffiche = computed<StudentDto | undefined>(() => {

    const fromInput = this.student?.(); //input direct depuis un parent (StudentList)
    if (fromInput){
      return fromInput
    };

    const fromRouteInput = this.studentRoute?.(); // input depuis la route
    if (fromRouteInput !== undefined) {
      return fromRouteInput
    };

    const id = this.routeID(); //lire id depuis la route et chercher dans le service
    if (id != null) {
      return this.svs.findByID(id) ?? undefined;
    }
    return undefined; //student pas trouvé
  });

  isDetail = computed(() => !this.student?.() && !!this.studentAffiche()); //mode détail permet d'agrandir l'affichage et afficher au centre. En bref passer en mode détail sur la route 

  private id$ = this.route.paramMap.pipe( 
    map(params => params.get('id')), 
    filter((id) : id is string => id !== null),
    map(id => Number(id))
  )
  public routeID = toSignal(this.id$, {initialValue : null})

  showDetails() {
    const s = this.studentAffiche();
    const id = s?.id;
    if (id != null) {
      this.router.navigate(['Student', id]);
    }
  }
}
