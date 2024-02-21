import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoModel } from '../model/productos-model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  URL_API: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { 
  
  }

  getProducto(): Observable<ProductoModel[]>{
    return this.httpClient.get<ProductoModel[]>(this.URL_API + 'producto/listar-producto').pipe(map(res => res));
  }

  saveProducto(request: any): Observable<any>{
    return this.httpClient.post<any>(this.URL_API + 'producto/registrar-producto', request).pipe(map(resp => resp));
  }
    
  updateProducto(id: number, request: any): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_API}producto/actualizarUsuario/${id}`, request)
      .pipe(map(resp => resp));
  }

  deleteProducto(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL_API}producto/eliminarUsuario/${id}`).pipe(map(resp => resp));
  }
}
