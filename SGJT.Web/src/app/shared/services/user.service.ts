import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(protected http: HttpClient) {
    super(http, 'user')
  }

  addAssociation(firstId: number, secondId: string) {
    return this.http.post(`${environment.apiUrl}${this.endpoint}/addAssociation`, { firstId: firstId, secondId: secondId }, { headers: this.headers });
  }

  removeAssociation(firstId: number, secondId: number) {
    return this.http.post(`${environment.apiUrl}${this.endpoint}/removeAssociation`, { firstId: firstId, secondId: secondId }, { headers: this.headers });
  }
}
