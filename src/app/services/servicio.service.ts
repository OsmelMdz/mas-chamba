import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export { ServiciosResponse };

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  imagen:string;
  prestador_id: number;
}

interface ServiciosResponse {
  data: Servicio[];
  links: any;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getServicios(): Observable<ServiciosResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<ServiciosResponse>(`${this.apiUrl}/servicios`, { headers });
  }

}
