import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDashboardService } from 'src/app/Services/client-dashboard.service';
import {Section1} from '../../Interfaces/clients';

declare var $:any;

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss']
})
export class EditClientsComponent implements OnInit {
  Section1:FormGroup;
  getSection1:Section1;

  NewClient:FormGroup;
  selectedFile: File = null;
  AddNewClient:boolean = true;
  constructor(private _ClientDashboardService:ClientDashboardService, private router:Router, private ActivatedRoute:ActivatedRoute) {
      let ClientUrlPath = ActivatedRoute.snapshot.paramMap.get('new-client')
      if (ClientUrlPath == "new-client") {
        this.AddNewClient = false;
      }
      else{
        this.AddNewClient = true;
      }
    }

  SetSection(data){
    $(`#section2 .header-content button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
    this._ClientDashboardService.addSection(data.value).subscribe(()=>{
    this.router.navigate(['/our-clients'])
    },
    error => {
      console.log(error);
      $(`#section2 .header-content button.submit`).html(`Error Occurred!`)
    });
  }

  onFileChange(file: FileList) {
    this.selectedFile = file.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
  }

  SetClient(data){
    $(`#section2 .team-info button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
    const formData = new FormData();
    formData.append('File', this.selectedFile);
    this._ClientDashboardService.addClientImg(formData).subscribe((res)=>{} ,
    error => { 
      console.log(error.error);
      $(`#section2 .team-info button.submit`).html(`Error Occurred!`)
    },
    ()=>{
      data.value.ImageUrl=null;
      this._ClientDashboardService.addClientInfo(data.value).subscribe((res)=>{
        this.router.navigate(['/dashboard'])
        },
        error => {
          console.log(error.error);
          $(`#section1 .team-info button.submit`).html(`Error Occurred!`)
        });
    })
  }

  ngOnInit(): void {
    this.Section1 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] )
    });

    this.NewClient = new FormGroup({
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

      this.getSection();
  }

  getSection(){
    this._ClientDashboardService.getSection().subscribe(res=>{
      this.getSection1 = res[0];
      this.Section1 = new FormGroup({
        "SmallTitle":new FormControl(this.getSection1?.smallTitle , [Validators.required ] ),
        "BigTitle1":new FormControl(this.getSection1?.bigTitle1 , [Validators.required ] ),
        "BigTitle2":new FormControl(this.getSection1?.bigTitle2 , [Validators.required ] )
      });
    })
  }
}
