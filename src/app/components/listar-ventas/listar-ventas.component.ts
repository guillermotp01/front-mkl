import { Component } from '@angular/core';
import { ListarVentasService } from '../../service/listar-ventas.service';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrl: './listar-ventas.component.css'
})
export class ListarVentasComponent {
  currentPage: number = 0;
  pageSize: number = 6; 
  isNavCollapsed = true;
  
  constructor(private ventasService: ListarVentasService){
  
  }

  onNavToggled(isCollapsed: boolean) {
    this.isNavCollapsed = isCollapsed;
  }
}
