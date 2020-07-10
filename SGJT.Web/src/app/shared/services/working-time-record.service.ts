import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimeRecordService extends ApiService {

  constructor(protected http: HttpClient) { 
    super(http, 'workingTimeRecord')
  }

  registerWorkingTimeRecord(workingTimeRecord) {
    return this.http.post(`${environment.apiUrl}${this.endpoint}/registerWorkingTimeRecord`, JSON.stringify(workingTimeRecord), { headers: this.headers });
  }

  getByUsername(username) {
    return this.http.get(`${environment.apiUrl}${this.endpoint}/getByUsername/${username}`, { headers: this.headers });
  }
}
