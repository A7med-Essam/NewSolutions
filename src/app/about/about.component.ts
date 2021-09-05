import { Component, OnInit } from '@angular/core';
import { IHomeSection3, IHomeSection5 } from '../Interfaces/home';
import { IAboutSection1,IAboutSection2,IAboutSection3 } from '../Interfaces/About';
import {AboutDashboardService} from '../Services/about-dashboard.service';
import { HomeDashboardService } from '../Services/home-dashboard.service';
import { IEmployeesImg, IEmployeesInfo } from '../Interfaces/employees';
import {EmployeesDashboardService} from '../Services/employees-dashboard.service';
declare var $:any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  OurTeamHeader:IHomeSection5;
  section1:IAboutSection1;  
  section2:IAboutSection2;  
  section3:IAboutSection3; 
  counter:IHomeSection3;
  EmployeesInfo:[IEmployeesInfo];
  EmployeesImg:[IEmployeesImg];
  constructor(
      private _AboutDashboardService:AboutDashboardService,
      private _HomeDashboardService:HomeDashboardService,
      private _EmployeesDashboardService:EmployeesDashboardService
    ) {}

    getCounter(){
      this._HomeDashboardService.getSection(3).subscribe( res =>{
        this.counter = res[0];
        this.setDefaultValueToCounter(res[0]);
      }, error =>{
        console.log(error);
      })
    }

    getOurTeamHeaderInfo(){
      this._HomeDashboardService.getSection(5).subscribe( res =>{
        this.OurTeamHeader = res[0];
      }, error =>{
        console.log(error);
      })
    }

    getSection(sectionNumber){
      this._AboutDashboardService.getSection(sectionNumber).subscribe( res =>{
        switch(sectionNumber) {
          case 1:
            this.section1 = res[0];
            this.getVideo(res[0]?.videoLink);
            break;
          case 2:
            this.section2 = res[0];
            break;
        default:
            this.section3 = res[0];
        }
      }, error =>{
        console.log(error);
      })
    }

    setDefaultValueToCounter(data){
      // check if numscroller lib not working
      if( $('#section7 .numscroller').is(':empty') ) {
        $('#section7 .numscroller:eq( 0 )').append(`${data?.activeClients}`)
        $('#section7 .numscroller:eq( 1 )').append(`${data?.projectsDone}`)
        $('#section7 .numscroller:eq( 2 )').append(`${data?.teamAdvisors}`)
        $('#section7 .numscroller:eq( 3 )').append(`${data?.gloriousYears}`)
      }
    }

    getVideo(link){
      if(link == null){
        $("a.play-2").attr("href","https://youtu.be/vpO8sZDxOGI");
      }
      else{
        $("a.play-2").attr("href",link);
      }
      $(".play-2").yu2fvl();
      $(".play-2").click(function (e) { 
        e.preventDefault();
        document.body.style.overflow = 'hidden';
      });
      $(".yu2fvl-overlay , .yu2fvl-close").click(function (e) { 
        e.preventDefault();
        document.body.style.overflow = 'auto';
      });
    }

    getOwlSlider(){
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
    }

    getOurTeam(){
      this._EmployeesDashboardService.getEmployeesInfo().subscribe(res=>{
        this.EmployeesInfo = res;
      },
      error =>{
        console.log(error)
      },
      ()=>{
        this._EmployeesDashboardService.getEmployeesImg().subscribe((res)=>{
          this.EmployeesImg = res;
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
    this.getCounter();
    this.getOwlSlider();
    this.getOurTeamHeaderInfo();
    this.getOurTeam();
  }

}
