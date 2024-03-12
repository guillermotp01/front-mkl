import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RealizarVentaComponent } from './components/realizar-venta/realizar-venta.component';
import { ListarVentasComponent } from './components/listar-ventas/listar-ventas.component';
import { SesionComponent } from './components/sesion/sesion.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path: '', redirectTo: 'cerrarSesion', pathMatch: 'full'},
  {path: 'dashboard', component: PrincipalComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'realizarVenta', component: RealizarVentaComponent},
  {path: 'listarVenta', component: ListarVentasComponent},
  {path: 'cerrarSesion',component: SesionComponent},
  {path: 'registro', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
