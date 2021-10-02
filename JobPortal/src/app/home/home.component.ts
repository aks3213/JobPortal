import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public  _auth:AuthService,private job: JobService,
    private _router: Router,private  http:HttpClient) { }

    userdata:any=[]   
    resumedata:any=[]
    jobsdata:any=[]
    usertype!:String ;
    uid!:String;

    ujobseeker = false;
    uemployer = false;
    admin = false;

    cpname= ""
    fname= ""
    lname=""

  ngOnInit(): void {
    this.getuserdetails()
    this.getresume()
    this.getjob()
  }

  getuserdetails(){

    this._auth.getUser().subscribe(

      res => {
       // console.log(res);
        this.userdata= res;
       // console.log(this.userdata)
        this.usertype=this.userdata.usertype;
        this.cpname = this.userdata.cpname

        this.fname  =this.userdata.firstname
        this.lname = this.userdata.lastname

        this.uid= this.userdata._id;

        if(this.usertype=="1"){
          this.ujobseeker = true;
        }else if(this.usertype == "2"){
          this.uemployer = true;
        }else if(this.usertype == "0"){
          this.admin = true;
        }else{
          this.ujobseeker = false;
          this.uemployer = false;
          this.admin = false;
        }
       
      },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/home'])
            }
          }
        })

  }

  getresume(){
    this.http.get<any>('http://localhost:3000/home/resume').subscribe(
      res=>{
        this.resumedata  =res
       // console.log(this.resumedata)
    })
  }

  getjob(){
    this.http.get<any>('http://localhost:3000/home/job').subscribe(
      res=>{
        this.jobsdata  =res
       // console.log(this.jobsdata)
    })
  }

}
