import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';


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
togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

  goToLogin() {
  
    this.router.navigate(['/']);
  }
}
