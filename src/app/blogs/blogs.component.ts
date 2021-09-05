import { Component, OnInit } from '@angular/core';
import {ProjectDashboardService} from '../Services/project-dashboard.service';
import {BlogDashboardService} from '../Services/blog-dashboard.service';
import {IProjectImg,IProjectInfo, IReviews} from '../Interfaces/projects';
import { ActivatedRoute } from '@angular/router';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  projectInfo:IProjectInfo
  projectUrl:IProjectImg;
  reviews:FormGroup;
  blogReviews:IReviews;
  paginationPage: number = 1; // this variable used for pagination
  pageSize:number = 5;
  TotalRecords:number;
  constructor(
    private _ProjectDashboardService:ProjectDashboardService,
    private _BlogDashboardService:BlogDashboardService, 
    private activatedRoute:ActivatedRoute
      ) { }


  getProjectsInfoById(id){
    this._ProjectDashboardService.getProjectsInfoById(id).subscribe(res=>{
      this.projectInfo = res;
      this.projectInfo.date;
    },    
    error =>{
      console.log(error)
    },
    ()=>{
      this.getProjectsImgById(id);
    })
  }

  getProjectsImgById(id)
  {
    this._ProjectDashboardService.getProjectsImgById(id).subscribe((res)=>{
      this.projectInfo.imageUrl = res?.url;
    },
      error =>{
        console.log(error)
      })
  }

  getReviews(){
    this._BlogDashboardService.getReviews(this.activatedRoute.snapshot.params.id,this.paginationPage, this.pageSize).subscribe( res =>{
      this.blogReviews = res.data
      this.TotalRecords = res.totalCount
    })
  }

  addReviews(data){
    this._BlogDashboardService.addReview(data).subscribe( () =>{
      location.reload();
    })
  }


  ngOnInit(): void {
    this.reviews = new FormGroup({
      "email":new FormControl(null , [Validators.required ,Validators.email] ),
      "name":new FormControl(null , [Validators.required ] ),
      "comment":new FormControl(null , [Validators.required ] ),
      "blogId":new FormControl(this.activatedRoute.snapshot.params.id)
    })

    this.getProjectsInfoById(this.activatedRoute.snapshot.params.id);
    this.getReviews();
  }

  pageChanged(e){
    this.getReviews();
  }

}
