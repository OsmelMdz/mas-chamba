import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export { PrestadoresResponse, Prestador };
interface Prestador {
  id: number;
  user_id: number;
  nombre: string;
  a_paterno: string;
  a_materno: string;
  fecha_nacimiento: Date;
  imagen: string;
  sexo: string;
  telefono: string;
  identificacion_personal: string;
  comprobante_domicilio: string;
  tipo_cuenta: string;
  estatus: string;
  imagenUrl?: string;
}

interface PrestadoresResponse {
  prestadores: Prestador[];
  links: any;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  apiUrl = 'http://127.0.0.1:8000/api';
  baseUrl = 'http://localhost:8100/public/storage/imagenes/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPrestadores(): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadores`, { headers });
  }

  /* getPrestadoresF(): Observable<PrestadoresResponse> {
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadoresF`);
  } */

  getPrestadoresF(): Observable<PrestadoresResponse> {
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadoresF`)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  private handleError(error: any): Observable<never> {
    console.error('Error fetching prestadores:', error);
    return throwError(error); // Use the throwError function from rxjs to return an Observable error
  }
  postPrestador(prestadorData: Prestador): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<PrestadoresResponse>(`${this.apiUrl}/prestadores`, prestadorData, { headers });
  }
}
