import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminDashboardGuard } from '../Guards/super-admin-dashboard.guard';
import { DashboardComponent } from './dashboard.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { EditClientsComponent } from './edit-clients/edit-clients.component';
import { EditContactsComponent } from './edit-contacts/edit-contacts.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { EmployeesComponent } from './employees/employees.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'edit-home', component: EditHomeComponent },
  { path: 'edit-about', component: EditAboutComponent },
  { path: 'edit-clients', component: EditClientsComponent },
  { path: 'edit-clients/:new-client', component: EditClientsComponent },
  { path: 'edit-projects/:new-project', component: EditProjectsComponent },
  { path: 'edit-projects', component: EditProjectsComponent },
  { path: 'edit-contacts', component: EditContactsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'users',canActivate:[SuperAdminDashboardGuard] , component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
