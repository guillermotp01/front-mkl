import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RealizarVentaComponent } from './components/realizar-venta/realizar-venta.component';
import { ListarVentasComponent } from './components/listar-ventas/listar-ventas.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NormalGuard } from './service/normal.guard';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: PrincipalComponent ,
    pathMatch: 'full',
    canActivate:[NormalGuard],
  },
  {
    path: 'usuarios', 
    component: UsuariosComponent ,
    pathMatch: 'full',
    canActivate:[NormalGuard],
  },
  {
    path: 'productos', 
    component: ProductosComponent ,
    pathMatch: 'full',
    canActivate:[NormalGuard],
  },
  {
    path: 'realizarVenta', 
    component: RealizarVentaComponent ,
    pathMatch: 'full',
    canActivate:[NormalGuard]
  },
  {
    path: 'listarVenta', 
    component: ListarVentasComponent ,
    pathMatch: 'full',
    canActivate:[NormalGuard]
  },
  {
    path: 'signup', 
    component: SignupComponent ,
    pathMatch: 'full',
  },
  {
    path: 'login', 
    component: LoginComponent ,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
