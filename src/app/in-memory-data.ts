import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Resultado } from './models/resultado';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): Resultado[] {
    const resulatdo = [
      { id: 0, value: 0 }
    ];

    return resulatdo;
  }

  idGenerator(resultado: Resultado[]): number {
    return resultado.length > 0 ? Math.max(...resultado.map(popo => popo.id)) + 1 : 0;
  }

  constructor() { }
}