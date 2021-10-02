import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit {

  jobsdata:any=[]
  term!: string;

  constructor(private job: JobService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  search(searchText:string){
    console.log(searchText)
    this.job.searchJob(searchText).subscribe(
      res => {
        console.log(res);
        this.jobsdata=res},
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
