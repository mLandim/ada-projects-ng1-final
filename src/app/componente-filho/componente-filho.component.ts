import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-componente-filho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componente-filho.component.html',
  styleUrl: './componente-filho.component.scss'
})
export class ComponenteFilhoComponent {
  @Input() dados:any
  @Output() novoValor = new EventEmitter<string>()

  emitirValorParaoPai() {
    this.novoValor.emit()
  }
}
