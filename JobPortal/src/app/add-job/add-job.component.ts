import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  constructor(private job: JobService,
              private _router: Router,
              private formBuilder: FormBuilder) {
                
              }
              registerForm !: FormGroup;
              submitted = false;
              
              userdata:any=[]
              userid!:String ;
               
  ngOnInit() {

    this.getid();

    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      minexperience: ['', Validators.required],
      
      minsalary: ['', Validators.required],
      maxsalary: ['', Validators.required],
      location: ['', Validators.required],
      minqualification: ['', Validators.required],
      cname: ['', Validators.required],
      cpname: ['', Validators.required],
      phone: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
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

  createJob(title:string,description:string,longdescription:string,minexperience:string,minsalary:string,maxsalary:string,location:string,minqualification:string,cname:string,cpname:string,phone:string,vacancy:string){

    this.submitted = true;

    // stop here if form is invalid 
    if (this.registerForm.invalid) {
        return;
    }

    return this.job.createJob(title,description,longdescription,minexperience,minsalary,maxsalary,location,minqualification,cname,cpname,phone,this.userid.toString(),vacancy).subscribe((response: any) => {
      
     // console.log("wtf is this in");
      console.log(response.data);
      //navigate to /lists/response._id
      
      this._router.navigate(['/home']);
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}


  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
}
