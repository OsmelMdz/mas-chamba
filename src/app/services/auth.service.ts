import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../pages/login/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) { }


  login(user: User): Observable<User> {
    const csrfToken = localStorage.getItem('csrf_token') || '';
    console.log(csrfToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken
    });
    console.log(headers);
    return this.http.post<User>(`${this.apiUrl}/login`, user, { headers });
  }

  isAuth(): boolean {
    const token = localStorage.getItem('auth_token');
    console.log(token);
    return !!token;
  }

  logout() {
    const csrfToken = localStorage.getItem('csrf_token') || '';
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': csrfToken
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }
}
