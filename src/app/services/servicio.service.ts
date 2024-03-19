import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export { ServiciosResponse, Servicio };

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  imagen:string;
}

interface ServiciosResponse {
  servicios: Servicio[];
  links: any;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getServicios(): Observable<Servicio[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios`, { headers });
  }

}
