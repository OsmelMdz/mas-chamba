import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
export { ServiciosResponse, Servicio };

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
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

  getNewProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }
    
  //* Obtener Servicio */
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios`).pipe(
      catchError(this.handleError)
    );;
  }
  //* Nuevo Servicio */
  newServicio(datos: any): Observable<Servicio> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Servicio>(`${this.apiUrl}/servicios`, datos, { headers });
  }

  private handleError(error: any): Observable<never> {
    console.error('Error fetching prestadores:', error);
    return throwError(error); // Use the throwError function from rxjs to return an Observable error
  }
}
