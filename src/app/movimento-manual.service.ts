import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MovimentoManual } from './movimento-manual';

@Injectable({
  providedIn: 'root'
})
export class MovimentoManualService {

  private basepath = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getMovimentosManuais(codProduto: string, codCosif: string): Observable<MovimentoManual[]> 
  {
    const url = `${this.basepath}/produtos/${codProduto}/produtosCosif/${codCosif}/movimentosManuais`;
    return this.http.get<MovimentoManual[]>(url)
    .pipe(
      tap(_ => this.log('fetched movimentosManuais')),
      catchError(this.handleError<MovimentoManual[]>('getMovimentosManuais', []))
    );
  }

  inserir(movimentoManual: MovimentoManual): Observable<MovimentoManual> 
  {
    const url = `${this.basepath}/produtos/${movimentoManual.codProduto}/produtosCosif/${movimentoManual.codCosif}/movimentosManuais`;
    return this.http.post<MovimentoManual>(url, movimentoManual, this.httpOptions)
    .pipe(
      tap(
        (newMovimentoManual: MovimentoManual) =>  
            this.log(`added movimentoManual w/ id=${movimentoManual.codProduto}`)
      ),
      catchError(this.handleError<MovimentoManual>('inserirMovimentoManual'))
    );
  }

  private log(message: string) {
    console.log(`MovimentoManualService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
