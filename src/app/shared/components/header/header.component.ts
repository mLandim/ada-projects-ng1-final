import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: string = 'letscode'
  password: string = 'lets@123'

  constructor(private loginService: LoginService, private router: Router) {

  }
  ngOnInit(): void {
   
  }

  login(): void {
    this.loginService.login(this.user, this.password).subscribe(data => console.log(data))
  }

  logout(): void {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logout().subscribe(
        {
          next: _ => {
            this.router.navigate(['/home'])
          },
          error: err => console.error(err)
        }
        
      )
    } 
  }

  get loggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

}
