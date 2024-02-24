import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoModel } from '../model/productos-model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  URL_API: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { 
  
  }

  getProducto(): Observable<ProductoModel[]> {
    return this.httpClient.get<ProductoModel[]>(this.URL_API + 'producto/listarProducto')
      .pipe(
        catchError(error => {
          console.error('Error al obtener productos', error);
          return [];
        })
      );
  }

  saveProducto(request: any): Observable<any>{
    return this.httpClient.post<any>(this.URL_API + 'producto/registrarProducto', request).pipe(map(resp => resp));
  }
    
  updateProducto(id: number, request: any): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_API}producto/actualizarProducto/${id}`, request)
      .pipe(map(resp => resp));
  }

  deleteProducto(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL_API}producto/eliminarProducto/${id}`).pipe(map(resp => resp));
  }
}
