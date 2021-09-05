import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) {}
  loginForm:FormGroup;
  Flag:boolean = false;
  errorMessage:any;

  onSubmit(data){
    if(data.valid){
      this._AuthService.signIn(data.value)
        .subscribe( 
        res =>{
          this.errorMessage = null;
          this.Flag = false;
          this._AuthService.saveUser(res.username, res.token, res.roles, res.expiresOn, res.email);
          $('button#signIn').html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`)
        },
        err =>{
              this.errorMessage = err.error;
              this.Flag = true;
              // console.clear();
          },
          () => {
            setTimeout(() => {
              this._Router.navigate(['/home'])
            }, 1000);
          }
        )
    }
  }

  togglePassword($event){
    $($event.target).toggleClass("fa-eye fa-eye-slash");
    let input = $($($event.target).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email":new FormControl(null , [Validators.required ,Validators.email] ),
      "password":new FormControl(null , [Validators.required ] ),
    })

    if (this._AuthService.currentUser.getValue() != null) {
      this._Router.navigate(['/home'])
    }
  }
}
