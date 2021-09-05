import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IContacts } from '../Interfaces/contacts';
import {ContactsDashboardService} from '../Services/contacts-dashboard.service';
import 'smtpJs/smtp.js';
declare let Email: any;

declare var $:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  sendEmail:FormGroup;
  contactInfo:IContacts;
  constructor(private _ContactsDashboardService:ContactsDashboardService, private router:Router) { }


  getSection(){
    this._ContactsDashboardService.getSection().subscribe( res =>{
      this.contactInfo = res[0];
    }, error =>{
      console.log(error);
    })
  }
  
  ngOnInit(): void {
    this.getSection();

    this.sendEmail = new FormGroup({
      "userName":new FormControl(null , [Validators.required ] ),
      "email":new FormControl(null , [Validators.required , Validators.email] ),
      "message":new FormControl(null , [Validators.required ] ),
    })
  }

  onSubmit(data){
    Email.send({
      Host : "smtp.gmail.com",
      // Username : "newsolutions.dev@gmail.com",
      Username : "newsystemsolutions.development@gmail.com",
      Password : "NewSolutions2020",
      // To : 'newsolutions.dev@gmail.com',
      To : 'newsystemsolutions.development@gmail.com',
      Subject : data.userName + " sent mail from NewSolutions website",
      From : data.email,
      Body : data.message
    })
    .then( 
      message => {
        // console.log(message)
        $(`#section1 button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
        setTimeout(() => {
          // this.router.navigate(['/home'])
          $(`#section1 button.submit`).addClass("text-success");
        $(`#section1 button.submit`).html(`Message sent successfully`);
        }, 2000);

        setTimeout(() => {
        $(`#section1 button.submit`).removeClass("text-success");
        $(`#section1 button.submit`).addClass("contact-btn");
        $(`#section1 button.submit`).html(`SEND MESSAGE`);
        }, 6000);
      },
      error =>{
        console.log(error)
      }
    )
  }

}
