import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeDashboardService {
  baseUrl = environment.baseUrl
  
  constructor(private _HttpClient: HttpClient) {   }

  getSection(sectionNumber): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/Home/HomeSection${sectionNumber}`);
  }

  addSection(data,sectionNumber): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/Home/HomeSection${sectionNumber}`, data);
  }
  
}
