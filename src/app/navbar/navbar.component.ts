import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import {ContactsDashboardService} from '../Services/contacts-dashboard.service';

declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  contactInfo:any;
  SocialMedia :any;
  userSearch:any;
  userName:string;
  isLogin:boolean = false;
  isAdmin:boolean = false;
  isSuperAdmin:boolean = false;
  today = new Date();
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();


  constructor(
    private _AuthService:AuthService,
    private _ContactsDashboardService:ContactsDashboardService,
    private router: Router
    ) {}

  ngOnInit(): void {
      this._AuthService.currentUser.subscribe((data)=>{
        if (data == null) {
          this.isLogin = false;
        }
        else{
          this.isLogin = true;
          this.userName = data[0]

          if (data[2][1] == "SuperAdmin" || data[2][2] == "SuperAdmin") {
            this.isSuperAdmin = true;
      	    this.isAdmin = true;
          }
          else if (data[2][1] == "Admin") {
            this.isAdmin = true;
          }
          else {
            this.isSuperAdmin = false;
            this.isAdmin = false;
          }
        }
      })

      this.getSocialMedia();
      this.getContactsInfo();

      // search overlay
      $('.search-btn,.search-close').click(function (e) { 
        let $searchbar = $('.overlay-search');
        e.preventDefault();
        $searchbar.toggleClass("open")
        return false;
      });

      this.userSearch = new FormGroup({
        "userText":new FormControl(null)
      })

      // control aside and navbar in resize mode
      $(window).resize(function(){
        if($(window).width() > "1199"){
          document.getElementById("mySidenav").style.width = "0";
          $("html,body").css({overflow : "auto"})
          $("#bodyOverlay").addClass("d-none");
          document.getElementById("bodyOverlay").style.width = "0";
        }else{
          document.getElementById("contactInfo").style.width = "0";
          $("html,body").css({overflow : "auto"})
          $("#bodyOverlay").addClass("d-none");
          document.getElementById("bodyOverlay").style.width = "0";
        }
      });
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

  // searching bar
  onSubmit(data:string){
    if (data == "clients" || data == "client") {
      this.router.navigate(['/our-clients'])
    }
    else if (data == "projects" || data == "project") {
      this.router.navigate(['/our-projects'])
    }
    else if (data == "employees" || data == "employee" || data == "about us" || data == "about") {
      this.router.navigate(['/about-us'])
    }
    else if (data == "reg" || data == "register" || data == "sign up") {
      this.router.navigate(['/register'])
    }
    else if (data == "sign in" || data == "login") {
      this.router.navigate(['/login'])
    }
    else if (data == "contact" || data == "contacts" || data == "send email" || data == "send message") {
      this.router.navigate(['/contact-us'])
    }
    else if (data == "dashboard" || data == "control panel") {
      this.router.navigate(['/dashboard'])
    }
    else{
      this.router.navigate(['/*'])
    }

    this.userSearch = new FormGroup({
      "userText":new FormControl(null)
    })
  }

  onLogOut(){
    this._AuthService.logOut();
    this.closeNav();
    this.isAdmin = false;
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    $("html,body").css({overflow : "hidden"})
    $("#bodyOverlay").removeClass("d-none");
    document.getElementById("bodyOverlay").style.width = "100%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $("html,body").css({overflow : "auto"})
    $("#bodyOverlay").addClass("d-none");
    document.getElementById("bodyOverlay").style.width = "0";
  }

  openInfoSidebar() {
    document.getElementById("contactInfo").style.width = "250px";
    $("html,body").css({overflow : "hidden"})
    $("#bodyOverlay").removeClass("d-none");
    document.getElementById("bodyOverlay").style.width = "100%";
  }

  
  closeInfoSidebar() {
    document.getElementById("contactInfo").style.width = "0";
    $("html,body").css({overflow : "auto"})
    $("#bodyOverlay").addClass("d-none");
    document.getElementById("bodyOverlay").style.width = "0";
  }
}
