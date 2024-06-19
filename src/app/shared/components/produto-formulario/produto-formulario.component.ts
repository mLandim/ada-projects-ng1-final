import { Component, Input, OnInit, effect } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Produto, tipoProduto } from '../../models/tipo-produto.interface'
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-produto-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './produto-formulario.component.html',
  styleUrl: './produto-formulario.component.scss'
})
export class ProdutoFormularioComponent implements OnInit {
  
  @Input() idRoute: string | undefined = undefined;
  @Input({ required: true}) produtoRoute: string = 'carnes';
  

  listaTipos = Object.keys(tipoProduto)

  private camposOpcoes: {[propKey: string]: {nome: string, tipo: string, placeholder: string}[]} = { 
    "carnes": [
      { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
      { nome: 'tipo', tipo: 'list', placeholder: 'Tipo' },
      { nome: 'preco_kg', tipo: 'number', placeholder: 'Preço por kg' },
      {
        nome: 'consumo_medio_adulto_g',
        tipo: 'number',
        placeholder: 'Consumo médio por adulto (g)',
      },
      {
        nome: 'consumo_medio_crianca_g',
        tipo: 'number',
        placeholder: 'Consumo médio por criança (g)',
      }
    ],
    "bebidas": [
      { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
      { nome: 'tipo', tipo: 'list', placeholder: 'Tipo' },
      { nome: 'preco_unidade', tipo: 'number', placeholder: 'Preço por unidade' },
      { nome: 'consumo_medio_adulto_ml', tipo: 'number', placeholder: 'Consumo médio por adulto (ml)' },
      { nome: 'proibido_menores', tipo: 'boolean', placeholder: 'Bebida proibida para menores'},
      { nome: 'consumo_medio_crianca_ml', tipo: 'number', placeholder: 'Consumo médio por criança (ml)'}
      
    ]
  };

  campos: {nome: string, tipo: string, placeholder: string}[] = []

  form!: FormGroup

  enableSelectForbidden: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private servico: ChurrascometroService,
    private router: Router
  ) {

        
    if (this.produtoRoute === "bebidas") this.enableSelectForbidden = true
  
    effect(() => {
      if (this.idRoute && this.servico.getProduto()) {
        
        // Tratando produtos
        let produto = {...this.servico.getProduto()}
        if (this.produtoRoute == "bebidas") {
          produto = {...produto, proibido_menores: produto.proibido_menores ?? false}
        }
        this.form.patchValue(produto)

      }
    })

  }
  ngOnInit(): void {

    this.form = this.formBuilder.group({})
    this.campos = this.camposOpcoes[this.produtoRoute]
  
    this.campos.forEach(campo => {
      this.form.addControl(campo.nome, this.formBuilder.control('', [Validators.required]))
    })

    if (this.idRoute) {
      this.servico.httpGetProduto(this.idRoute, this.produtoRoute).subscribe()
    }

  }

  updateCosumoCrianca(e: any) {
    if (e.value) {
      this.form.get('consumo_medio_crianca_ml')?.setValue(0)
      this.form.get('consumo_medio_crianca_ml')?.disable()
    } else {
      this.form.get('consumo_medio_crianca_ml')?.enable()
    }

  }

  criar() {
    if (this.form.valid) {
      const produto = this.getProduto();

      if (produto) {
        this.servico.httpCreateProduto(produto, this.produtoRoute).subscribe({
          next: (retorno) => {
            this.form.reset();
            console.log(retorno);
            this.router.navigate(['/produtos']);
          },
          error: (error) => console.error(error),
        })
      }
      
    }
  }

  editar() {
    if (this.form.valid) {
      const produto = this.getProduto();
      if (produto && this.idRoute) {
        this.servico.httpUpdateProduto(this.idRoute, this.produtoRoute, produto).subscribe({
          next: (retorno: any) => {
            console.log('Editado', retorno);
            this.form.reset();
            this.router.navigate(['/produtos']);
          },
          error: (error) => console.error(error),
        });
      }
    }
  }

  deletar() {
    if (this.idRoute) {
      this.servico.httpDeleteProduto(this.idRoute, this.produtoRoute).subscribe({
        next: () => {
          console.log('Apagado');
          this.form.reset();
          this.router.navigate(['/produtos']);
          alert('Apagado');
        }, error: (error) => console.error(error)
      });
    }
  }

  private getProduto(): Produto {
    let produto!: Produto;

    this.campos.forEach((campo) => {
      const value = this.getValorFormControl(campo.nome); 
      if (value !== undefined) {
        produto = {
          ...produto, 
          [campo.nome]: campo.tipo === "number" && value ? parseFloat(value) : value
        }
      }
      
    })
    return produto;
  }

  private getValorFormControl(nome: string): string | null {
    return this.form.get(nome)?.value;
  }

  voltar() {
    this.router.navigate(['/produtos'])
  }
}
