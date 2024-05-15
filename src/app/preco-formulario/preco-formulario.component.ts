import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ChurrascometroService } from '../shared/services/churrascometro.service';
import pt from '@angular/common/locales/pt'
@Component({
  selector: 'app-preco-formulario',
  standalone: true,
  imports: [],
  providers: [
    {provide: LOCALE_ID, useValue: pt}
  ],
  templateUrl: './preco-formulario.component.html',
  styleUrl: './preco-formulario.component.scss'
})
export class PrecoFormularioComponent implements OnInit {

  precoSelecionado: number | undefined

  constructor(private churrascometroService: ChurrascometroService) {

  }

  ngOnInit(): void {

    this.churrascometroService.getPrecoCarnesByName('picanha').subscribe(dados => {
      console.log(dados)
      this.precoSelecionado = dados
    })

  }




}
