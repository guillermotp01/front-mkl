import { Component } from '@angular/core';
import { ProductoModel } from '../../model/productos-model';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  
  listProductos: ProductoModel [] = [];
  showModal: boolean = false;
  updateMode: boolean = false;
  formProducto: FormGroup = new FormGroup({});


  constructor(private productoService: ProductosService) {
  
  }

  ngOnInit(): void {
    this.list();
    this.formProducto = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      existencia: new FormGroup({}),
    });
  }

  list(){
    this.productoService.getProducto().subscribe(resp=>{
      if(resp){
        this.listProductos = resp;
      }
    });
  }

  save(){
    this.productoService.saveProducto(this.formProducto.value).subscribe(resp => {
      if(resp){
        this.list();
        this.formProducto.reset();
      }
    })
  }

  update() {
    const userId = this.formProducto.value.idUsuario;
    this.productoService.updateProducto(userId, this.formProducto.value).subscribe(resp => {
        if (resp) {
          this.list();
          this.formProducto.reset();
        }
      });
  }

  delete(id: number){
    this.productoService.deleteProducto(id).subscribe(resp => {
      if(resp){
        this.list();
      }
    })
  }

  newProducto(){
    this.updateMode = false;
    this.formProducto.reset();
  }

  selectItem(item: any){
    this.updateMode = true;
    this.formProducto.controls['idUsuario'].setValue(item.idUsuario);
    this.formProducto.controls['nombre'].setValue(item.nombre);
    this.formProducto.controls['correo'].setValue(item.correo);
    this.formProducto.controls['password'].setValue(item.password);
  }
}
