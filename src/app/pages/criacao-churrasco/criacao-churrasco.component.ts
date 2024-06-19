import { Component, OnInit } from '@angular/core';

import { PrecoFormularioComponent } from '../../shared/components/preco-formulario/preco-formulario.component';
import { ScrollService } from '../../shared/services/scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-criacao-churrasco',
  standalone: true,
  imports: [PrecoFormularioComponent, MatProgressSpinnerModule],
  templateUrl: './criacao-churrasco.component.html',
  styleUrl: './criacao-churrasco.component.scss'
})
export class CriacaoChurrascoComponent implements OnInit {

  condition: boolean = true;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {

  }


  scrollToSection(id: string): void {
    this.scrollService.scrollToSection(id)
  }


}
