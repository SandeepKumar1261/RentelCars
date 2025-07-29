import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:5000/api/cars';

  constructor(private http: HttpClient) {}

  addCar(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateCar(id: string, formData: FormData): Observable<any> {
    console.log('in the upadetd car');
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteCar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCars(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
