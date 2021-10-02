import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.css']
})
export class ViewFAQComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router) { }

  userdata:any=[]

  ngOnInit(): void {
    this.getquestion();
  }

  getquestion(){

    this.job.getquestion().subscribe(
      res => {///this.userid=res.toString(),
              //console.log(res)
              this.userdata= res;
        
              console.log(this.userdata);
             // console.log(this.userdata[0].Question);
              //this.userid=this.userdata._id;
             // console.log(this.userid)
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
