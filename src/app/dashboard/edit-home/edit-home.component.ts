import { Component, OnInit } from '@angular/core';
import { HomeDashboardService } from 'src/app/Services/home-dashboard.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IHome,IHomeCard,IHomeSection3,IHomeSection5,IHomeSlider } from '../../Interfaces/home';

declare var $:any;

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {
  
  Section1:FormGroup; Section2:FormGroup; Section3:FormGroup; Section4:FormGroup; Section5:FormGroup; Section6:FormGroup; Section7:FormGroup;
  CardForm1:FormGroup; CardForm2:FormGroup; CardForm3:FormGroup;
  SliderForm1:FormGroup; SliderForm2:FormGroup;

  GetSection1:IHome;  GetSection2:IHome;  GetSection3:IHomeSection3;  GetSection4:IHome;
  GetSection5:IHomeSection5;  GetSection6:IHome;  GetSection7:IHome;
  section7Slider1:IHomeSlider; section7Slider2:IHomeSlider;
  section4Card1:IHomeCard; section4Card2:IHomeCard; section4Card3:IHomeCard;

  constructor(private _HomeDashboardService : HomeDashboardService, private router:Router) { }

SetSection(data, sectionNumber:string){
  let getSection = sectionNumber.charAt(0);
  if (getSection == '1') {
    $(`#header-section button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
  }
  else{
    $(`#section${getSection} button.submit`).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
  }

    this._HomeDashboardService.addSection(data.value,sectionNumber).subscribe(()=>{
    this.router.navigate(['/home'])
    },
    error => {
      console.log(error);
    if (getSection == '1') {
      $(`#header-section button.submit`).html(`Error Occurred!`)
      }
      else{
        $(`#section${getSection} button.submit`).html(`Error Occurred!`)
      }
    });
}

getSection(sectionNumber){
  this._HomeDashboardService.getSection(sectionNumber).subscribe( res =>{
    switch(sectionNumber) {
      case 1:
        this.GetSection1 = res[0];
        this.Section1 = new FormGroup({
          "SmallTitle":new FormControl(this.GetSection1?.smallTitle , [Validators.required ] ),
          "BigTitle1":new FormControl(this.GetSection1?.bigTitle1 , [Validators.required ] ),
          "BigTitle2":new FormControl(this.GetSection1?.bigTitle2 , [Validators.required ] )
        })
        break;
      case 2:
        this.GetSection2 = res[0];
        this.Section2 = new FormGroup({
          "SmallTitle":new FormControl(this.GetSection2?.smallTitle , [Validators.required ] ),
          "BigTitle1":new FormControl(this.GetSection2?.bigTitle1 , [Validators.required ] ),
          "BigTitle2":new FormControl(this.GetSection2?.bigTitle2 , [Validators.required ] )
        })
        break;
      case 3:
        this.GetSection3 = res[0];
        this.Section3 = new FormGroup({
          "SmallTitle":new FormControl(this.GetSection3?.smallTitle , [Validators.required ] ),
          "BigTitle1":new FormControl(this.GetSection3?.bigTitle1 , [Validators.required ] ),
          "BigTitle2":new FormControl(this.GetSection3?.bigTitle2 , [Validators.required ] ),
          "Details":new FormControl(this.GetSection3?.details , [Validators.required ] ),
          "ActiveClients":new FormControl(this.GetSection3?.activeClients , [Validators.required ] ),
          "ProjectsDone":new FormControl(this.GetSection3?.projectsDone , [Validators.required ] ),
          "TeamAdvisors":new FormControl(this.GetSection3?.teamAdvisors , [Validators.required ] ),
          "GloriousYears":new FormControl(this.GetSection3?.gloriousYears , [Validators.required ] )
        })
        break;
      case 4:
        this.GetSection4 = res[0];
        this.Section4 = new FormGroup({
          "SmallTitle":new FormControl(this.GetSection4?.smallTitle , [Validators.required ] ),
          "BigTitle1":new FormControl(this.GetSection4?.bigTitle1 , [Validators.required ] ),
          "BigTitle2":new FormControl(this.GetSection4?.bigTitle2 , [Validators.required ] )
        })
        break;
      case "4-card1":
        this.section4Card1 = res[0];
        this.CardForm1 = new FormGroup({
          "CardTitle":new FormControl(this.section4Card1?.cardTitle , [Validators.required ] ),
          "CardDetails":new FormControl(this.section4Card1?.cardDetails , [Validators.required ] ),
          "CardFooter1":new FormControl(this.section4Card1?.cardFooter1 , [Validators.required ] ),
          "CardFooter2":new FormControl(this.section4Card1?.cardFooter2 , [Validators.required ] ),
          "CardFooter3":new FormControl(this.section4Card1?.cardFooter3 , [Validators.required ] )
        })
        break;
      case "4-card2":
        this.section4Card2 = res[0];
        this.CardForm2 = new FormGroup({
          "CardTitle":new FormControl(this.section4Card2?.cardTitle , [Validators.required ] ),
          "CardDetails":new FormControl(this.section4Card2?.cardDetails , [Validators.required ] ),
          "CardFooter1":new FormControl(this.section4Card2?.cardFooter1 , [Validators.required ] ),
          "CardFooter2":new FormControl(this.section4Card2?.cardFooter2 , [Validators.required ] ),
          "CardFooter3":new FormControl(this.section4Card2?.cardFooter3 , [Validators.required ] )
        })
        break;
      case "4-card3":
        this.section4Card3 = res[0];
        this.CardForm3 = new FormGroup({
          "CardTitle":new FormControl(this.section4Card3?.cardTitle , [Validators.required ] ),
          "CardDetails":new FormControl(this.section4Card3?.cardDetails , [Validators.required ] ),
          "CardFooter1":new FormControl(this.section4Card3?.cardFooter1 , [Validators.required ] ),
          "CardFooter2":new FormControl(this.section4Card3?.cardFooter2 , [Validators.required ] ),
          "CardFooter3":new FormControl(this.section4Card3?.cardFooter3 , [Validators.required ] )
        })
        break;
      case 5:
        this.GetSection5 = res[0];
        this.Section5 = new FormGroup({
          "SmallTitle":new FormControl(this.GetSection5?.smallTitle , [Validators.required ] ),
          "BigTitle1":new FormControl(this.GetSection5?.bigTitle1 , [Validators.required ] ),
          "BigTitle2":new FormControl(this.GetSection5?.bigTitle2 , [Validators.required ] ),
          "Details":new FormControl(this.GetSection5?.details , [Validators.required ] )
        })
        break;
      case 6:
        this.GetSection6 = res[0];
        this.Section6 = new FormGroup({
          "SmallTitle":new FormControl(this.GetSection6?.smallTitle , [Validators.required ] ),
          "BigTitle1":new FormControl(this.GetSection6?.bigTitle1 , [Validators.required ] ),
          "BigTitle2":new FormControl(this.GetSection6?.bigTitle2 , [Validators.required ] )
        })
        break;
      case "7-Slider1":
        this.section7Slider1 = res[0];
        this.SliderForm1 = new FormGroup({
          "BigTitle":new FormControl(this.section7Slider1?.bigTitle , [Validators.required ] ),
          "SmallTitle":new FormControl(this.section7Slider1?.smallTitle , [Validators.required ] ),
          "Details":new FormControl(this.section7Slider1?.details , [Validators.required ] )
        })
        break;
      case "7-Slider2":
        this.section7Slider2 = res[0];
        this.SliderForm2 = new FormGroup({
          "BigTitle":new FormControl(this.section7Slider2?.bigTitle , [Validators.required ] ),
          "SmallTitle":new FormControl(this.section7Slider2?.smallTitle , [Validators.required ] ),
          "Details":new FormControl(this.section7Slider2?.details , [Validators.required ] )
        })
        break;
      default:
        this.GetSection7 = res[0];
        this.Section7 = new FormGroup({
          "SmallTitle":new FormControl(this.GetSection7?.smallTitle , [Validators.required ] ),
          "BigTitle1":new FormControl(this.GetSection7?.bigTitle1 , [Validators.required ] ),
          "BigTitle2":new FormControl(this.GetSection7?.bigTitle2 , [Validators.required ] )
        })
    }
  }, error =>{
    console.log(error);
  })
}

  ngOnInit(): void {

    this.Section1 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] )
    })

    this.Section2 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] )
    })

    this.Section3 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] ),
      "ActiveClients":new FormControl(null , [Validators.required ] ),
      "ProjectsDone":new FormControl(null , [Validators.required ] ),
      "TeamAdvisors":new FormControl(null , [Validators.required ] ),
      "GloriousYears":new FormControl(null , [Validators.required ] )
    })

    this.Section4 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] )
    })

    this.Section5 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] )
    })

    this.Section6 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] )
    })

    this.Section7 = new FormGroup({
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "BigTitle1":new FormControl(null , [Validators.required ] ),
      "BigTitle2":new FormControl(null , [Validators.required ] )
    })

    this.CardForm1 = new FormGroup({
      "CardTitle":new FormControl(null , [Validators.required ] ),
      "CardDetails":new FormControl(null , [Validators.required ] ),
      "CardFooter1":new FormControl(null , [Validators.required ] ),
      "CardFooter2":new FormControl(null , [Validators.required ] ),
      "CardFooter3":new FormControl(null , [Validators.required ] )
    })

    this.CardForm2 = new FormGroup({
      "CardTitle":new FormControl(null , [Validators.required ] ),
      "CardDetails":new FormControl(null , [Validators.required ] ),
      "CardFooter1":new FormControl(null , [Validators.required ] ),
      "CardFooter2":new FormControl(null , [Validators.required ] ),
      "CardFooter3":new FormControl(null , [Validators.required ] )
    })

    this.CardForm3 = new FormGroup({
      "CardTitle":new FormControl(null , [Validators.required ] ),
      "CardDetails":new FormControl(null , [Validators.required ] ),
      "CardFooter1":new FormControl(null , [Validators.required ] ),
      "CardFooter2":new FormControl(null , [Validators.required ] ),
      "CardFooter3":new FormControl(null , [Validators.required ] )
    })

    this.SliderForm1 = new FormGroup({
      "BigTitle":new FormControl(null , [Validators.required ] ),
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] )
    })
    this.SliderForm2 = new FormGroup({
      "BigTitle":new FormControl(null , [Validators.required ] ),
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "Details":new FormControl(null , [Validators.required ] )
    })

    this.getSection(1);
    this.getSection(2);
    this.getSection(3);
    this.getSection(4);
    this.getSection(5);
    this.getSection(6);
    this.getSection(7);
    this.getSection("7-Slider1");
    this.getSection("7-Slider2");
    this.getSection("4-card1");
    this.getSection("4-card2");
    this.getSection("4-card3");

  }

}
