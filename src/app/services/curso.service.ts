import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
export { CursosResponse, Curso };

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

interface CursosResponse {
  cursos: Curso[];
  links: any;
  meta: any;
}
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  apiUrl = 'http://127.0.0.1:8000/api';

  getNewProduct: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private authService: AuthService) { }

  //* Obtener Curso */
  getCursos(): Observable<Curso[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Curso[]>(`${this.apiUrl}/cursos`, { headers });
  }
  //* Nuevo Curso */
  newCurso(datos: any): Observable<Curso> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Curso>(`${this.apiUrl}/cursos`, datos, { headers });
  }
}

