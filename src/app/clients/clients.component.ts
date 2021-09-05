import { Component, OnInit } from '@angular/core';
import {IClientsImg,IClientsInfo} from '../Interfaces/clients';
import {ClientDashboardService} from '../Services/client-dashboard.service';
declare var $:any;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  ClientsInfo:[IClientsInfo];
  ClientsImage:[IClientsImg];
  section1:any;

  constructor(private _ClientDashboardService:ClientDashboardService) { }

  getSection1(){
    this._ClientDashboardService.getSection().subscribe(res=>{
      this.section1 = res[0];
    })
  }

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
          }
        })
      }
    )
  }
  
  ngOnInit(): void {
    this.getSection1();
    this.getClients();
  }

}
