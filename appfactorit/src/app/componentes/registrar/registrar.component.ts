import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  password: string;
  confirmarPassword: string;

  constructor() {
    this.nombre = "";
    this.apellido = "";
    this.usuario = "";
    this.email = "";
    this.password = "";
    this.confirmarPassword = "";
  }

  ngOnInit(): void {
  }

  register() {
    console.log(this.email);
    console.log(this.password);
  }

}
