import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs'
import { Carne } from '../models/carnes.interface'
import { Bebida } from '../models/bebidas.interface';
import { Produto } from '../models/tipo-produto.interface';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  // Endereço público específico gerado pelo github codespaces. Em desenvolvimento local deve ser substituído por http://localhost:3000
  private API_URL = 'http://localhost:3000' //'https://reimagined-space-fortnight-vp6gr5xg5xj3p6qx-3000.app.github.dev' //

  // Signals
  private carnes = signal<Carne[]>([])
  public getCarnes = this.carnes.asReadonly()

  private bebidas = signal<Bebida[]>([])
  public getBebidas = this.bebidas.asReadonly()

  private produto = signal<Produto | null>(null);
  public getProduto = this.produto.asReadonly();

  constructor(private http: HttpClient) { }

  // Atualizando signal com valor capturado no observable
  httpGetCarnes(): Observable<Carne[]> {
    return this.http.get<Carne[]>(`${this.API_URL}/carnes`).pipe(
      tap(carnes => this.carnes.set(carnes)),
      catchError(this.handlerError)
    )
  }

  httpGetBebidas(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(`${this.API_URL}/bebidas`).pipe(
      tap(bebidas => this.bebidas.set(bebidas)),
      catchError(this.handlerError)
    )
  }

  httpGetProduto(id: string, endpoint: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/${endpoint}/${id}`).pipe(
      tap(produto => this.produto.set(produto)),
      catchError(this.handlerError)
    )
  }

  httpCreateProduto(carne: any, endpoint: string): Observable<Produto> {
    return this.http.post<Produto>(`${this.API_URL}/${endpoint}`, carne).pipe(
      tap(produto => this.produto.set(produto)),
      catchError(this.handlerError)
    )
  }

  httpUpdateProduto(id: string, endpoint: string, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/${endpoint}/${id}`, produto).pipe(
      tap(produto => this.produto.set(produto)),
      catchError(this.handlerError)
    )
  }

  httpDeleteProduto(id: string, endpoint: string): Observable<Produto> {
    return this.http.delete<void>(`${this.API_URL}/${endpoint}/${id}`).pipe(
      tap(_ => this.produto.set(null)),
      catchError(this.handlerError)
    )
  }


  // getCarnesBkp(): Observable<Carne[]> {
  //   return this.http.get<Carne[]>(`${this.API_URL}/carnes`).pipe(
  //     catchError(this.handlerError)
  //   )
  // }

  // getBebidasBkp(): Observable<Bebida[]> {
  //   return this.http.get<Bebida[]>(`${this.API_URL}/bebidas`).pipe(
  //     catchError(this.handlerError)
  //   )
  // }


  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }


  // Apenas exemplo (dead code)
  // getPrecoCarnesByName(nome: string): Observable<number> {
  //   return this.http.get<Carne[]>(`${this.API_URL}/carnes/?nome=${nome}`)
  //                   .pipe(
  //                     map(itens => {
  //                       return itens.map(carne => carne.preco_kg)[0]
  //                     }),
  //                     catchError(
  //                       this.handlerError
  //                     )
  //                   )
  // }
  

}
