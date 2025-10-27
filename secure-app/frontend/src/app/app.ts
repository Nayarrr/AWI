import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './auth/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Jaaaaa');
  readonly authService = inject(AuthService)
  readonly router = inject(Router)

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
