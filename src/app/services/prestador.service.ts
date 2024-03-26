import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export { PrestadoresResponse, Prestador };
interface Prestador {
  tipo: string;
  id: number;
  user_id: number;
  oficio: string;
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
  zona_id: number;
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
  getPrestadoresA() {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'http://127.0.0.1:8000/api';
  getNewProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  //* Obtener Prestadores con authenticacion*/
  getPrestadores(): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadores`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  //* Obtener Prestadores sin authenticacion */
  getPrestadoresF(): Observable<PrestadoresResponse> {
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadoresF`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //* Obtener Prestador por ID */
  getPrestador(id: number): Observable<Prestador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Prestador>(`${this.apiUrl}/prestadores/${id}`, { headers });
  }

  //* Nuevo Prestador */
  newPrestador(datos: any): Observable<Prestador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Prestador>(`${this.apiUrl}/prestadores`, datos, { headers });
  }

  private handleError(error: any): Observable<never> {
    console.error('Error fetching prestadores:', error);
    return throwError(error); //
  }

  //**Eliminar Prestador */
  deletePrestador(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(`${this.apiUrl}/prestadores/${id}`, { headers });
  }

}
