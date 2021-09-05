import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../Services/auth.service';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  ErrorMessage:any;
  constructor(private _AuthService:AuthService, private router:Router) { }
  
  ngOnInit(): void { 
    this.registerForm = new FormGroup({
      "firstName":new FormControl(null , [Validators.required ] ),
      "lastName":new FormControl(null , [Validators.required ] ),
      "userName":new FormControl(null , [Validators.required ] ),
      "email":new FormControl(null , [Validators.required ,Validators.email] ),
      "password":new FormControl(null , [Validators.required , Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')] )
    })
  }

  onSubmit(data){
    this._AuthService.signUp(data).subscribe(res=>{
      $('form button#submit').html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
      setTimeout(() => {
        this.router.navigate(["/login"])
      }, 1000);
    },
      error=>{
      $('form button#submit').html(`Error Occurred!`);
      this.ErrorMessage = error.error;
      console.log(error)
      });
  }

}