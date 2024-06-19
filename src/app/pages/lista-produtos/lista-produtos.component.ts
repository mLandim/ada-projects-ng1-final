import { Component, OnInit } from '@angular/core';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent implements OnInit {

  getCarnes = this.churrascometroService.getCarnes
  getBebidas = this.churrascometroService.getBebidas


  constructor(private churrascometroService: ChurrascometroService, private router: Router) {
    
  }

  ngOnInit(): void {

    this.inicializarService()
  }

  inicializarService(): void {
    
    // Usando signals
    this.churrascometroService.httpGetCarnes().subscribe()
    this.churrascometroService.httpGetBebidas().subscribe()

  }

  editar(tipo: string, id: string) {
    this.router.navigate([`/produtos/${tipo}/${id}`])
  }

}
