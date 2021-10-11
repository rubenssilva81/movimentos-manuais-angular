import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtosUrl = 'http://localhost:8080/api/produtos/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }
  
  getProdutos(): Observable<Produto[]> 
  {
    return this.http.get<Produto[]>(this.produtosUrl)
    .pipe(
      tap(_ => this.log('fetched produtos')),
      catchError(this.handleError<Produto[]>('getProdutos', []))
    );
  }

  private log(message: string) {
    console.log(`ProdutoService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 

}
