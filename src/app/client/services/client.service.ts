import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";

const baseUrl = "https://das-controle-de-projeto.herokuapp.com/client";

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

  update(data: any): Observable<any> {
    return this.http.put(baseUrl, data);
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