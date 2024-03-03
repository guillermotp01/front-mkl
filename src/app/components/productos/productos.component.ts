import { Component } from '@angular/core';
import { ProductoModel} from '../../model/productos-model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../service/productos.service';
import { ColorModel } from '../../model/colores-model';
import { TallaModel } from '../../model/tallas-model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  listProductos: ProductoModel[] = [];
  updateMode: boolean = false;
  showModalActualizarProducto: boolean = false;
  showModalEliminarProducto: boolean = false;
  idProductoEliminar: number = 0;
  selectedColor: string = ''; 
  formProducto: FormGroup = new FormGroup({});
  producto: ProductoModel = new ProductoModel();
  nuevoColor: ColorModel = new ColorModel();
  nuevaTalla: TallaModel = new TallaModel();

  constructor(private productoService: ProductosService, private fb: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.list();
    this.formProducto = this.fb.group({
      idProducto: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', Validators.required],
      colores: this.fb.array([]),
    });
  }
  
  agregarColor(): void {
    this.producto.colores.push(this.nuevoColor);
    // Reiniciar el nuevoColor para futuras adiciones
    this.nuevoColor = new ColorModel();
  }

  agregarTalla(color: ColorModel): void {
    color.tallas.push(this.nuevaTalla);
    // Reiniciar la nuevaTalla para futuras adiciones
    this.nuevaTalla = new TallaModel();
  }

  list(){
    this.productoService.getProducto().subscribe(resp=>{
      if(resp){
        this.listProductos = resp;
      }
    });
  }

  save() {
    this.productoService.saveProducto(this.producto).subscribe(resp => {
      if (resp) {
        this.list();
        this.formProducto.reset();
      }
    });
    this.showModalActualizarProducto = false;
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
    this.showModalActualizarProducto = true;
    this.formProducto.reset();
  }

  modalActualizar(item: any): void {
    this.updateMode = true;
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

  getTallasPorColor(productoId: number, colorNombre: string) {
    const productoSeleccionado = this.listProductos.find(producto => producto.idProducto === productoId);
    if (!productoSeleccionado) return [];
  
    const colorSeleccionado = productoSeleccionado.colores.find(color => color.nombre === colorNombre);
  
    return colorSeleccionado ? colorSeleccionado.tallas : [];
  }
  

  onColorSelected(event: any, productoId: number) {
    this.selectedColor = event.target.value;

    this.formProducto.patchValue({
      selectedColor: this.selectedColor,
    });

    const coloresArray = this.formProducto.get('colores') as FormArray;

    if (coloresArray.length > 0) {
      const tallasArray = (coloresArray.at(0).get('tallas') as FormArray) || new FormArray([]);

      tallasArray.clear();

      const selectedTallas = this.getTallasPorColor(productoId, this.selectedColor);

      for (const talla of selectedTallas) {
        const tallaGroup = this.fb.group({
          talla: [talla.talla],
          cantidad: [talla.cantidad],
        });
        tallasArray.push(tallaGroup);
      }
    }
  }
}
