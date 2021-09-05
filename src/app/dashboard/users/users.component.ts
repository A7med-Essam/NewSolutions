import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';

declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  paginationPage: number = 1; // this variable used for pagination page
  pageSize:number = 10; // this variable used for size of rows per page
  TotalRecords:number; // total users in website

  setAdmin:{};
  RoleError:string;

  Admins = [];
  Users = [];
  constructor(private _AuthService:AuthService) { }

  addRole(id,role,event){
      this.setAdmin = {
      'userId':id,
      'role':role
    }

    $(event.target).html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);

    this._AuthService.addRoleToUser(this.setAdmin).subscribe(res=>{
      $(event.target).attr('disabled','true');
      $(event.target).text("ADMIN");
    },error=>{
      $(event.target).attr('disabled','false');
      $(event.target).text("Error Occurred!");
      this.RoleError = error.error
      console.log(error)
    })
  }

  removeRole(id:string ,event){
    $(event.path[2]).css({backgroundColor:"rgba(0,0,0,0.1)", opacity:"0.5"})
    this._AuthService.DeleteRoleFromUser(id).subscribe(res=>{
      $(event.path[2]).remove();
    },error=>{
      console.log(error)
      $(event.target).text("Error Occurred!");
      $(event.path[2]).css({backgroundColor:"#fff", opacity:"1"})
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllAdmins();

    $(document).ready(function() {
      var activeSystemClass = $('.list-group-item.active');
    //something is entered in search form
    $('#system-search1').keyup( function() {
      var that = this;
      // affect all table rows on in systems table
      var tableBody = $('.table-list-search tbody');
      var tableRowsClass = $('.table-list-search tbody tr');
      $('.search-sf').remove();
      tableRowsClass.each( function(i, val) {
      
          //Lower text for case insensitive
          var rowText = $(val).text().toLowerCase();
          var inputText = $(that).val().toLowerCase();
          if(inputText != '')
          {
              $('.search-query-sf').remove();
              tableBody.prepend('<tr class="search-query-sf"><td colspan="6"><strong>Searching for: "'
                  + $(that).val()
                  + '"</strong></td></tr>');
          }
          else
          {
              $('.search-query-sf').remove();
          }
  
          if( rowText.indexOf( inputText ) == -1 )
          {
              //hide rows
              tableRowsClass.eq(i).hide();
              
          }
          else
          {
              $('.search-sf').remove();
              tableRowsClass.eq(i).show();
          }
      });
      //all tr elements are hidden
      if(tableRowsClass.children(':visible').length == 0)
      {
          tableBody.append('<tr class="search-sf"><td class="text-muted" colspan="6">No entries found.</td></tr>');
      }
      });
    $('#system-search2').keyup( function() {
        var that = this;
        // affect all table rows on in systems table
        var tableBody = $('.table-list-search tbody');
        var tableRowsClass = $('.table-list-search tbody tr');
        $('.search-sf').remove();
        tableRowsClass.each( function(i, val) {
        
            //Lower text for case insensitive
            var rowText = $(val).text().toLowerCase();
            var inputText = $(that).val().toLowerCase();
            if(inputText != '')
            {
                $('.search-query-sf').remove();
                tableBody.prepend('<tr class="search-query-sf"><td colspan="6"><strong>Searching for: "'
                    + $(that).val()
                    + '"</strong></td></tr>');
            }
            else
            {
                $('.search-query-sf').remove();
            }
    
            if( rowText.indexOf( inputText ) == -1 )
            {
                //hide rows
                tableRowsClass.eq(i).hide();
                
            }
            else
            {
                $('.search-sf').remove();
                tableRowsClass.eq(i).show();
            }
        });
        //all tr elements are hidden
        if(tableRowsClass.children(':visible').length == 0)
        {
            tableBody.append('<tr class="search-sf"><td class="text-muted" colspan="6">No entries found.</td></tr>');
        }
      });
    });



  }

  pageChanged(e){
    this.getAllUsers();
  }

  getAllUsers(){
    this._AuthService.getAllUsers(this.paginationPage, this.pageSize).subscribe(res=>{
        this.TotalRecords = res.totalCount
        this.Users = res.data
    },
    error=>{
          console.log(error)
    });
  }

  getAllAdmins(){
    this._AuthService.getAllAdmins().subscribe(res=>{
        this.Admins = res
    },
    error=>{
          console.log(error)
    });
  }

}
