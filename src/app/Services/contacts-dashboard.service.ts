import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {IContacts} from '../Interfaces/contacts'

@Injectable({
  providedIn: 'root'
})
export class ContactsDashboardService {
  ContactsInfo:BehaviorSubject<IContacts> = new BehaviorSubject<IContacts>(null);
  SocialMedia = new BehaviorSubject(null);
  baseUrl = environment.baseUrl
  
  constructor(private _HttpClient: HttpClient) {   }

  getSection(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Contacts/ContactsSection1`);
  }

  getSocialMedia(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Contacts/SocialMedia`);
  }

  addSection(data, CurrentSection): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/Contacts/${CurrentSection}`, data);
  }

  SaveCurrentContactsInfo(data){
    this.ContactsInfo.next(data);
  }

  SaveCurrentSocialMedia(data){
    this.SocialMedia.next(data);
  }
  
}
