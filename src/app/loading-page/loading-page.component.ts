import { Component, OnInit } from '@angular/core';

// declare var $:any;

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // $(document).ready(function(){
    //   setTimeout(() => {
    //     $(".forloading").fadeOut(onload , function(){
    //       $("html,body").css({overflow : "visible"})
    //       });
    //   }, 1000);
    // });
  }

}
