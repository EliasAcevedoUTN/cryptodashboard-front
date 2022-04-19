import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  mensaje: string = "";
  usuarios: Usuario[] = [];
  usuario: any;
  assets: any[] = [];
  assetsCryptos: any[] = [];
  assetsMayores :Crypto [] = [];
  constructor(private dataService:DataService, private router: Router, activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    /*this.dataService.cargarDatosExchanges().subscribe(resultados => console.log(resultados));*/

    this.dataService.cargarUsuarios().subscribe(
      resultados => {
        this.usuarios = resultados;
        console.log(this.usuarios);
      }
    )
    
  }

  login() {
    if  (this.verificarLogin()){
      this.router.navigate(['home', this.usuario.id]);
    } else {
      this.mensaje = "La contraseña o el usuario son incorrectos!";
    }
  }

  verificarLogin():boolean{
    let existe: boolean = false;
    this.usuarios.forEach(usuario => {
      if ((this.email == usuario.user || this.email == usuario.mail)&&(this.password == usuario.password)){
        existe = true;
        this.usuario = usuario;
      }
    })
    return existe;
  }

}
