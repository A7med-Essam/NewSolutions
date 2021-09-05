import { Component, OnInit } from '@angular/core';
import { AboutDashboardService } from 'src/app/Services/about-dashboard.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IAboutSection1,IAboutSection2,IAboutSection3 } from '../../Interfaces/About';

declare var $:any;
@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit {
  Section1:any; Section2:any; Section3:any;
  
  getSection1:IAboutSection1;
  getSection2:IAboutSection2;
  getSection3:IAboutSection3;

  constructor(private _AboutDashboardService : AboutDashboardService, private router:Router) { }

  ngOnInit(): void {
    this.Section1 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] ),
      "DetailsRegular":new FormControl(null , [Validators.required ] ),
      "DetailsBold":new FormControl(null , [Validators.required ] ),
      "VideoLink":new FormControl(null , [Validators.required ] )
    })

    this.Section2 = new FormGroup({
      "SmallTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] ),
      "SmallTitle2":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] )
    })

    this.Section3 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] )
    })

    this.getSection(1);
    this.getSection(2);
    this.getSection(3);
  }

  SetSection(data, sectionNumber:string){
      $(`#section${sectionNumber} button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
      this._AboutDashboardService.addSection(data.value,sectionNumber).subscribe(()=>{
      this.router.navigate(['/about-us'])
      },
      error => {
        console.log(error);
        $(`#section${sectionNumber} button.submit`).html(`Error Occurred!`)
      });
  }

  getSection(sectionNumber){
    this._AboutDashboardService.getSection(sectionNumber).subscribe( res =>{
      switch(sectionNumber) {
        case 1:
          this.getSection1 = res[0];
          this.Section1 = new FormGroup({
            "SmallTitle":new FormControl(this.getSection1?.smallTitle , [Validators.required ] ),
            "BigTitle1":new FormControl(this.getSection1?.bigTitle1 , [Validators.required ] ),
            "BigTitle2":new FormControl(this.getSection1?.bigTitle2 , [Validators.required ] ),
            "DetailsRegular":new FormControl(this.getSection1?.detailsRegular , [Validators.required ] ),
            "DetailsBold":new FormControl(this.getSection1?.detailsBold , [Validators.required ] ),
            "VideoLink":new FormControl(this.getSection1?.videoLink , [Validators.required ] )
          })
          break;
        case 2:
          this.getSection2 = res[0];
          this.Section2 = new FormGroup({
            "SmallTitle1":new FormControl(this.getSection2?.smallTitle1 , [Validators.required ] ),
            "BigTitle1":new FormControl(this.getSection2?.bigTitle1 , [Validators.required ] ),
            "BigTitle2":new FormControl(this.getSection2?.bigTitle2 , [Validators.required ] ),
            "SmallTitle2":new FormControl(this.getSection2?.smallTitle2 , [Validators.required ] ),
            "Details":new FormControl(this.getSection2?.details , [Validators.required ] )
          })
          break;
      default:
          this.getSection3 = res[0];
          this.Section3 = new FormGroup({
            "SmallTitle":new FormControl(this.getSection3?.smallTitle , [Validators.required ] ),
            "BigTitle1":new FormControl(this.getSection3?.bigTitle1 , [Validators.required ] ),
            "BigTitle2":new FormControl(this.getSection3?.bigTitle2 , [Validators.required ] ),
            "Details":new FormControl(this.getSection3?.details , [Validators.required ] )
          })
      }
    }, error =>{
      console.log(error);
    })
  }

}
