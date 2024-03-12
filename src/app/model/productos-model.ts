import { ColorModel } from "./colores-model";

export class ProductoModel {
    idProducto: number = 0;
    nombre: string = "";
    descripcion: string = "";;
    precio: number = 0;
    colores: ColorModel[] = []; 
    selectedColor?: string;
}


