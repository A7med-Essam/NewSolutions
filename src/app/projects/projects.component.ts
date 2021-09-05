import { Component, OnInit } from '@angular/core';
import {IProjectImg,IProjectInfo} from '../Interfaces/projects';
import {ProjectDashboardService} from '../Services/project-dashboard.service';
declare var $:any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  projectInfo:[IProjectInfo];
  projectUrl:[IProjectImg];
  section1:any;

  // Categories variables
  Design:any;
  Development:any;
  Ideas:any;
  Technology:any;
  
  constructor(private _ProjectDashboardService:ProjectDashboardService) { }
  
  getSection1(){
    this._ProjectDashboardService.getSection().subscribe(res=>{
      this.section1 = res[0];
    })
  }

  getprojects()
  {
    this._ProjectDashboardService.getProjectsInfo().subscribe( res =>{
      this.projectInfo = res;
    },
    error =>{
      console.log(error)
    },
    ()=>{
      this._ProjectDashboardService.getProjectsImg().subscribe((res)=>{
        this.projectUrl = res;
    },
      error =>{
        console.log(error)
      },
      ()=>{ 
        for (let i = 0; i < this.projectInfo.length; i++) {
          if (this.projectInfo[i]?.id == this.projectUrl[i]?.id ) {
            this.projectInfo[i].projectImgUrl = this.projectUrl[i]?.url;
          }
        }
        this.removeEmptyElements();
      })
    })
  }

  removeEmptyElements(){
    $('.hideElement').remove();
  }

  ngOnInit(): void { 
    this.getSection1();
    this.getprojects();
  }

}
