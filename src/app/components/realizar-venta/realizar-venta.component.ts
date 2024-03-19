import { Component } from '@angular/core';

@Component({
  selector: 'app-realizar-venta',
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.css'
})
export class RealizarVentaComponent {
  isNavCollapsed = true;

  onNavToggled(isCollapsed: boolean) {
    this.isNavCollapsed = isCollapsed;
  }
}
