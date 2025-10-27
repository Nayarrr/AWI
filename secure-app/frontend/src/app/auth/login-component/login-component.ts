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
    login : new FormControl<string>('', {nonNullable : true, validators : [Validators.required, Validators.minLength(2)]}),
    password : new FormControl<string>('', {nonNullable : true, validators : [Validators.required,  Validators.minLength(3)]})
  })
  
  async onSubmit(){
    const user : Omit<UserDto, 'id' | 'email' | 'role'> = {
      login : this.form.value.login as string,
      password : this.form.value.password as string,
    }
    await this.authSvs.login(user.login, user.password)
    if (this.authSvs.isLoggedIn()){
      this.router.navigate(['/home'])
    }
  }
} 

