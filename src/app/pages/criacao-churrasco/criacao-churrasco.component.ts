import { Component, OnInit } from '@angular/core';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {MatStepperModule} from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

interface ItemInfo {
  [itemKey: string]: {
    nome: string,
    preco: number, 
    consumoMedioAdulto: number, 
    consumoMedioCrianca?: number
  }
}

interface ItemOpcao {
  key: string,
  value: string
}

interface Resumo {
  adultos: number,
  criancas: number,
  carnes: {item: string, consumoMedio: number, valorTotal: number}[],
  bebidas:  {item: string, consumoMedio: number, valorTotal: number}[]
}

@Component({
  selector: 'app-criacao-churrasco',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatStepperModule],
  templateUrl: './criacao-churrasco.component.html',
  styleUrl: './criacao-churrasco.component.scss'
})
export class CriacaoChurrascoComponent implements OnInit {

  nome: string = ""

  formPessoas!: FormGroup
  formCarnes!: FormGroup
  formBebidas!: FormGroup

  carnesShow: ItemInfo = {} 
  bebidasShow: ItemInfo = {} 
  carnesOpcoes: ItemOpcao[] = []
  bebidasOpcoes: ItemOpcao[] = []

  
  exibirLoading = false
  exibirResultados = false
  formErrorMessage: string | undefined = undefined

  resumo: Resumo = {
    adultos: 0,
    criancas: 0,
    carnes: [],
    bebidas: []
  }

  constructor(private churrascometroService: ChurrascometroService, private formBuilder: FormBuilder) {
    
    this.formPessoas = this.formBuilder.group({
      adultos: new FormControl(0, [Validators.required, Validators.min(1)]),
      criancas: new FormControl(0, [Validators.min(0)])
    })
    this.formCarnes = this.formBuilder.group({})
    this.formBebidas = this.formBuilder.group({})
    

  }

  ngOnInit(): void {

    this.inicializarService()
  }

  inicializarService(): void {
    
    this.churrascometroService.getCarnes().pipe(
      map(carnes => {
        carnes.forEach(carne => {
          
          this.carnesShow[carne.id] = {
            nome: carne.nome,
            preco: carne.preco_kg,
            consumoMedioAdulto: carne.consumo_medio_adulto_g,
            consumoMedioCrianca: carne.consumo_medio_crianca_g
          }
          this.carnesOpcoes.push({key: carne.id, value: carne.nome[0].toUpperCase() + carne.nome.slice(1)})
          this.formCarnes.addControl(carne.id, new FormControl(null))
        })
      })
    ).subscribe()

    this.churrascometroService.getBebidas().pipe(
      map(bebidas => {
        bebidas.forEach(bebida => {
          this.bebidasShow[bebida.id] = {
            nome: bebida.nome,
            preco: bebida.preco_unidade,
            consumoMedioAdulto: bebida.consumo_medio_adulto_ml,
            // Caso seja possível controlar o retorno da API: O ideal é disponibilizar um campo de controle para bebidas proibidas para menores
            // Sendo impossível fazer isso, uma alternativa seria criar uma lista de nomes de bebidas proibidas e checar aqui também
            // Algo como:
            // private bebidasProibidas = ['cerveja', 'whisky', ...]
            // ...
            // consumoMedioCrianca: this.bebidasProibidas.includes(bebida.nome) ? undefined :bebida.consumo_medio_crianca_ml
            consumoMedioCrianca: bebida.proibido_menores ? undefined :bebida.consumo_medio_crianca_ml
          }
          this.bebidasOpcoes.push({key: bebida.id, value: bebida.nome[0].toUpperCase() + bebida.nome.slice(1)})
          this.formBebidas.addControl(bebida.id, new FormControl(null))
        })
      })
    ).subscribe()

  }

  get carnesValidationDisable(): boolean {
    return !Object.values(this.formCarnes.value).includes(true)
  }

  get bebidasValidationDisable(): boolean {
    return !Object.values(this.formBebidas.value).includes(true)
  }

  get carnessTotal(): number {
    return this.resumo.carnes.reduce((total, carne) => carne.valorTotal + total, 0)
  }

  get bebidasTotal(): number {
    return this.resumo.bebidas.reduce((total, bebida) => bebida.valorTotal + total, 0)
  }



  submit(): void {

    try {

      if (this.formPessoas.valid && this.formCarnes.valid && this.formBebidas.valid) {
      
        this.exibirLoading = true
        this.exibirResultados = false
        const formPessoasValues = this.formPessoas.value
        const formCarnesValues = this.formCarnes.value
        const formBebidasValues = this.formBebidas.value
  
        const adultos = formPessoasValues.adultos
        const criancas = formPessoasValues.criancas
  
        
  
        this.resumo.adultos = adultos
        this.resumo.criancas = criancas
        
        this.resumo.carnes = []
        for (const key in formCarnesValues) {
          const resposta = formCarnesValues[key];
          if (resposta) {
            let carneItem = this.carnesShow[key]
            let consumo = adultos * carneItem.consumoMedioAdulto + criancas * (carneItem.consumoMedioCrianca ?? 0)
            let valorTotal = consumo / 1000 * carneItem.preco
            this.resumo.carnes.push({item: carneItem.nome, consumoMedio: consumo, valorTotal })
          }
        }
        this.resumo.bebidas = []
        for (const key in formBebidasValues) {
          const resposta = formBebidasValues[key];
          if (resposta) {
            let bebidaItem = this.bebidasShow[key]
            let consumo = adultos * bebidaItem.consumoMedioAdulto + criancas * (bebidaItem.consumoMedioCrianca ?? 0)
            let valorTotal = consumo / 1000 * bebidaItem.preco
            this.resumo.bebidas.push({item: bebidaItem.nome, consumoMedio: consumo, valorTotal })
          }
        }
        
        
  
        // Simular Tempo de processamento
        setTimeout(() => {
          this.exibirLoading = false
          this.exibirResultados = true
        }, 2000)
  
  
      }

    } catch (error) {
      this.formErrorMessage = `${error}`
    }
    
   
  }


}
