import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { map, tap } from 'rxjs/operators';
interface LoginResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint
    this.myApiUrl = '/api/users/'
  }

  signIn(user: User): Observable<any> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,user)
  }
  login(user: User): Observable<string> {
    return this.http.post<LoginResponse>(`${this.myAppUrl}${this.myApiUrl}login`, user).pipe(
      tap(response => {
        const token = response.token;
        // console.log('Token from server:', token);
        if (!token) {
          throw new Error('Token not found in server response');
        }
      }),
      // Transforma la respuesta del servidor (LoginResponse) en una cadena de texto (string)
      // para que sea compatible con el tipo esperado por el interceptor
      map(response => response.token)
    );
  }
}
