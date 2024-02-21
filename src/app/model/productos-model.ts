export class ProductoModel {
    nombre: string = "";
    descripcion: string = "";
    existencia: {
        [talla: string]: {
            colores: {
            [color: string]: {
                cantidad: number;
                precio: number;
                };
            };
        };
    } = {};
}