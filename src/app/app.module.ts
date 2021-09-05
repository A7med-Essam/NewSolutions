import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClientsComponent } from './clients/clients.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProjectsComponent } from './projects/projects.component';
import { Error404Component } from './error404/error404.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlogsComponent } from './blogs/blogs.component';
import {AuthenticationInterceptor} from './Interceptors/authentication.interceptor';
import { IndicatorInterceptor } from './Interceptors/indicator.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ClientsComponent,
    ContactUsComponent,
    ProjectsComponent,
    Error404Component,
    LoadingPageComponent,
    LoginComponent,
    RegisterComponent,
    BlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS , useClass:AuthenticationInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:IndicatorInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
