import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(protected http: HttpClient) { 
    super(http, 'user')
  }
}
