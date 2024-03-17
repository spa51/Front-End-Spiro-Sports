import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint
    this.myApiUrl = '/api/locations/'
  }

  getListLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteLocation(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveLocation(location: Location): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,location)
  }

  getLocation(id:number): Observable<Location>{
    return this.http.get<Location>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateLocation(id:number, location:Location): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,location)
  }
}
