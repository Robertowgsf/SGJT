import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export abstract class ApiService {
    constructor(
        protected http: HttpClient,
        protected endpoint: string
    ) { }

    headers = {
        'Content-Type': 'application/json'
    };

    get(id = ""): Observable<any> {
        return this.http.get(`${environment.apiUrl}${this.endpoint}/${id}`, { headers: this.headers });
    }

    put(body: object = {}): Observable<any> {
        return this.http.put(`${environment.apiUrl}${this.endpoint}/`, JSON.stringify(body), { headers: this.headers })
    }

    post(body: object = {}): Observable<any> {
        return this.http.post(`${environment.apiUrl}${this.endpoint}/`, JSON.stringify(body), { headers: this.headers })
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}${this.endpoint}/?id=${id}`, { headers: this.headers })
    }
}