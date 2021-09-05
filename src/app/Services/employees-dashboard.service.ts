import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeesDashboardService {

  baseUrl = environment.baseUrl
  constructor(private _HttpClient: HttpClient) { }

  AddEmployeesInfo(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/OurEmployees/AddEmployeesInfo`, data);
  }

  AddEmployeesImg(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/OurEmployees/AddEmployeesImg`, data);
  }

  getEmployeesInfo(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/OurEmployees/getEmployeesInfo`);
  }

  getEmployeesImg(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/OurEmployees/getEmployeesImg`);
  }

  updateEmployeesInfo(data): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/OurEmployees/updateEmployeesInfo`,data);
  }

  deleteEmployeesInfo(EmployeeId:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('id', EmployeeId.toFixed());
    return this._HttpClient.delete(`${this.baseUrl}/OurEmployees/deleteEmployeesInfo`, { params });
  }

  deleteEmployeesImg(EmployeeId:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('id', EmployeeId.toFixed());
    return this._HttpClient.delete(`${this.baseUrl}/OurEmployees/deleteEmployeesImg`, { params });
  }
}
