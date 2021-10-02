import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobService } from '../services/job.service';

class Job{
  _id!:string
  title!:string;
  cname!:string;
  cpname!:string;
  description!:string;
  longdescription!:string;
  location!:string;
  maxexperience!:string;
  maxsalary!:string;
  minexperience!:string;
  minqualification!:string;
  minsalary!:string;
  phone!:string;
}

@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  styleUrls: ['./edit-jobs.component.css']
})
export class EditJobsComponent implements OnInit {


  public param!:Params;
  jobs = new Job();
  jobsdata :any=[]


  constructor(private job: JobService,
    private _router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.param=params['jobId'];
    });

   // console.log("this is param : ", this.param.toString());
   this.jobs._id= this.param.toString()
    this.getjob()
  }

  getjob(){
    this.job.getOnejobs(this.param.toString()).subscribe(
      res => {
       // console.log(res);
        this.jobsdata=res
        console.log(this.jobsdata);
      },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/home'])
            }
          }
        }
    )
  }
  onSubmit(){
    
    console.log(this.jobs);
    this.job.editJob(this.jobs)
    .subscribe(
      res => {
      console.log(res)
        this._router.navigate(['/ViewJobs'])
      },
      err => {
       
         // if (err.status === 401) {
           console.log(err)
            //this._router.navigate(['/home'])
         // }
        
      }
    ) 

  }

}
