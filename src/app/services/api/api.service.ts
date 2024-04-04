import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly BASE_URL = "http://test-demo.aemenersol.com/api";
  constructor(private http: HttpClient) { }


  login(data: { username: string, password: string }) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.BASE_URL}/account/login`, data).subscribe(response => {
        resolve(response);
      });
    });
  }


  dashboard(): any {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.BASE_URL}/dashboard`).subscribe(response => {
        resolve(response);
      });
    });
  }

}
