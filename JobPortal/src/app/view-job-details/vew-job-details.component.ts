import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobService } from '../services/job.service';
@Component({
  selector: 'app-vew-job-details',
  templateUrl: './vew-job-details.component.html',
  styleUrls: ['./vew-job-details.component.css']
})
export class VewJobDetailsComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,private route:ActivatedRoute) { }

    public param!:Params;
    jobsdata:any=[]

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['id'];
      //this.param.toString()
    });

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

}
