import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ProdutoCosif } from './produto-cosif';

@Injectable({
  providedIn: 'root'
})
export class ProdutoCosifService {

  private basepath = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getProdutosCosif(codProduto: string): Observable<ProdutoCosif[]> 
  {
    const url = `${this.basepath}/produtos/${codProduto}/produtosCosif`;
    return this.http.get<ProdutoCosif[]>(url)
    .pipe(
      tap(_ => this.log('fetched produtosCosif')),
      catchError(this.handleError<ProdutoCosif[]>('getProdutosCosif', []))
    );
  }

  private log(message: string) {
    console.log(`ProdutoCosifService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
    
}
