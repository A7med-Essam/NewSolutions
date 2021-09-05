import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDashboardService {
  baseUrl = environment.baseUrl
  constructor(private _HttpClient: HttpClient) { }

  getSection(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/OurClients/ClientsSection1`);
  }

  addSection(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/OurClients/ClientsSection1`, data);
  }

  addClientInfo(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/OurClients/AddClientsInfo`, data);
  }

  addClientImg(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/OurClients/AddClientsImg`, data);
  }

  getClientInfo(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/OurClients/getClientsInfo`);
  }

  getClientImg(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/OurClients/getClientsImg`);
  }

  updateClientInfo(data): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/OurClients/updateClientsInfo`,data);
  }

  deleteClientInfo(ClientId:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('id', ClientId.toFixed());
    return this._HttpClient.delete(`${this.baseUrl}/OurClients/deleteClientsInfo`, { params });
  }

  deleteClientImg(ClientId:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('id', ClientId.toFixed());
    return this._HttpClient.delete(`${this.baseUrl}/OurClients/deleteClientsImg`, { params });
  }
}
