import { Component } from '@angular/core';
import { CriacaoChurrascoComponent } from '../../pages/criacao-churrasco/criacao-churrasco.component';
import { MatButtonModule} from '@angular/material/button'
import { ScrollService } from '../../shared/services/scroll.service';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CriacaoChurrascoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  welcomeMessage = "Olá! Bem-vindo ao Churrascômetro!"

  constructor(private scrollService: ScrollService, private router: Router, private loginService: LoginService) {

  }

  scrollToSection(id: string): void {
    this.scrollService.scrollToSection(id)
  }

  navigate(path: string) {
    this.router.navigate([path])
  }

  isAdmin(): boolean {
    return this.loginService.isAdmin()
  }

}
