import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {

  //variables para hacer la compra de la moneda
  moneda_seleccionada : string = "";
  comision_exchange : string = "";
  comision_calculo : number = 0;
  rate_moneda: string = "4";
  rate_encontrado : string = "0000";
  cantidad_moneda: number = 0;
  total_transaccion: number = 0;
  exchange_elegida: any;

  //variables aux
  exchanges:any[] = [];
  exchangesMayores:any[] = [];
  exchangesImagenes:any[] = [];
  @Input() usuario_nombre : string = "";
  usuario:any;
  moneda_string: string = "";
  moneda:any;
  mensaje:string = "";
  constructor(private dataService:DataService, private router: Router,private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
      this.moneda_string = params['moneda'];
      this.rate_encontrado = this.getRate(this.moneda_string);
      console.log("rate encontrado: " + this.rate_encontrado);
      //this.encontrarMoneda(this.moneda_string);
      this.dataService.cargarUsuario(params['id']).subscribe(resultado => {
        this.usuario = resultado;
        this.usuario_nombre = this.usuario.nombre + ", " + this.usuario.apellido;
      });
    })
  }

  ngOnInit(): void {
    this.dataService.cargarDatosExchanges().subscribe(resultados =>{
      this.exchanges = resultados;
      this.encontrarMayores();
      this.asignarImagen();
    })
  }

  comprar(){
    //creamos el objeto transaccion
    let transaccion = {
      idUsuario : this.usuario.id,
      precioMoneda : this.rate_moneda,
      cantidad : this.cantidad_moneda,
      costoFinal : this.total_transaccion
    }
    this.dataService.agregarTransaccion(transaccion).subscribe(resultado => {
      console.log(transaccion);
    })
    this.router.navigate(['home', this.usuario.id]);
  }

  encontrarMoneda(moneda:string){
    this.dataService.cargarAsset(this.moneda_string).subscribe(resultado => {
      this.moneda = resultado[0];
    })
  }

  encontrarMayores(){
    let arreglo: number [] = []
    this.exchanges.forEach(exchange => arreglo.push(exchange.volume_1mth_usd));
    let arregloOrdenado = this.bubbleSort(arreglo);
    let mayoresExchanges = arregloOrdenado.slice(-3);
    this.exchanges.forEach(exchange => {
      if (exchange.volume_1mth_usd == mayoresExchanges[0]){
        exchange['posicion'] = "tercero";
          this.exchangesMayores.push(exchange);
      } else if ( exchange.volume_1mth_usd == mayoresExchanges[1]) {
        exchange['posicion'] = "segundo";
        this.exchangesMayores.push(exchange);
      } else if (exchange.volume_1mth_usd == mayoresExchanges[2]) {
        exchange['posicion'] = "primero";
        this.exchangesMayores.push(exchange);
      }
    });
  }

  completarForm(exchange : string){
    this.moneda_seleccionada = this.moneda_string;
    //encontramos el exchange elegido para saber la comision
    this.getExchangeSeleccionada(exchange);
    //let rate = this.getRate(this.moneda_string);
    //calculamos la comision
    if (this.exchange_elegida.posicion == "primero"){
      this.comision_exchange = "0.25";
      this.comision_calculo = 0.0025;
    } else if(this.exchange_elegida.posicion == "segundo") {
      this.comision_exchange = "0.4";
      this.comision_calculo = 0.004;
    } else if(this.exchange_elegida.posicion == "tercero"){
      this.comision_exchange = "0.55";
      this.comision_calculo = 0.0055;
    }
    this.rate_encontrado = this.getRate(this.moneda_string);
    console.log("rate moneda: " + this.rate_encontrado);
  }

  calcularTotal(){
    let subtotal = (this.cantidad_moneda * parseFloat(this.rate_moneda));
    this.total_transaccion = subtotal + (subtotal*this.comision_calculo);
  }

  getExchangeSeleccionada(exchange_name: string){
    this.exchangesMayores.forEach(exchange=>{
      if (exchange.name == exchange_name){
        this.exchange_elegida = exchange;
      }
    })
  }

  getRate(asset: string ):any{
    let object :any;
    let rate : any;
    this.dataService.getRate(asset).subscribe(resultado => {
      object = resultado;
      console.log(resultado);
      rate = object.rate;
      console.log("rate: " + rate);
      this.rate_moneda = rate;
    });
    return rate;
  }

  asignarImagen(){

    this.dataService.cargarImagenesExchanges().subscribe( resultados => {
      this.exchangesImagenes = resultados;
      this.exchangesImagenes.forEach(imagen =>{
        this.exchangesMayores.forEach(exchange=> {
          if(exchange.exchange_id == imagen.exchange_id){
            exchange['url_imagen']=imagen.url;
          }
        })
      })
    })

    
  }

  bubbleSort (arr:number[]):number[] {
    const l = arr.length;
    for (let i = 0; i < l; i++ ) {
      for (let j = 0; j < l - 1 - i; j++ ) {
        if ( arr[ j ] > arr[ j + 1 ] ) {
          [ arr[ j ], arr[ j + 1 ] ] = [ arr[ j + 1 ], arr[ j ] ];
        }
      }
    }
    return arr;
  }

}
