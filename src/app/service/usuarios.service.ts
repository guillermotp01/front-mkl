import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  constructor(private httpClient: HttpClient) { 
  
  }

  agregarUsuario(user: any) {
    return this.httpClient.post(`${baserUrl}usuarios/`, user, { responseType: 'text' });
  }

  getUsuarios(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${baserUrl}usuarios/listarUsuarios?page=${page}&size=${size}`)
      .pipe(map(res => res));
  }
    
  updateUsuario(id: number, request: any): Observable<any> {
    return this.httpClient.put<any>(`${baserUrl}usuarios/actualizarUsuario/${id}`, request)
      .pipe(map(resp => resp));
  }

  deleteUsuario(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${baserUrl}usuarios/${id}`).pipe(map(resp => resp));
  }
}
