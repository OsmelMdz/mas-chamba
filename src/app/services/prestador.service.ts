import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}

interface PrestadoresResponse {
  [prestadores: string]: any[];
  links: any;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPrestadores(): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadores`, { headers });
  }

  getPrestadoresF(): Observable<PrestadoresResponse> {
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadoresF`);
  }
}
