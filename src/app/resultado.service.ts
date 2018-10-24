import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Resultado } from './models/resultado';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  private resultadoUrl = 'api/resultados';

  constructor(
    private http: HttpClient
  ) { }

  getResultados (): Observable<Resultado[]>{
    return this.http.get<Resultado[]>(this.resultadoUrl).pipe(
        tap(resultado => this.log("Resultados listados")),
        catchError(this.handleError('getResultados', []))
      );
  }

  addResultado(resultado: Resultado) { 
    return this.http.post<Resultado>(this.resultadoUrl, resultado).pipe(
    tap((answer: Resultado) => console.log(`Resultados agregado w/ id=${answer.id}`)),
        catchError(this.handleError('addResultados', resultado))
      );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(`${operation} fallido: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string)
  {
    console.log(`Respuesta del servidor: ${message}`);
  }

}


