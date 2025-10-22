import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { UserDto } from '../../types/user-dto';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  authSvs = inject(AuthService)
  router = inject(Router)
  isLoading = this.authSvs.isLoading
  error = this.authSvs.error

  readonly form = new FormGroup({
    username : new FormControl<string>('', {nonNullable : true, validators : [Validators.required, Validators.minLength(2)]}),
    password : new FormControl<string>('', {nonNullable : true, validators : [Validators.required,  Validators.minLength(3)]})
  })
  
  onSubmit() : void{
    const user : Omit<UserDto, 'id' | 'email' | 'role'> = {
      username : this.form.value.username as string,
      password : this.form.value.password as string,
    }
    this.authSvs.login(user.username, user.password)
  }
} 

