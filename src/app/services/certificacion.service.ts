import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
export { CertificacionesResponse, Certificacion };

interface Certificacion {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  estatus: string;
  tipo:string;
}

interface CertificacionesResponse {
  servicios: Certificacion[];
  links: any;
  meta: any;
}
@Injectable({
  providedIn: 'root'
})
export class CertificacionService {
  apiUrl = 'http://127.0.0.1:8000/api';

  getNewProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

    //** Obtener Certificado */
  getCertificaciones(): Observable<Certificacion[]> {
    return this.http.get<Certificacion[]>(`${this.apiUrl}/certificaciones`);
  }

  //* Nuevo Certificado */
  newCertificacion(datos: any): Observable<Certificacion> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Certificacion>(`${this.apiUrl}/certificaciones`, datos, { headers });
  }
}
