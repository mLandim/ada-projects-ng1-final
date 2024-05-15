import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'

type Carne = {
  id: string,
  nome: string,
  tipo: string,
  preco_kg: number,
  consumo_medio_adulto_g: number,
  consumo_medio_crianca_g: number
}

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  private API_URL = 'https://reimagined-space-fortnight-vp6gr5xg5xj3p6qx-3000.app.github.dev' //'http://localhost:3000'

  constructor(private hhtp: HttpClient) { }

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

  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }

}
