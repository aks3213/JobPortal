import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrls: ['./apply-for-job.component.css']
})
export class ApplyForJobComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,private route:ActivatedRoute,private _auth: AuthService) { }

    public param!:Params;

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['jobid'];
      //this.param.toString()
      this.apply.job = this.param.toString()
    });

    this.getid()
  }

  apply:any={}
  userdata:any=[]
  jobsdata:any=[]
  dummy:any = []
  vacancy!:number
  
  onSubmit(){

    this.apply.type = "1"
    console.log(this.apply)
    this.job.Apply(this.apply)
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
              this.apply.uid=this.userdata._id;
              this.apply.jemail=this.userdata.email;
              this.apply.jname=this.userdata.firstname+" "+this.userdata.lastname;
              //console.log(this.userdata)

              this.job.getOnejobs(this.param.toString()).subscribe(
                res =>{
                  this.dummy =res;
                  this.apply.jobtitle =this.dummy[0].title
                  this.vacancy = this.dummy[0].vacancy
                  
                  //console.log( this.dummy[0].uid)
                  this.job.Username(this.dummy[0].uid).subscribe(
                    res=>{
                      this.jobsdata =res
                      console.log( this.jobsdata)
                      this.apply.email = this.jobsdata[0].email
                     // this.apply.jobtitle =this.jobsdata[0].title
                    }
                  )
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
