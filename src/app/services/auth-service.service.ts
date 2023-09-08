import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(){
    const token = localStorage.getItem('accessToken')
    if (token) {
      return token;
    } else{
      return '';
    }
  }

  async setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() {
    return localStorage.hasOwnProperty('accessToken');
  }

  login(payload: Object) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, payload);
  }

  logout() {
    const token = this.getToken() || '';
    if (!token) {
      return
    }
    const headerDict = {
      'Content-Type': 'application/json',
      'X-Authorization': token
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict),
    };
    
    this.http.get(`${environment.apiUrl}/auth/logout`, requestOptions);
    this.removeToken();
  }
}
