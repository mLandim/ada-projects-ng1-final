import { Component, Input } from '@angular/core';
import { ProdutoFormularioComponent } from '../../shared/components/produto-formulario/produto-formulario.component';

@Component({
  selector: 'app-criacao-produto',
  standalone: true,
  imports: [ProdutoFormularioComponent],
  templateUrl: './criacao-produto.component.html',
  styleUrl: './criacao-produto.component.scss'
})
export class CriacaoProdutoComponent {
  
  paramId!: string;
  paramProduto!: string;
  
  @Input() set id(id: string) {
    this.paramId = id;
  }
  @Input() set produto(produto: string) {
    this.paramProduto = produto;
  }

}
