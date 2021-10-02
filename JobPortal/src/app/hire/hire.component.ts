import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobService } from '../services/job.service';
@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,private route:ActivatedRoute) { }

  hire:any={}
  userdata:any=[]
  jobsdata:any=[]
  dummy:any=[]
  userid!:String ;
  public param!:Params;

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.param=params['email'];
      //this.param.toString()
    });

    this.getid()

  this.hire.email = this.param.toString();
  }

  onSubmit(){
    //jobtitle
  // console.log( this.hire.job)
    this.hire.uid = this.userid

    this.job.getOnejobs(this.hire.job).subscribe(
      res =>{
        this.dummy=res;
      //  console.log( this.dummy)
        this.hire.jobtitle = this.dummy[0].title;
      //  console.log( this.hire.jobtitle)
      }
    )
    this.hire.type = "0"
    console.log(this.hire);
    this.job.hire(this.hire)
    .subscribe(
      res => {
       // console.log(res)
       // this._router.navigate(['/home'])
       var t = confirm("Email sent");

      if(t==true){
        this._router.navigate(['/home']);
      }

      },
      err =>{ 
        console.log(err)
        
      }
    ) 

  }

  getid(){

   
    this.job.getId().subscribe(
      res => {///this.userid=res.toString(),
              //console.log(res)
              this.userdata= res;
        
             // console.log(this.userdata);
              this.userid=this.userdata._id;
              this.hire.cname=this.userdata.cname
              this.hire.cpname=this.userdata.cpname
              this.hire.jemail=this.userdata.email
              //console.log(this.userid)

              this.job.getjob(this.userid.toString()).subscribe(
                res => {
                  console.log(res);
                  this.jobsdata=res
                },
                  err => {
                    if( err instanceof HttpErrorResponse ) {
                      if (err.status === 401) {
                        this._router.navigate(['/home'])
                      }
                    }
                  }
              )
            },
        err => {
          if( err instanceof HttpErrorResponse ) {
           // if (err.status === 401) {
             console.log(err)
              //this._router.navigate(['/home'])
           // }
          }
        }
    )

  }

}
