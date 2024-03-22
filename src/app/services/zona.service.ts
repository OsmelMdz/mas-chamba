import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
export{ZonasResponse, Zona}
interface Zona {
  id: number;
  nombre: string;
}

interface ZonasResponse {
  servicios: Zona[];
  links: any;
  meta: any;
}
@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  apiUrl = 'http://127.0.0.1:8000/api';
  getNewProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  //** Obtener Zonas */
  getZonas(): Observable<Zona[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Zona[]>(`${this.apiUrl}/zonas`, { headers });
  }

  //** Crear Zona */
  newZona(datos: any): Observable<Zona> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Zona>(`${this.apiUrl}/zonas`, datos, { headers });
  }

  //** Actualizar Zona */
  updateZona(id: number, datos: any): Observable<Zona> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<Zona>(`${this.apiUrl}/zonas/${id}`, datos, { headers });
  }

  //** Eliminar Zona */
  deleteZona(id: number): Observable<Zona> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete<Zona>(`${this.apiUrl}/zonas/${id}`, { headers });
  }

}
