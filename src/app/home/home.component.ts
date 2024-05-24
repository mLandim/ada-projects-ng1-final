import { Component } from '@angular/core';
import { PrecoFormularioComponent } from '../preco-formulario/preco-formulario.component';
import { MatButtonModule} from '@angular/material/button'
import { ScrollService } from '../shared/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, PrecoFormularioComponent],
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

}
