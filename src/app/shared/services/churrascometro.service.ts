import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { Carne } from '../models/carnes.interface'
import { Bebida } from '../models/bebidas.interface';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  // Endereço público específico gerado pelo github codespaces. Em desenvolvimento local deve ser substituído por http://localhost:3000
  private API_URL = 'https://reimagined-space-fortnight-vp6gr5xg5xj3p6qx-3000.app.github.dev' //'http://localhost:3000'


  constructor(private hhtp: HttpClient) { }

  // Apenas exemplo (dead code)
  getPrecoCarnesByName(nome: string): Observable<number> {
    return this.hhtp.get<Carne[]>(`${this.API_URL}/carnes/?nome=${nome}`)
                    .pipe(
                      map(itens => {
                        return itens.map(carne => carne.preco_kg)[0]
                      }),
                      catchError(
                        this.handlerError
                      )
                    )
  }


  getCarnes(): Observable<Carne[]> {
    return this.hhtp.get<Carne[]>(`${this.API_URL}/carnes`).pipe(
      catchError(this.handlerError)
    )
  }

  getBebidas(): Observable<Bebida[]> {
    return this.hhtp.get<Bebida[]>(`${this.API_URL}/bebidas`).pipe(
      catchError(this.handlerError)
    )
  }


  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }

}
