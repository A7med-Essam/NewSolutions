import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesDashboardService } from 'src/app/Services/employees-dashboard.service';

declare var $:any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  NewEmployee:FormGroup;
  selectedFile: File = null;
  constructor(private _EmployeesDashboardService:EmployeesDashboardService, private router:Router) { }

  onFileChange(file: FileList) {
    this.selectedFile = file.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
  }

  SetEmployee(data){
    $(`#section2 .team-info button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
    const formData = new FormData();
    formData.append('File', this.selectedFile);
    this._EmployeesDashboardService.AddEmployeesImg(formData).subscribe((res)=>{} ,
    error => { 
      console.log(error.error);
      $(`#section2 .team-info button.submit`).html(`Error Occurred!`)
    },
    ()=>{
      data.value.ImageUrl=null;
      this._EmployeesDashboardService.AddEmployeesInfo(data.value).subscribe((res)=>{
        this.router.navigate(['/dashboard'])
        },
        error => {
          console.log(error.error);
          $(`#section1 .team-info button.submit`).html(`Error Occurred!`)
        });
    })
  }

  ngOnInit(): void {

    this.NewEmployee = new FormGroup({
      "ImageUrl":new FormControl(null , [Validators.required ] ),
      "Name":new FormControl(null , [Validators.required ] ),
      "JobTitle":new FormControl(null , [Validators.required ] ),
      "TwitterUrl":new FormControl(null , [Validators.required ] ),
      "LinkedInUrl":new FormControl(null , [Validators.required ] ),
      "FacebookUrl":new FormControl(null , [Validators.required ] ),
      "instegramUrl":new FormControl(null , [Validators.required ] )
    });

        ( function ( document, window, index )
      {
        var inputs = document.querySelectorAll( '.inputfile' );
        Array.prototype.forEach.call( inputs, function( input )
        {
          var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;

          input.addEventListener( 'change', function( e )
          {
            var fileName = '';
            if( this.files && this.files.length > 1 )
              fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
              fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
              label.querySelector( 'span' ).innerHTML = fileName;
            else
              label.innerHTML = labelVal;
          });

          // Firefox bug fix
          input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
          input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
        });
      }( document, window, 0 ));

      (function(e,t,n)
      {var r=e.querySelectorAll("html")
      [0];r.className=r.className.replace(/(^|\s)no-js(\s|$)/,"$1js$2")})
      (document,window,0);

      $('input[type="file"]').change(function (e) { 
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.teamMembers img').attr('src', `${e.target.result}`);
        }
        reader.readAsDataURL(this.files[0]);
      });
  }

}
