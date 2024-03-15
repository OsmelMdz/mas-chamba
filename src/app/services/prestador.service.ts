import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export { PrestadoresResponse };


interface Prestador {
  id: number;
  nombre: string;
  a_paterno: string;
  a_materno: string;
  fecha_nacimiento: Date;
  telefono: string;
  sexo: string;
  imagen: string;
  cursos: Curso[];
  certificaciones: Certificacion[];
  servicios: Servicio[];
  zonas: Zona[];
}

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Certificacion {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Zona {
  id: number;
  nombre: string;
  prestador_id: number;
}

interface PrestadoresResponse {
  data: Prestador[];
  links: any;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPrestadores(): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadores`, { headers });
  }

  getPrestador(id: number): Observable<Prestador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Prestador>(`${this.apiUrl}/prestadores/${id}`, { headers });
  }

  getPrestadoresInlcudes(): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadores?&includeCursos=true&includeCertificaciones=true&includeServicios=true&includeZonas=true`, { headers });
  }

  getPrestadoresPremiun(): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadores?&includeCursos=true&includeCertificaciones=true&includeServicios=true&includeZonas=true&tipo_cuenta[eq]=Premiun`, { headers });
  }

  getPrestadoresNormal(): Observable<PrestadoresResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<PrestadoresResponse>(`${this.apiUrl}/prestadores?&includeCursos=true&includeCertificaciones=true&includeServicios=true&includeZonas=true&tipo_cuenta[eq]=Normal`, { headers });
  }
}
