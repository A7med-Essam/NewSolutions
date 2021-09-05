import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import {ProjectDashboardService} from '../../Services/project-dashboard.service';
import {Section1} from '../../Interfaces/projects';

declare var $:any;

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss']
})
export class EditProjectsComponent implements OnInit {
  Section1:FormGroup;
  NewProject:FormGroup;
  selectedFile: File = null;
  AddNewProject:boolean = true;
  getSection1:Section1;


  constructor
    (
      private _ProjectDashboardService:ProjectDashboardService,
      private router:Router,
      private ActivatedRoute:ActivatedRoute
    )
    {
      let ProjectUrlPath = ActivatedRoute.snapshot.paramMap.get('new-project')
      if (ProjectUrlPath == "new-project") {
        this.AddNewProject = false;
      }
      else{
        this.AddNewProject = true;
      }
    }

  SetSection(data){
    $(`#section1 .header-content button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
    this._ProjectDashboardService.addSection(data.value).subscribe(()=>{
    this.router.navigate(['/our-projects'])
    },
    error => {
      console.log(error);
      $(`#section1 .header-content button.submit`).html(`Error Occurred!`)
    });
  }

  onFileChange(file: FileList) {
    this.selectedFile = file.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
  }

  SetProject(data){
    // change button to waiting...
    $(`#section1 .tab-content button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);

    // append photo
      const formData = new FormData();
      formData.append('File', this.selectedFile);

    // add project
    this.setProjectInfo(data,formData)
  }

  setProjectInfo(data,formData){
    this._ProjectDashboardService.addProjectImg(formData).subscribe( 
      () => {},
      error => 
      { 
        console.log(error.error);
        $(`#section1 .tab-content button.submit`).html(`Error Occurred!`)
      },
      ()=>
      {
          this.setProjectImg(data);
      }
    )
  }

  setProjectImg(data)
  {
    this._ProjectDashboardService.addProjectInfo(data.value).subscribe((res)=>{
      this.router.navigate(['/our-projects'])
      },
      error => {
        console.log(error.error);
        $(`#section1 .tab-content button.submit`).html(`Error Occurred!`)
      });
  }

  ngOnInit(): void {

    this.Section1 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] )
    });

    this.NewProject = new FormGroup({
      "BigTitle":new FormControl(null , [Validators.required ] ),
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "Category":new FormControl("Development" , [Validators.required ] ),
      "ImageUrl":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] )
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
          $('.tab-content .content img').attr('src', `${e.target.result}`);
      }
      reader.readAsDataURL(this.files[0]);
    });

    this.getSection();

  }

  getSection(){
    this._ProjectDashboardService.getSection().subscribe(res=>{
      this.getSection1 = res[0];
      this.Section1 = new FormGroup({
        "SmallTitle":new FormControl(this.getSection1?.smallTitle , [Validators.required ] ),
        "BigTitle1":new FormControl(this.getSection1?.bigTitle1 , [Validators.required ] ),
        "BigTitle2":new FormControl(this.getSection1?.bigTitle2 , [Validators.required ] ),
        "Details":new FormControl(this.getSection1?.details , [Validators.required ] )
      });
    })
  }

}
