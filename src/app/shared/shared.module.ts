import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
