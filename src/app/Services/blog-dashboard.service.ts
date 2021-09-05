import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogDashboardService {
  baseUrl = environment.baseUrl
  constructor(private _HttpClient: HttpClient) {   }

  getReviews(id,pageNumber,pageSize): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/blog/getReviews?id=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  addReview(data): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/blog/AddReview`, data);
  }
}
