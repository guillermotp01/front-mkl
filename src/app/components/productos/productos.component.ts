import { Component } from '@angular/core';
import { ProductoModel} from '../../model/productos-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formProducto: FormGroup = new FormGroup({});
  producto: ProductoModel = new ProductoModel();
  nuevoColor: ColorModel = new ColorModel();
  nuevaTalla: TallaModel = new TallaModel();
  selectedColorMap: { [productId: number]: string } = {}; // mapea el color de cada producto
  selectedTallasMap: { [productId: number]: TallaModel[] } = {}; // mapea la talla de cada producto

  //paginacion numero de pagina y cantidad para cada pagina
  currentPage: number = 0;
  pageSize: number = 4; 

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

  list() {
    this.productoService.getProducto(this.currentPage, this.pageSize).subscribe(resp => {
      if (resp) {
        this.listProductos = resp.content;
      }
    });
  }

  save() {
    this.productoService.saveProducto(this.producto).subscribe(resp => {
      if (resp) {
        this.list();  
      }
    });
    this.showModalActualizarProducto = false;
  }

  update() {
    const productoId = this.producto.idProducto;
    this.productoService.updateProducto(productoId, this.producto).subscribe(resp => {
        if (resp) {
          this.list();
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
    this.producto = {
      idProducto: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      colores: []
    };
  }

  modalActualizar(item: any): void {
    this.updateMode = true;
    this.showModalActualizarProducto = true;
    this.showModalEliminarProducto = false;

    this.producto = {
      idProducto: item.idProducto,
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
      colores: [...item.colores]
    };
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
    const selectedColor = event.target.value;

    this.selectedColorMap[productoId] = selectedColor;
    const selectedTallas = this.getTallasPorColor(productoId, selectedColor);

    this.selectedTallasMap[productoId] = selectedTallas;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.list();
  }

  isNavCollapsed = true;

  onNavToggled(isCollapsed: boolean) {
    this.isNavCollapsed = isCollapsed;
  }
}
