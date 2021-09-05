import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsDashboardService } from 'src/app/Services/contacts-dashboard.service';
import { IContacts,SocialMedia } from '../../Interfaces/contacts';

declare var $:any;
@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.scss']
})
export class EditContactsComponent implements OnInit {

  Section1:FormGroup;
  SocialMedia:FormGroup;
  contactInfo:IContacts;
  getSocialMediaInfo:SocialMedia;

  constructor(private _ContactsDashboardService:ContactsDashboardService, private router:Router) { }

  SetSection(data, currentForm){
    if (currentForm == '1') {
      $(`#section1 .contact-info button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
      this._ContactsDashboardService.addSection(data.value,"ContactsSection1").subscribe(()=>{
        this._ContactsDashboardService.SaveCurrentContactsInfo(data.value);
        this.router.navigate(['/contact-us']);
      },
      error => {
        console.log(error);
        $(`#section1 .contact-info button.submit`).html(`Error Occurred!`)
      });
    } 
    else {
      $(`#SocialMedia button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
      this._ContactsDashboardService.addSection(data.value,"SocialMedia").subscribe(()=>{
        this._ContactsDashboardService.SaveCurrentSocialMedia(data.value);
        this.router.navigate(['/contact-us']);
      },
      error => {
        console.log(error);
        $(`#SocialMedia button.submit`).html(`Error Occurred!`)
      });
    }
  }

  ngOnInit(): void {
    this.Section1 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] ),
      "Address":new FormControl(null , [Validators.required ] ),
      "Email":new FormControl(null , [Validators.required, Validators.email ] ),
      "Phone":new FormControl(null , [Validators.required ] )
    })

    this.SocialMedia = new FormGroup({
      "TwitterUrl":new FormControl(null , [Validators.required ] ),
      "FacebookUrl":new FormControl(null , [Validators.required ] ),
      "LinkedInUrl":new FormControl(null , [Validators.required ] ),
      "InstegramUrl":new FormControl(null , [Validators.required ] )
    })

    this.getSection();
    this.getSocialMedia();
  }

  getSection(){
    this._ContactsDashboardService.getSection().subscribe( res =>{
      this.contactInfo = res[0];
      this.Section1 = new FormGroup({
        "SmallTitle":new FormControl(this.contactInfo?.smallTitle , [Validators.required ] ),
        "BigTitle1":new FormControl(this.contactInfo?.bigTitle1 , [Validators.required ] ),
        "BigTitle2":new FormControl(this.contactInfo?.bigTitle2 , [Validators.required ] ),
        "Details":new FormControl(this.contactInfo?.details , [Validators.required ] ),
        "Address":new FormControl(this.contactInfo?.address , [Validators.required ] ),
        "Email":new FormControl(this.contactInfo?.email , [Validators.required, Validators.email ] ),
        "Phone":new FormControl(this.contactInfo?.phone , [Validators.required ] )
      })
    }, error =>{
      console.log(error);
    })
  }

  getSocialMedia(){
    this._ContactsDashboardService.getSocialMedia().subscribe( res =>{
      this.getSocialMediaInfo = res[0];
      this.SocialMedia = new FormGroup({
        "TwitterUrl":new FormControl(this.getSocialMediaInfo?.twitterUrl , [Validators.required ] ),
        "FacebookUrl":new FormControl(this.getSocialMediaInfo?.facebookUrl , [Validators.required ] ),
        "LinkedInUrl":new FormControl(this.getSocialMediaInfo?.linkedInUrl , [Validators.required ] ),
        "InstegramUrl":new FormControl(this.getSocialMediaInfo?.instegramUrl , [Validators.required ] )
      })
    },
    error =>{
      console.log(error);
    })
  }
}
