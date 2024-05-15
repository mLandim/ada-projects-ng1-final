import { Component } from '@angular/core';
import { ComponenteFilhoComponent } from '../componente-filho/componente-filho.component'

@Component({
  selector: 'app-componente-pai',
  standalone: true,
  imports: [ComponenteFilhoComponent],
  templateUrl: './componente-pai.component.html',
  styleUrl: './componente-pai.component.scss'
})
export class ComponentePaiComponent {

  dadosPai = {
    nome: 'Nome do Pai',
    idade: 39,
    cidade: 'Qualquer'
  }
  mensagem: string = "Eu sou o componente Pai"

  recebeValor($event: string):void {
    this.mensagem = $event
  }
}
