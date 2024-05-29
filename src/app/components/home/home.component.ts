import { Component } from '@angular/core';
import { CriacaoChurrascoComponent } from '../../pages/criacao-churrasco/criacao-churrasco.component';
import { MatButtonModule} from '@angular/material/button'
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, CriacaoChurrascoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  welcomeMessage = "Olá! Bem-vindo ao Churrascômetro!"

  constructor(private scrollService: ScrollService) {

  }

  scrollToSection(id: string): void {
    this.scrollService.scrollToSection(id)
  }

  navigate() {
    
  }

}
