import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) { }

  private defaultHeaders = new HttpHeaders({
    "content-type": "application/json",
    "Accept": "application/json"
  })

  public env = environment

  api(url: string): string {
    let base = this.env.apiBaseUrl
    const endpoint = `${base}/${url}`
    console.log(endpoint);
    
    return endpoint
  }

  get<T>(endpoint: string, headers?: HttpHeaders, params?: HttpParams): Observable<T | T[] | object> {
    return this.http.get(this.api(endpoint), { headers, params })
  }

  post<T>(url: string, body: any, headers?: HttpHeaders, params?: HttpParams): Observable<T | object> {
    return this.http.post(this.api(url), body, {headers, params})
  }

  delete<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<T | object> {
    return this.http.delete(this.api(url), { headers, params });
  }

}