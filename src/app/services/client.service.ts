import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";

const baseUrl = "http://localhost:8080/client";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(baseUrl);
  }

  get(id: any): Observable<ClientModel> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${baseUrl}?title=${title}`);
  }
}
