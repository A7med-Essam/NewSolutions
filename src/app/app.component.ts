import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NewSolutions';
  
  ngOnInit(): void{
    
        // Swip Up Button
    $(window).scroll(function(){

      var myScrollTop = $(window).scrollTop();
    
      if( myScrollTop >= 650)
      {
          $(".swipUp").fadeIn(650)
      }
      else
      {
          $(".swipUp").fadeOut(650)
      }
    })

    $("button.swipUp").click(function(){
      $("html,body").animate( { scrollTop: 0 } , 1000 )
      // $(window).scrollTop(0);
    })



  // prevent Chrome violation warnings => [Violation] Added non-passive event listener to a scroll-blocking
    $.event.special.touchstart = {
      setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
          this.addEventListener("touchstart", handle, { passive: false });
        } else {
          this.addEventListener("touchstart", handle, { passive: true });
        }
      }
    };
  }
}
