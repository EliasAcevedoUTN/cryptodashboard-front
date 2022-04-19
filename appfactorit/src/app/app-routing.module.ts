import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangesComponent } from './componentes/exchanges/exchanges.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';

const routes: Routes = [
  {path:'', component: LoginComponent },
  {path: 'home/:id', component: HomeComponent },
  {path: 'registrar', component: RegistrarComponent},
  {path: 'exchanges/:id/:moneda',component: ExchangesComponent},
  {path : '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
