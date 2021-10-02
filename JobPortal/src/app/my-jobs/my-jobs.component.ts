import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {


  //jobsdata :any={}
  jobsdata:any=[]

  constructor(private job: JobService,
    private _router: Router) { }

  ngOnInit(): void {

    this.getjobs();

    
  }

  

  getjobs(){
    this.job.getJob().subscribe(
      res => this.jobsdata=res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/home'])
            }
          }
        }
    )
  }

  confirmm(id:string){
    var t = confirm("are you sure??");
    if(t==true){
      this.deleteJob(id);
      this._router.navigate(['/viewjob']);
    }
  }

  deleteJob(id:string){
    return this.job.deleteJob(id).subscribe((response: any) => {
      console.log(response.data);
      //navigate to /lists/response._id
      this.getjobs();
    });
  }


}
