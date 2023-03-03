import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:8080/request";
const searchIdClient = "http://localhost:8080/request/searchIdClient";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  findById(id: number): Observable<undefined> {
    return this.http.get<undefined>(`${searchIdClient}/${id}`);
  }


}
