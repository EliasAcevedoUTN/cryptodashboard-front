import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  assets: any[] = [];
  assetsCryptos: any[] = [];
  assetsMayores :any [] = [];
  arrayImagenes:any[] = [];
  @Input() usuario_nombre:any;
  usuario: any;

  constructor(private dataService:DataService, private router: Router,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.dataService.cargarUsuario(params['id']).subscribe(resultado => {
        this.usuario = resultado;
        this.usuario_nombre = this.usuario.nombre + ", " + this.usuario.apellido;
      });
    })
   }

  ngOnInit(): void {

    this.dataService.cargarAssets().subscribe(resultados => {
      
      this.assets = resultados;
      //almacenasmoe en el arreglo assetsCryptos son las monedas de tipo crypto
      this.assets.forEach(moneda => {
        if(moneda.type_is_crypto == 1){
          this.assetsCryptos.push(moneda);
        };
      })
      this.encontrarMayores();

      //ahora cargamos las imagenes
      this.asignarImagen();
    })
    

  }
  

  encontrarMayores(){
    let arreglo: number [] = []
    this.assetsCryptos.forEach(moneda => arreglo.push(moneda.volume_1mth_usd));
    let arregloOrdenado = this.bubbleSort(arreglo);
    let mayoresCinco = arregloOrdenado.slice(-5);
    this.assetsCryptos.forEach(moneda => {
      if (moneda.volume_1mth_usd == mayoresCinco[0] || moneda.volume_1mth_usd == mayoresCinco[1] || moneda.volume_1mth_usd == mayoresCinco[2]
        || moneda.volume_1mth_usd == mayoresCinco[3] || moneda.volume_1mth_usd == mayoresCinco[4]){
          this.assetsMayores.push(moneda);
      }
    });
  }

  asignarImagen(){

    this.dataService.cargarImagenes().subscribe( resultados => {
      this.arrayImagenes = resultados;

      this.arrayImagenes.forEach(moneda =>{
        this.assetsMayores.forEach(crypto=> {
          if(crypto.asset_id == moneda.asset_id){
              //crypto['url_imagen']="../../../assets/images/icons8-en-alza-64.png";
              crypto['url_imagen']=moneda.url;
          }
        })
      })
    })

    
  }

  comprar(moneda:string){
    this.router.navigate(['exchanges', this.usuario.id, moneda]);
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
  };
}
