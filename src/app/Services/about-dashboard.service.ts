import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutDashboardService {
  baseUrl = environment.baseUrl
  constructor(private _HttpClient: HttpClient) {   }

  getSection(sectionNumber): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/About/AboutSection${sectionNumber}`);
  }

  addSection(data,sectionNumber): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/About/AboutSection${sectionNumber}`, data);
  }
}
