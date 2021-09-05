import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ClientsComponent } from './clients/clients.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardGuard } from './Guards/admin-dashboard.guard';
import { BlogsComponent } from './blogs/blogs.component';

const routes: Routes = [ 
  { path: '', redirectTo:'home' , pathMatch:'full'},
  { path: 'home' , component: HomeComponent },
  { path: 'contact-us',  component: ContactUsComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'our-clients', component: ClientsComponent },
  { path: 'our-projects', component: ProjectsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blog/:id', component: BlogsComponent },
  { path: 'dashboard', canActivate:[AdminDashboardGuard] , loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', component: Error404Component },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  {scrollPositionRestoration : "top" , useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
