import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Calculadora } from '../models/calculadora';
import { Resultado } from '../models/resultado';
import { ResultadoService } from '../resultado.service';
import { ResultadosComponent } from '../resultados/resultados.component';

@Component({
  providers:[ResultadosComponent],
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  @Input() calculadora: Calculadora = {
    numero: 0,
    completo: "",
    resultado: 0,
    operacion: "",
  };

  constructor(private resultadosComponent: ResultadosComponent, private resultadosService: ResultadoService) { }

  ngOnInit() {
  }

  setClearAll() {
    this.calculadora.resultado = 0;
    this.calculadora.operacion = "";
    this.calculadora.numero = 0;
    this.calculadora.completo = "";
  }

  setClear() {
    this.calculadora.numero = 0;
    this.calculadora.completo = "";
  }

  setPunto(value: string) {
    if (!this.calculadora.completo.includes(value)) {
      this.calculadora.completo += value;
    }
  }

  setNumero(value: number): void {
    if (this.calculadora.operacion == "" && this.calculadora.resultado != 0) {
      this.setClearAll();
    } else {
      this.calculadora.completo += value;
      this.calculadora.numero = parseFloat(this.calculadora.completo);
    }
  }

  setOperacion(value: string) {
    if (value == "-" &&
      (this.calculadora.completo == "" || this.calculadora.completo == "-") &&
      !(this.calculadora.operacion == "" && this.calculadora.resultado != 0)) {
      this.calculadora.completo = value;
    } else {
      if (this.calculadora.completo != "" && this.calculadora.completo != "-") {
        if (this.calculadora.operacion != "") {
          this.doOperacion();
        } else {
          this.calculadora.resultado = parseFloat(this.calculadora.completo);
          this.calculadora.numero = parseFloat(this.calculadora.completo);
        }
      }
      this.calculadora.operacion = value;
      this.calculadora.completo = "";
    }
  }

  doOperacion() {
    if (this.calculadora.completo != "" && this.calculadora.completo != "-") {

      switch (this.calculadora.operacion) {
        case '+':
          this.hagaSuma();
          this.calculadora.resultado = this.calculadora.numero;
          this.calculadora.operacion = "";
          this.calculadora.completo = "";
                break
        case '-':
          this.hagaResta();
          this.calculadora.resultado = this.calculadora.numero;
          this.calculadora.operacion = "";
          this.calculadora.completo = "";
                break
        case '*':
          this.hagaMultiplicacion();
          this.calculadora.resultado = this.calculadora.numero;
          this.calculadora.operacion = "";
          this.calculadora.completo = "";
                break
        case '/':
          this.hagaDivision();
          this.calculadora.resultado = this.calculadora.numero;
          this.calculadora.operacion = "";
          this.calculadora.completo = "";
                break
        // case '=':
        //   this.calculadora.numero = this.calculadora.resultado;
        //   break
        default:
        this.calculadora.resultado = this.calculadora.numero;
        this.calculadora.operacion = "";
        this.calculadora.completo = "";
          }
    }


  }
  hagaSuma() {
    this.calculadora.numero = this.calculadora.resultado + parseFloat(this.calculadora.completo);
  }

  hagaResta() {
    this.calculadora.numero = this.calculadora.resultado - parseFloat(this.calculadora.completo);
  }

  hagaMultiplicacion() {
    this.calculadora.numero = this.calculadora.resultado * parseFloat(this.calculadora.completo);
  }

  hagaDivision() {
    if (parseInt(this.calculadora.completo) != 0) {
      this.calculadora.numero = this.calculadora.resultado / parseFloat(this.calculadora.completo);
      this.calculadora.resultado = this.calculadora.numero;
    }
  }

  // export class Calculadora{
  //   numero: number;
  //   completo: string;
  //   resultado: number;
  //   operacion: string;
  // }

}