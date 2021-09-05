export interface IProjectInfo {
    id:number,
    smallTitle:string,
    bigTitle:string,
    category:string,
    imageUrl:string,
    projectImgUrl:string
    date:Date
    details:string
}

export interface IProjectImg{
    id:number,
    url:string,
    idNavigation:any,
    }

export interface IReviews{
    id:number,
    blogId:number,
    comment:string,
    email:string,
    name:string,
    date:Date,
    }

    export interface Section1 {
        smallTitle:string,
        bigTitle1:string,
        bigTitle2:string,
        details:string
    }