import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectDashboardService {

  baseUrl = environment.baseUrl
  
  constructor(private _HttpClient: HttpClient) {   }

  getSection(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Projects/ProjectsSection1`);
  }

  addSection(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/Projects/ProjectsSection1`, data);
  }

  addProjectInfo(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/Projects/AddProjectInfo`, data);
  }

  addProjectImg(data): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/Projects/AddProjectImg`, data);
  }

  getProjectsInfo(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Projects/getProjectsInfo`);
  }

  getProjectsImg(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Projects/getProjectsImg`);
  }

  getProjectsInfoById(id): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Projects/getProjectsInfoById?id=${id}`);
  }

  getProjectsImgById(id): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Projects/getProjectsImgById?id=${id}`);
  }

  updateProjectsInfo(data): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/Projects/updateProjectInfo`,data);
  }

  deleteProjectsInfo(ProjectsId:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('id', ProjectsId.toFixed());
    return this._HttpClient.delete(`${this.baseUrl}/Projects/deleteProjectInfo`, { params });
  }

  deleteProjectsImg(ProjectsId:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('id', ProjectsId.toFixed());
    return this._HttpClient.delete(`${this.baseUrl}/Projects/deleteProjectImg`, { params });
  }
}
