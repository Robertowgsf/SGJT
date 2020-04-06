import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../models/base/response.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export abstract class ApiService {
    constructor(
        protected http: HttpClient,
        protected endpoint: string
    ) { }
    
    headers = {
        'Content-Type': 'application/json'
    };

    get(query: string = '', odataFormat = true): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/${this.endpoint}?${query}`, { headers: this.headers });
    }

    put(body: object = {}): Observable<Response> {
        return this.http.put(`${environment.apiUrl}/api/${this.endpoint}/`, JSON.stringify(body), { headers: this.headers })
            .pipe(map(data => data as Response));
    }

    post(body: object = {}): Observable<Response> {
        return this.http.post(`${environment.apiUrl}/api/${this.endpoint}/`, JSON.stringify(body), { headers: this.headers })
            .pipe(map(data => data as Response));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${environment.apiUrl}/api/${this.endpoint}/?id=${id}`, { headers: this.headers })
            .pipe(map(data => data as Response));
    }
}