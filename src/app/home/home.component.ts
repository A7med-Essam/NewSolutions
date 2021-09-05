import { HomeDashboardService } from 'src/app/Services/home-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { IHome,IHomeCard,IHomeSection3,IHomeSection5,IHomeSlider } from '../Interfaces/home';
import { IEmployeesImg, IEmployeesInfo } from '../Interfaces/employees';
import {EmployeesDashboardService} from '../Services/employees-dashboard.service';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  section1:IHome;  section2:IHome;  section3:IHomeSection3;  section4:IHome;
  section5:IHomeSection5;  section6:IHome;  section7:IHome;
  section7Slider1:IHomeSlider; section7Slider2:IHomeSlider;
  section4Card1:IHomeCard; section4Card2:IHomeCard; section4Card3:IHomeCard;
  EmployeesInfo:[IEmployeesInfo];
  EmployeesImg:[IEmployeesImg];
  
  constructor(
    private _HomeDashboardService : HomeDashboardService,
    private _EmployeesDashboardService : EmployeesDashboardService,
    ) {}

  getSection(sectionNumber){
    this._HomeDashboardService.getSection(sectionNumber).subscribe( res =>{
      switch(sectionNumber) {
        case 1:
          this.section1 = res[0];
          break;
        case 2:
          this.section2 = res[0];
          break;
        case 3:
          this.section3 = res[0];
          this.setDefaultValueToCounter(res[0]);
          break;
        case 4:
          this.section4 = res[0];
          break;
        case "4-card1":
          this.section4Card1 = res[0];
          break;
        case "4-card2":
          this.section4Card2 = res[0];
          break;
        case "4-card3":
          this.section4Card3 = res[0];
          break;
        case 5:
          this.section5 = res[0];
          break;
        case 6:
          this.section6 = res[0];
          break;
        case "7-Slider1":
          this.section7Slider1 = res[0];
          break;
        case "7-Slider2":
          this.section7Slider2 = res[0];
          break;
        default:
          this.section7 = res[0];
      }
    }, error =>{
      console.log(error);
    })
  }

  setDefaultValueToCounter(data){
        // check if numscroller lib not working
    if( $('#section3 .numscroller').is(':empty') ) {
      $('#section3 .numscroller:eq( 0 )').append(data?.activeClients)
      $('#section3 .numscroller:eq( 1 )').append(data?.projectsDone)
      $('#section3 .numscroller:eq( 2 )').append(data?.teamAdvisors)
    }
  }

  getOurTeam(){
    this._EmployeesDashboardService.getEmployeesInfo().subscribe(res=>{
      this.EmployeesInfo = res.slice(0, 4);
    },
    error =>{
      console.log(error)
    },
    ()=>{
      this._EmployeesDashboardService.getEmployeesImg().subscribe((res)=>{
        this.EmployeesImg = res.slice(0, 4);
      },
      error =>{
        console.log(error)
      },
      ()=>{
        for (let i = 0; i < this.EmployeesInfo.length; i++) {
          if (this.EmployeesInfo[i]?.id == this.EmployeesImg[i]?.id ) {
            this.EmployeesInfo[i].imageUrl = this.EmployeesImg[i]?.url;
          }
        }
      })
    })
  }

  ngOnInit(): void { 
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
    this.getOurTeam();
    
    // owlCarousel section4
      $("#owl1").owlCarousel({
        loop:true,
        margin:50,
        nav:false,
        dots:false,
        responsive:{
          100:{
            items:2
          },
          400:{
            items:3
          },
          768:{
            items:4
          },
          992:{
            items:6
          }
        }
      })

    // owlCarousel section8
      $("#owl2").owlCarousel({
        // loop:true,
        margin:30,
        nav:false,
        dots:false,
        items:1,
        responsive:{
          990:{
            items:2
          }
        }
      })
  }

}
