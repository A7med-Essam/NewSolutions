import {Component,OnInit } from '@angular/core';
import {ContactsDashboardService} from '../Services/contacts-dashboard.service';

declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  
  contactInfo :any;
  SocialMedia :any;

  constructor(private _ContactsDashboardService:ContactsDashboardService) {}

    getContactsInfo(){
      this._ContactsDashboardService.ContactsInfo.subscribe((res)=>{
        if (res == null) {
          this._ContactsDashboardService.getSection().subscribe( res =>{
            this.contactInfo = res[0];
          }, error =>{
            console.log(error);
          })
        } 
        else {
          this.contactInfo = res;
        }
      },
      error =>{
        console.log(error);
      })
    }

    getSocialMedia(){
      this._ContactsDashboardService.SocialMedia.subscribe((res)=>{
        if (res == null) {
          this._ContactsDashboardService.getSocialMedia().subscribe( res =>{
            this.SocialMedia = res[0];
          }, error =>{
            console.log(error);
          })
        } 
        else {
          this.SocialMedia = res;
        }
      },
      error =>{
        console.log(error);
      })
    }

  ngOnInit(): void {
    this.getSocialMedia()
    this.getContactsInfo()
  }
  
}
