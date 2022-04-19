import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlUsuario : string = "http://localhost:8080/factorit/usuarios";

  urlUsuarioId : string = "http://localhost:8080/factorit/usuarios/";

  urlExchanges: string = "https://rest.coinapi.io/v1/exchanges";

  urlAssets : string = "https://rest.coinapi.io/v1/assets";
  
  urlAsset : string = "https://rest.coinapi.io/v1/assets/";

  urlImagenes : string = "https://rest.coinapi.io/v1/assets/icons/250";

  urlImagenesExchanges:string = "https://rest.coinapi.io/v1/exchanges/icons/250";

  urlRate: string = "https://rest.coinapi.io/v1/exchangerate/";

  //header :HttpHeaders = new HttpHeaders().set('X-CoinAPI-Key','984FEBD3-62E8-4C3A-A16C-9C9DFD2BE8C3');
  header :HttpHeaders = new HttpHeaders().set('X-CoinAPI-Key','CEA0B191-09B0-463E-B3CB-20B0749E4C43');
  //header :HttpHeaders = new HttpHeaders().set('X-CoinAPI-Key','7F81E616-46FC-4EB4-B48F-4BB0C0130545');

  //url transaccion
  urlTransaccion : string = "http://localhost:8080/factorittransaccion";

  constructor(private http: HttpClient ) { }

  cargarUsuarios(): Observable<any>{
    return this.http.get(this.urlUsuario);
  }

  cargarUsuario(id:string):Observable<any>{
    return this.http.get(this.urlUsuarioId + id);
  }

  cargarDatosExchanges(): Observable<any>{
    return this.http.get(this.urlExchanges, {headers: this.header});
  }

  cargarAssets(): Observable<any>{
    return this.http.get(this.urlAssets, {headers : this.header});
  }

  cargarAsset(moneda:string): Observable<any>{
    console.log("url de la moneda: " + this.urlAsset + moneda);
    return this.http.get(this.urlAsset + moneda, {headers : this.header});
  }

  cargarImagenes():Observable<any>{
    return this.http.get(this.urlImagenes, {headers: this.header});
  }

  cargarImagenesExchanges():Observable<any>{
    return this.http.get(this.urlImagenesExchanges, {headers: this.header});
  }

  getRate(asset: string){
    return this.http.get(this.urlRate + asset + "/USD", {headers: this.header});
  }

  //header de la transaccion
  json :HttpHeaders = new HttpHeaders().set('Content-Type','application/json');
  //agregamos la transaccion
  agregarTransaccion(transaccion: any){
    return this.http.post(this.urlTransaccion, transaccion, {headers: this.json});
  }

}
