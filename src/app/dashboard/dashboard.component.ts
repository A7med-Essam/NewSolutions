import { Component, OnInit } from '@angular/core';
import { IClientsImg, IClientsInfo } from '../Interfaces/clients';
import { IEmployeesImg,IEmployeesInfo } from '../Interfaces/employees';
import {ClientDashboardService} from '../Services/client-dashboard.service';
import {EmployeesDashboardService} from '../Services/employees-dashboard.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {IProjectImg,IProjectInfo} from '../Interfaces/projects';
import {ProjectDashboardService} from '../Services/project-dashboard.service';
import { AuthService } from '../Services/auth.service';

declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ClientsInfo:[IClientsInfo];
  ClientsImage:[IClientsImg];
  EmployeesInfo:[IEmployeesInfo];
  EmployeesImg:[IEmployeesImg];
  ProjectsInfo:[IProjectInfo];
  ProjectsImg:[IProjectImg];

  ClientCollapseButton:string = "#Client"; // this variable used to binding Client table collapse
  ClientCollapseId:string = "Client";
  EmployeeCollapseButton:string = "#Employee"; // this variable used to binding Employee table collapse
  EmployeeCollapseId:string = "Employee";
  ProjectCollapseButton:string = "#Project"; // this variable used to binding Project table collapse
  ProjectCollapseId:string = "Project";

  isSuperAdmin:boolean = false;

  updateClient:FormGroup;
  updateEmployee:FormGroup;
  updateProject:FormGroup;

  constructor(
      private _ClientDashboardService:ClientDashboardService,
      private _EmployeesDashboardService:EmployeesDashboardService,
      private _ProjectDashboardService:ProjectDashboardService,
      private _AuthService:AuthService,
      private router:Router
    ){}

  ngOnInit(): void {

    this._AuthService.currentUser.subscribe((data)=>{
      if (data == null) {
          this.isSuperAdmin = false;
      }
      else {
          if (data[2][1] == "SuperAdmin" || data[2][2] == "SuperAdmin") {
            this.isSuperAdmin = true;
          }
          else {
            this.isSuperAdmin = false;
          }
      }
    })
    this.getClients();
    this.getEmployees();
    this.getProjects();
    
    this.updateClient = new FormGroup({
      "Id":new FormControl(null),
      "ImageUrl":new FormControl(null),
      "Name":new FormControl(null , [Validators.required ] ),
      "JobTitle":new FormControl(null , [Validators.required ] ),
      "TwitterUrl":new FormControl(null , [Validators.required ] ),
      "LinkedInUrl":new FormControl(null , [Validators.required ] ),
      "FacebookUrl":new FormControl(null , [Validators.required ] ),
      "instegramUrl":new FormControl(null , [Validators.required ] )
    });

    this.updateEmployee = new FormGroup({
      "Id":new FormControl(null),
      "ImageUrl":new FormControl(null),
      "Name":new FormControl(null , [Validators.required ] ),
      "JobTitle":new FormControl(null , [Validators.required ] ),
      "TwitterUrl":new FormControl(null , [Validators.required ] ),
      "LinkedInUrl":new FormControl(null , [Validators.required ] ),
      "FacebookUrl":new FormControl(null , [Validators.required ] ),
      "instegramUrl":new FormControl(null , [Validators.required ] )
    });

    this.updateProject = new FormGroup({
      "Id":new FormControl(null),
      "ImageUrl":new FormControl(null),
      "BigTitle":new FormControl(null , [Validators.required ] ),
      "SmallTitle":new FormControl(null , [Validators.required ] ),
      "Category":new FormControl(null , [Validators.required ] ),
      "details":new FormControl(null , [Validators.required ] )
    });
  }

  // Clients methods
  getClients(){
    this._ClientDashboardService.getClientInfo().subscribe(res=>{
        this.ClientsInfo = res;
      },
      error =>{
        console.log(error)
      },
      ()=>{
        this._ClientDashboardService.getClientImg().subscribe((res)=>{
          this.ClientsImage = res;
        },
        error =>{
          console.log(error)
        },
        ()=>{
          for (let i = 0; i < this.ClientsInfo.length; i++) {
            if (this.ClientsInfo[i]?.id == this.ClientsImage[i]?.id ) {
              this.ClientsInfo[i].imageUrl = this.ClientsImage[i]?.url;
            }
            this.updateClient = new FormGroup({
              "Id":new FormControl(null),
              "ImageUrl":new FormControl(this.ClientsInfo[i].imageUrl),
              "Name":new FormControl(this.ClientsInfo[i].name , [Validators.required ] ),
              "JobTitle":new FormControl(this.ClientsInfo[i].jobTitle , [Validators.required ] ),
              "TwitterUrl":new FormControl(this.ClientsInfo[i].twitterUrl , [Validators.required ] ),
              "LinkedInUrl":new FormControl(this.ClientsInfo[i].linkedInUrl , [Validators.required ] ),
              "FacebookUrl":new FormControl(this.ClientsInfo[i].facebookUrl , [Validators.required ] ),
              "instegramUrl":new FormControl(this.ClientsInfo[i].instegramUrl , [Validators.required ] )
            });
          }
        })
      }
    )
  }

  UpdateClient(data,event,id:number){
    data.Id = id;
    $(event.target[6]).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
      this._ClientDashboardService.updateClientInfo(data).subscribe((res)=>{
      this.router.navigate(['/our-clients'])
      },
      error => {
        console.log(error.error);
        $(event.target[6]).html(`Error Occurred!`)
      });
  }

  DeleteClient(event,id:number){
    if (event.target.className == 'far fa-trash-alt') 
    {
      $(event.path[3].childNodes[6].firstElementChild).prop('disabled', true);
      $(event.path[3].childNodes[6].lastElementChild).prop('disabled', true);
      $(event.path[3]).css({backgroundColor:"rgba(0,0,0,0.1)", opacity:"0.5"})
    }
    else 
    {
      $(event.path[2].childNodes[6].firstElementChild).prop('disabled', true);
      $(event.path[2].childNodes[6].lastElementChild).prop('disabled', true);
      $(event.path[2]).css({backgroundColor:"rgba(0,0,0,0.1)", opacity:"0.5"})
    }

    this._ClientDashboardService.deleteClientInfo(id).subscribe(()=>{},error =>{
      console.log(error)
      alert("Error occurred!..")
    },()=>{
      this._ClientDashboardService.deleteClientImg(id).subscribe(()=>{
        // alert("Deleted Successfully..")
        if (event.target.className == 'far fa-trash-alt') {
          $(event.path[3]).remove();
        } else {
          $(event.path[2]).remove();
        }
      },error=>{
        console.log(error)
        alert("Error occurred!..")
      })
    });
  }

  // Employees methods
  getEmployees(){
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

  UpdateEmployee(data,event,id:number){
    data.Id = id;
    $(event.target[6]).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
      this._EmployeesDashboardService.updateEmployeesInfo(data).subscribe((res)=>{
      this.router.navigate(['/about-us'])
      },
      error => {
        console.log(error.error);
        $(event.target[6]).html(`Error Occurred!`)
      });
  }

  DeleteEmployee(event,id:number){
    if (event.target.className == 'far fa-trash-alt') 
    {
      $(event.path[3].childNodes[6].firstElementChild).prop('disabled', true);
      $(event.path[3].childNodes[6].lastElementChild).prop('disabled', true);
      $(event.path[3]).css({backgroundColor:"rgba(0,0,0,0.1)", opacity:"0.5"})
    }
    else 
    {
      $(event.path[2].childNodes[6].firstElementChild).prop('disabled', true);
      $(event.path[2].childNodes[6].lastElementChild).prop('disabled', true);
      $(event.path[2]).css({backgroundColor:"rgba(0,0,0,0.1)", opacity:"0.5"})
    }
    this._EmployeesDashboardService.deleteEmployeesInfo(id).subscribe(()=>{},error =>{
      console.log(error)
      alert("Error occurred!..")
    },()=>{
      this._EmployeesDashboardService.deleteEmployeesImg(id).subscribe(()=>{
        if (event.target.className == 'far fa-trash-alt') {
          $(event.path[3]).remove();
        } else {
          $(event.path[2]).remove();
        }
      },error=>{
        console.log(error)
        alert("Error occurred!..")
      })
    });
  }

  // Projects methods
  getProjects(){
    this._ProjectDashboardService.getProjectsInfo().subscribe(res=>{
      this.ProjectsInfo = res;
    },
    error =>{
      console.log(error)
    },
    ()=>{
      this._ProjectDashboardService.getProjectsImg().subscribe((res)=>{
        this.ProjectsImg = res;
      },
      error =>{
        console.log(error)
      },
      ()=>{
        for (let i = 0; i < this.ProjectsInfo.length; i++) {
          if (this.ProjectsInfo[i]?.id == this.ProjectsImg[i]?.id ) {
            this.ProjectsInfo[i].imageUrl = this.ProjectsImg[i]?.url;
          }
        }
      })
    })
  }

  UpdateProject(data,event,id:number){
    data.Id = id;
    $(event.target[3]).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
      this._ProjectDashboardService.updateProjectsInfo(data).subscribe((res)=>{
      this.router.navigate(['/our-projects'])
      },
      error => {
        console.log(error);
        $(event.target[3]).html(`Error Occurred!`)
      });
  }

  DeleteProject(event,id:number){
    if (event.target.className == 'far fa-trash-alt') 
    {
      $(event.path[3].childNodes[3].firstElementChild).prop('disabled', true);
      $(event.path[3].childNodes[3].lastElementChild).prop('disabled', true);
      $(event.path[3]).css({backgroundColor:"rgba(0,0,0,0.1)", opacity:"0.5"})
    }
    else 
    {
      $(event.path[2].childNodes[3].firstElementChild).prop('disabled', true);
      $(event.path[2].childNodes[3].lastElementChild).prop('disabled', true);
      $(event.path[2]).css({backgroundColor:"rgba(0,0,0,0.1)", opacity:"0.5"})
    }
    this._ProjectDashboardService.deleteProjectsInfo(id).subscribe(()=>{},error =>{
      console.log(error)
      alert("Error occurred!..")
    },()=>{
      this._ProjectDashboardService.deleteProjectsImg(id).subscribe(()=>{
        if (event.target.className == 'far fa-trash-alt') {
          $(event.path[3]).remove();
        } else {
          $(event.path[2]).remove();
        }
      },error=>{
        console.log(error)
        alert("Error occurred!..")
      })
    });
  }

  // retrive values into inputs before updating data
  setDataIntoClientUpdateInputs(index){
    this.updateClient = new FormGroup({
      "Id":new FormControl(null),
      "ImageUrl":new FormControl(null),
      "Name":new FormControl(this.ClientsInfo[index].name , [Validators.required ] ),
      "JobTitle":new FormControl(this.ClientsInfo[index].jobTitle , [Validators.required ] ),
      "TwitterUrl":new FormControl(this.ClientsInfo[index].twitterUrl , [Validators.required ] ),
      "LinkedInUrl":new FormControl(this.ClientsInfo[index].linkedInUrl , [Validators.required ] ),
      "FacebookUrl":new FormControl(this.ClientsInfo[index].facebookUrl , [Validators.required ] ),
      "instegramUrl":new FormControl(this.ClientsInfo[index].instegramUrl , [Validators.required ] )
    });
  }

  setDataIntoEmployeeUpdateInputs(index){
    this.updateEmployee = new FormGroup({
      "Id":new FormControl(null),
      "ImageUrl":new FormControl(null),
      "Name":new FormControl(this.EmployeesInfo[index].name , [Validators.required ] ),
      "JobTitle":new FormControl(this.EmployeesInfo[index].jobTitle , [Validators.required ] ),
      "TwitterUrl":new FormControl(this.EmployeesInfo[index].twitterUrl , [Validators.required ] ),
      "LinkedInUrl":new FormControl(this.EmployeesInfo[index].linkedInUrl , [Validators.required ] ),
      "FacebookUrl":new FormControl(this.EmployeesInfo[index].facebookUrl , [Validators.required ] ),
      "instegramUrl":new FormControl(this.EmployeesInfo[index].instegramUrl , [Validators.required ] )
    });
  }

  setDataIntoProjectUpdateInputs(index){
    this.updateProject = new FormGroup({
      "Id":new FormControl(null),
      "ImageUrl":new FormControl(null),
      "BigTitle":new FormControl(this.ProjectsInfo[index].bigTitle , [Validators.required ] ),
      "SmallTitle":new FormControl(this.ProjectsInfo[index].smallTitle , [Validators.required ] ),
      "Category":new FormControl(this.ProjectsInfo[index].category , [Validators.required ] ),
      "details":new FormControl(this.ProjectsInfo[index].details , [Validators.required ] )
    });
  }

}
