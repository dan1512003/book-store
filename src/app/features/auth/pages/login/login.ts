import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface LoginRequest {
  email: string;
  password: string;
}

@Component({
  imports: [CommonModule,FormsModule],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  
    constructor(private router: Router) {}
showPassword = false;

  emailError = false;
  passwordError = false;
 
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  private readonly testUser: LoginRequest = {
    email: 'test@gmail.com',
    password: '12345678'
  };
  
login(): void {
  this.resetErrors();

  const email = this.loginData.email.trim();
  const password = this.loginData.password;

  if (email !== this.testUser.email) {
    this.emailError = true;
  }

  if (password !== this.testUser.password) {
    this.passwordError = true;
  }

  if (this.emailError || this.passwordError) {
  //     this.loginData.email = '';
  // this.loginData.password = '';
    return;
  }

  console.log('Đăng nhập thành công');


  this.loginData.email = '';
  this.loginData.password = '';

  this.showPassword = false;
}



   resetErrors(): void {
    this.emailError = false;
    this.passwordError = false;
  }
togglePassword() {
  this.showPassword = !this.showPassword;
}
goToRegister() {
  
    this.router.navigate(['/register']);
  }  
}
