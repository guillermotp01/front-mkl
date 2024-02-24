import { Component } from '@angular/core';
import { ProductoModel} from '../../model/productos-model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  constructor(private productoService: ProductosService) {
  
  }
  

  listProductos: ProductoModel[] = [];
  updateMode: boolean = false;
  showModalActualizarProducto: boolean = false;
  showModalEliminarProducto: boolean = false;
  idProductoEliminar: number = 0;
  selectedColor: string = '';
  formProducto: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.list();
    this.formProducto = new FormGroup({
      idProducto: new FormControl(''),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      colores: new FormArray([]),
      tallas: new FormArray([]),
      selectedTalla: new FormControl(''),
      selectedColor: new FormControl(''), // Agregado para el color seleccionado
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
    const productoId = this.formProducto.value.idProducto;
    this.productoService.updateProducto(productoId, this.formProducto.value).subscribe(resp => {
        if (resp) {
          this.list();
          this.formProducto.reset();
        }
      });
    this.showModalActualizarProducto = false;
  }

  delete(){
    this.productoService.deleteProducto(this.idProductoEliminar).subscribe(resp => {
      if(resp){
        this.list();
      }
    });
    this.showModalEliminarProducto = false;
  }

  newProducto(){
    this.updateMode = false;
    this.formProducto.reset();
  }

  newUsuario(){
    this.formProducto.reset();
  }

  modalActualizar(item: any): void {
    this.showModalActualizarProducto = true;
    this.showModalEliminarProducto = false;

    this.formProducto.controls['idProducto'].setValue(item.idProducto)
    this.formProducto.controls['nombre'].setValue(item.nombre)
    this.formProducto.controls['descripcion'].setValue(item.descripcion)
    this.formProducto.controls['precio'].setValue(item.precio)
  }

  modalEliminar(id: number) {
    this.idProductoEliminar = id;
    this.showModalEliminarProducto = true;
    this.showModalActualizarProducto = false;
  }

  cancelar(){
    this.showModalActualizarProducto = false;
    this.showModalEliminarProducto = false;
  }

  getCodigoBarras(idProducto: number): string {
    return `1826${idProducto}237`;
  }

  getTallasPorColor(colorNombre: string) {
    const colorSeleccionado = this.listProductos
        .flatMap(producto => producto.colores)
        .find(color => color.nombre === colorNombre);

    return colorSeleccionado ? colorSeleccionado.tallas : [];
  }

  onColorSelected(event: any) {
    const selectedColor = event.target.value;
    const selectedTallas = this.getTallasPorColor(selectedColor);

    // Actualizar el valor de selectedColor
    this.formProducto.patchValue({
        selectedColor: selectedColor
    });

    // Actualizar las tallas en el formulario
    const coloresArray = this.formProducto.get('colores') as FormArray;
    const tallasArray = coloresArray.at(0).get('tallas') as FormArray;
    tallasArray.patchValue(selectedTallas);
  }
}
