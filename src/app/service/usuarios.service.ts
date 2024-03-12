import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosModel } from '../model/usuarios-model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  URL_API: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { 
  
  }

  getUsuarios(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${this.URL_API}usuario/listarUsuarios?page=${page}&size=${size}`)
      .pipe(map(res => res));
  }

  saveUsuarios(request: any): Observable<any>{
    return this.httpClient.post<any>(this.URL_API + 'usuario/registrarUsuario', request).pipe(map(resp => resp));
  }
    
  updateUsuario(id: number, request: any): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_API}usuario/actualizarUsuario/${id}`, request)
      .pipe(map(resp => resp));
  }

  deleteUsuario(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL_API}usuario/eliminarUsuario/${id}`).pipe(map(resp => resp));
  }
}
