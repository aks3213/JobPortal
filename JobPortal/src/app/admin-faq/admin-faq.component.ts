import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-admin-faq',
  templateUrl: './admin-faq.component.html',
  styleUrls: ['./admin-faq.component.css']
})
export class AdminFAQComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,
    private formBuilder: FormBuilder) { }

    registerForm !: FormGroup;
              submitted = false;
              userid!: string;
              userdata:any=[]

  ngOnInit(): void {
    this.getquestion();
    this.registerForm = this.formBuilder.group({
      
      answer: ['', Validators.required]
  })
  }

  adminfaq(answer:string,id:string){
    this.submitted = true;

    // stop here if form is invalid 
    if (this.registerForm.invalid) {
        return;
    }
    console.log(answer,id)
    return this.job.adminfaq(answer,id).subscribe(
      
      res => {
        console.log(res);
        //this._router.navigate(['/home']);
        this.getquestion();
     },
     err =>{ 
       console.log(err)
     }
     );

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

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
