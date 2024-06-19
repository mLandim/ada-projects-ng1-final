import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user!: string //= 'letscode'
  password!: string // = 'lets@123'

  constructor(private loginService: LoginService, private router: Router) {}

  login(): void {
    this.loginService.login(this.user, this.password).subscribe(data => {
      console.log(data)
      this.router.navigate(['/home'])
    })
  }

}
