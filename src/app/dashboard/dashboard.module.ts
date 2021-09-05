import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { EditClientsComponent } from './edit-clients/edit-clients.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { EditContactsComponent } from './edit-contacts/edit-contacts.component';
import { EmployeesComponent } from './employees/employees.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    DashboardComponent,
      EditHomeComponent,
      EditAboutComponent,
      EditClientsComponent,
      EditProjectsComponent,
      EditContactsComponent,
      EmployeesComponent,
      UsersComponent,
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {
  constructor(){
    
  }
  }
