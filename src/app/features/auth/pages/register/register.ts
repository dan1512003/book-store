import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}
@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  constructor(private router: Router) {}
showPassword = false;
showConfirmPassword = false;

  fullNameError = false;
  emailError = false;
  phoneError = false;
  passwordError = false;
  confirmPasswordError = false;
  agreementError = false;


  registerData: RegisterRequest = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreement: false
  };
passwordHasMinLength = false;
passwordHasUppercase = false;
passwordHasLowercase = false;
passwordHasNumber = false;
passwordValid = false;

hasPassError(): boolean {
  const passwordInvalid =
    !this.passwordHasMinLength ||
    !this.passwordHasUppercase ||
    !this.passwordHasLowercase ||
    !this.passwordHasNumber;

  return passwordInvalid;
}

checkPassword(password: string): void {

  
  if (password.trim() === '') {
    this.passwordValid = false;

 

    return;
  }


  this.passwordHasMinLength = password.length >= 8;
  this.passwordHasUppercase = /[A-Z]/.test(password);
  this.passwordHasLowercase = /[a-z]/.test(password);
  this.passwordHasNumber = /[0-9]/.test(password);


  const allValid =
    this.passwordHasMinLength &&
    this.passwordHasUppercase &&
    this.passwordHasLowercase &&
    this.passwordHasNumber;


  this.passwordValid = !allValid;
}




    register(): void {

    this.resetErrors();

    const fullName = this.registerData.fullName.trim();
    const email = this.registerData.email.trim();
    const phone = this.registerData.phone.trim();
    const password = this.registerData.password;
    const confirmPassword = this.registerData.confirmPassword;


    if (!fullName) {
      this.fullNameError = true;
    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.emailError = true;
    }


    const phoneRegex =
      /^(0|\+84)[0-9]{9,10}$/;

    if (!phoneRegex.test(phone)) {
      this.phoneError = true;
    }


    if (this.hasPassError()) {
      this.passwordError = true;
    }


    if (password !== confirmPassword) {
      this.confirmPasswordError = true;
    }

    if (!this.registerData.agreement) {
      this.agreementError = true;
    }

 
    if (
      this.fullNameError ||
      this.emailError ||
      this.phoneError ||
      this.passwordError ||
      this.confirmPasswordError ||
      this.agreementError||
      this.hasPassError()
    ) {
         this.registerData = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreement: false
    };
      return;
    }

 
    console.log('Đăng ký thành công');

    console.log(this.registerData);

  
    this.registerData = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreement: false
    };

    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  resetErrors(): void {
    this.fullNameError = false;
    this.emailError = false;
    this.phoneError = false;
    this.passwordError = false;
    this.confirmPasswordError = false;
    this.agreementError = false;
     this.passwordValid=false;
  }

togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

  goToLogin() {
  
    this.router.navigate(['/login']);
  }
}

