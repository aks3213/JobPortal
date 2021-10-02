import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-view-jobs-by-employer',
  templateUrl: './view-jobs-by-employer.component.html',
  styleUrls: ['./view-jobs-by-employer.component.css']
})
export class ViewJobsByEmployerComponent implements OnInit {


  jobsdata :any=[]

  constructor(private job: JobService,
    private _router: Router) { }

    userdata:any=[]
    userid!:string ;
              


  ngOnInit(): void {
   // this.getid();
    
    this.getjobs();
  }

 

  getjobs(){

    this.job.getId().subscribe(
      res => {///this.userid=res.toString(),
              //console.log(res)
              this.userdata= res;
        
             // console.log(this.userdata);
              this.userid=this.userdata._id;
              
              console.log(this.userid)

              this.job.getjob(this.userid).subscribe(
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
