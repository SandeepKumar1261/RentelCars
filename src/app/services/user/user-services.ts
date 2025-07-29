import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}
  signup(userData: any): Observable<any> {
    console.log('int refgister backend');
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
