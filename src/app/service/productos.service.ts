import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoModel } from '../model/productos-model';
import { catchError, map } from 'rxjs/operators';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpClient: HttpClient) { 
  
  }

  getProducto(page: number, size: number): Observable<any> {
    return this.httpClient.get<ProductoModel[]>(`${baserUrl}producto/listarProducto?page=${page}&size=${size}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener productos', error);
          return [];
        })
      );
  }

  saveProducto(request: any): Observable<any>{
    return this.httpClient.post<any>(baserUrl + 'producto/registrarProducto', request).pipe(map(resp => resp));
  }
    
  updateProducto(id: number, request: any): Observable<any> {
    return this.httpClient.put<any>(`${baserUrl}producto/actualizarProducto/${id}`, request)
      .pipe(map(resp => resp));
  }

  deleteProducto(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${baserUrl}producto/eliminarProducto/${id}`).pipe(map(resp => resp));
  }
}
