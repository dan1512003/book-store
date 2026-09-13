import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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

togglePassword() {
  this.showPassword = !this.showPassword;
}
goToRegister() {
  
    this.router.navigate(['/register']);
  }  
}
