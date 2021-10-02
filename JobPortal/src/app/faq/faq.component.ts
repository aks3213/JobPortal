import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,
    private formBuilder: FormBuilder) { }

    registerForm !: FormGroup;
              submitted = false;
              userid!: string;
              userdata:any=[]

  ngOnInit(): void {

    this.getid()

    this.registerForm = this.formBuilder.group({
      
      Question: ['', Validators.required]
  })
  }

  getid(){

    this.job.getId().subscribe(
      res => {///this.userid=res.toString(),
              //console.log(res)
              this.userdata= res;
        
              console.log(this.userdata);
              this.userid=this.userdata._id;
              console.log(this.userid)
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

  faq(question:string){
    this.submitted = true;

    // stop here if form is invalid 
    if (this.registerForm.invalid) {
        return;
    }
    console.log(question)
    return this.job.faq(question,this.userid).subscribe(
      
      res => {
        console.log(res);
        this._router.navigate(['/home']);

     },
     err =>{ 
       console.log(err)
     }
     );

  }


  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
