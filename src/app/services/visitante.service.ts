import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export { Visitante, VisitanteResponse };

interface Visitante {
  id: number;
  nombre: string;
  telefono: string;
  politicas: string;
  estatus: string;
}

interface VisitanteResponse {
  cursos: Visitante[];
  links: any;
  meta: any;
}
@Injectable({
  providedIn: 'root'
})
export class VisitanteService {
  apiUrl = 'http://127.0.0.1:8000/api';
  getNewProduct: EventEmitter<any> = new EventEmitter();
  tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  //* Obtener Visitantes con authenticacion*/
  getVisitantes(): Observable<VisitanteResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<VisitanteResponse>(`${this.apiUrl}/visitantes`, { headers });
  }

  //** Nuevo Visitante sin authenticacion*/
  newVisitante(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/visitantes`, data);
  }

  //* Obtener Visitantes sin authenticacion */
  getVisitantesF(): Observable<VisitanteResponse> {
    return this.http.get<VisitanteResponse>(`${this.apiUrl}/visitantesF`);
  }

  //* Obtener Visitante por ID */
  getVisitante(id: number): Observable<Visitante> {
    return this.http.get<Visitante>(`${this.apiUrl}/visitantes/${id}`);
  }

  //* Actualizar Visitante con authenticacion*/
  updateVisitante(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put(`${this.apiUrl}/visitantes/${id}`, data, { headers });
  }

  //** Eliminar Visitante con authenticacion */
  deleteVisitante(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(`${this.apiUrl}/visitantes/${id}`, { headers });
  }


  obtenerEstadoPoliticas(): boolean {
    const accessToken = localStorage.getItem('auth_token');
    return accessToken !== null;
  }


}
