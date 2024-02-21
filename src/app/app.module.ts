import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RealizarVentaComponent } from './components/realizar-venta/realizar-venta.component';
import { ListarVentasComponent } from './components/listar-ventas/listar-ventas.component';
import { BodyComponent } from './components/body/body.component';
import { SesionComponent } from './components/sesion/sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    NavegacionComponent,
    PrincipalComponent,
    ProductosComponent,
    RealizarVentaComponent,
    ListarVentasComponent,
    BodyComponent,
    SesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
