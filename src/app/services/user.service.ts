import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

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
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`,user)
  }
}
