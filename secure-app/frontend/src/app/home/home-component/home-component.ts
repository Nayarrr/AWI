import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent {
  authSvs = inject(AuthService)
  currentUser = this.authSvs.currentUser()
}
