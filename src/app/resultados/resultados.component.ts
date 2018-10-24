import { Component, OnInit, Input } from '@angular/core';
import { ResultadoService } from '../resultado.service';
import { RESULTADO } from '../mocks/mocks-resultado';
import { Resultado } from '../models/resultado';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  @Input() resultados: Resultado[] = RESULTADO;

  constructor (private resultadoService: ResultadoService){}

  ngOnInit(){
    this.getResultados();
  }

  getResultados(): void {
    this.resultadoService.getResultados()
    .subscribe(resultados => {
      this.resultados = resultados;
      console.log(this.resultados);
    })
    
  }

  add(resultado: Resultado): void {
    if (!resultado) { return; }
    this.resultadoService.addResultado(resultado)
    .subscribe(resultados => {
      this.resultados.push(resultados);
      console.log(this.getResultados);
    })
  }

}
