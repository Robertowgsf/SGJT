import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  register(user) {
    return this.http.post(`${environment.apiUrl}Auth/register`, user).pipe(map(data => {
      return data;
    }));
  }

  login(user) {
    return this.http.post(`${environment.apiUrl}Auth/login`, user).pipe(map(data => {
      var result = data as any;
      var token = result.token;
      var decodedToken = this.decodeToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("username", decodedToken.unique_name);
      localStorage.setItem("role", decodedToken.role);
      return data;
    }));
  }

  logout() {
    localStorage.clear();
  }

  decodeToken(token: string): any {
    var parts = token.split('.');
    var decoded = atob(parts[1]);

    return JSON.parse(decoded);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
