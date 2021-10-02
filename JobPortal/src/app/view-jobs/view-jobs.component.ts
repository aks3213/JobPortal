import { HttpErrorResponse } from '@angular/common/http';
import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {

  // jobsdata :any={}
  jobsdata: any = [];

  constructor(private job: JobService,
              // tslint:disable-next-line:variable-name
              private _router: Router) { }

  ngOnInit(): void {

    this.getjobs();


  }



  // tslint:disable-next-line:typedef
  getjobs(){
    this.job.getJob().subscribe(
      res => this.jobsdata = res,
        err => {
          if ( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/home']);
            }
          }
        }
    );
  }

  // tslint:disable-next-line:typedef
  confirmm(id: string){
    const t = confirm('are you sure??');
    if (t === true){
      this.deleteJob(id);
      this._router.navigate(['/viewjob']);
    }
  }

  // tslint:disable-next-line:typedef
  deleteJob(id: string){
    return this.job.deleteJob(id).subscribe((response: any) => {
      console.log(response.data);
      // navigate to /lists/response._id
      this.getjobs();
    });
  }

}
