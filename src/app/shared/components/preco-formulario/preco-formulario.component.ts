import { Component, OnInit, effect } from '@angular/core';
import { ChurrascometroService } from '../../services/churrascometro.service';

import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { tipoProduto } from '../../models/tipo-produto.interface'

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
  type: string,
  value: string
}

interface Resumo {
  adultos: number,
  criancas: number,
  carnes: {item: string, consumoMedio: number, valorTotal: number}[],
  bebidas:  {item: string, consumoMedio: number, valorTotal: number}[]
}

@Component({
  selector: 'app-preco-formulario',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatStepperModule, MatRadioModule],
  templateUrl: './preco-formulario.component.html',
  styleUrl: './preco-formulario.component.scss'
})
export class PrecoFormularioComponent implements OnInit {

  listaTipos = Object.keys(tipoProduto)
  tipoChurrascoSelecionado!: string

  nome: string = ""

  formTipos!: FormGroup
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

  getCarnes = this.churrascometroService.getCarnes
  getBebidas = this.churrascometroService.getBebidas

  constructor(private churrascometroService: ChurrascometroService, private formBuilder: FormBuilder) {
    

    this.formTipos = this.formBuilder.group({
      tipoChurrasco: ['', this.radioRequiredValidator()],
    });

    this.formPessoas = this.formBuilder.group({
      adultos: new FormControl(0, [Validators.required, Validators.min(1)]),
      criancas: new FormControl(0, [Validators.min(0)])
    })

    this.formCarnes = this.formBuilder.group({})
    this.formBebidas = this.formBuilder.group({})
    

    effect(() => {

      // Lendo signals para dados de forma reativa
      const carnes = this.getCarnes()
      if (carnes) {

        this.carnesOpcoes = []
        
        carnes.forEach(carne => {
          this.carnesOpcoes.push({key: carne.id, type: carne.tipo, value: new TitleCasePipe().transform(carne.nome)})
          this.formCarnes.addControl(carne.id, new FormControl(null))
        })

      }

      const bebidas = this.getBebidas()
      if (bebidas) {

        this.bebidasOpcoes = []
       
        bebidas.forEach(bebida => {
          this.bebidasOpcoes.push({key: bebida.id, type: bebida.tipo, value: bebida.nome[0].toUpperCase() + bebida.nome.slice(1)})
          this.formBebidas.addControl(bebida.id, new FormControl(null))
        })
      }
      
    })

  }

  ngOnInit(): void {

    this.inicializarService()
  }

  inicializarService(): void {
    
    // Usando signals
    this.churrascometroService.httpGetCarnes().subscribe()
    this.churrascometroService.httpGetBebidas().subscribe()

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

  get carnesOpcoesPorTipo(): ItemOpcao[] {
    return this.carnesOpcoes.filter(carne => carne.type === this.tipoChurrascoSelecionado)
  }

  get bebidasOpcoesPorTipo(): ItemOpcao[] {
    return this.bebidasOpcoes.filter(bebida => bebida.type === this.tipoChurrascoSelecionado)
  }



  submit(): void {

    try {

      if (this.formTipos.valid && this.formPessoas.valid && this.formCarnes.valid && this.formBebidas.valid) {
      
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
          let carneItem = this.getCarnes().find(carne => carne.id === key)
          if (resposta && carneItem) {
             
            let consumo = adultos * carneItem.consumo_medio_adulto_g + criancas * (carneItem.consumo_medio_crianca_g ?? 0)
            let valorTotal = consumo / 1000 * carneItem.preco_kg
            this.resumo.carnes.push({item: carneItem.nome, consumoMedio: consumo, valorTotal })
            
          }
        }
        this.resumo.bebidas = []
        for (const key in formBebidasValues) {
          const resposta = formBebidasValues[key];
          let bebidaItem = this.getBebidas().find(bebida => bebida.id === key)
          if (resposta && bebidaItem) {
            let consumo = adultos * bebidaItem.consumo_medio_adulto_ml + criancas * (bebidaItem.proibido_menores ? 0 : bebidaItem.consumo_medio_crianca_ml)
            let valorTotal = consumo / 1000 * bebidaItem.preco_unidade
            this.resumo.bebidas.push({item: bebidaItem.nome, consumoMedio: consumo, valorTotal })
          }
          // if (resposta) {
          //   let bebidaItem = this.bebidasShow[key]
          //   let consumo = adultos * bebidaItem.consumoMedioAdulto + criancas * (bebidaItem.consumoMedioCrianca ?? 0)
          //   let valorTotal = consumo / 1000 * bebidaItem.preco
          //   this.resumo.bebidas.push({item: bebidaItem.nome, consumoMedio: consumo, valorTotal })
          // }
        }
        
        
  
        // Simular Tempo de processamento
        setTimeout(() => {
          this.exibirLoading = false
          this.exibirResultados = true
          this.resetForms()
        }, 2000)
  
  
      }

    } catch (error) {
      this.formErrorMessage = `${error}`
    }
    
   
  }


  resetForms() {
    this.formBebidas.reset()
    this.formCarnes.reset()
    this.formPessoas.reset()
  }


  radioRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : { required: true };
    };
  }

  carregaTipoChurrasco() {
    this.formBebidas.reset();
    this.formCarnes.reset();
    this.tipoChurrascoSelecionado = this.formTipos.get('tipoChurrasco')?.value;
  }

}
