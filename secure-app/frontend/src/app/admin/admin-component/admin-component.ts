import { Component, effect, inject } from '@angular/core'
import { UserService } from '../../users/user-service'

@Component({
  selector: 'app-admin-component',
  imports: [],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss'
})
export class AdminComponent {
  private readonly userService = inject(UserService);
  readonly users = this.userService.users;
  // Charge la liste à l’arrivée sur la page
  constructor() {
    effect(() => this.userService.loadAll())
  }
}
