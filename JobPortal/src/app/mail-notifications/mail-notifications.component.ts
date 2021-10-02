import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-mail-notifications',
  templateUrl: './mail-notifications.component.html',
  styleUrls: ['./mail-notifications.component.css']
})
export class MailNotificationsComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,
    private formBuilder: FormBuilder) { }

    registerForm !: FormGroup;
              submitted = false;
              //userid!: string;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      description: ['', Validators.required],
      subject: ['', Validators.required]
  })
  }

  get f() { return this.registerForm.controls; }

  mail(email:string,description:string,subject:string){
    this.submitted = true;

    // stop here if form is invalid 
    if (this.registerForm.invalid) {
        return;
    }
    console.log(email,description,subject)
    return this.job.mail(email,description,subject).subscribe(
      
      res => {
        console.log(res);
      var t = confirm("Mail Sent");
      if(t==true){
        this._router.navigate(['/home']);
      }else{
        this._router.navigate(['/mailNotification']);
      }

     },
     err =>{ 
       console.log(err)
     }
     );

  }

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
