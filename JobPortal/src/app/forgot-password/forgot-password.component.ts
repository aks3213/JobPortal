import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  error= false;
  validates=true;
  submitted=false;
  saveemail="";

  UserData:any={};

  constructor(private _auth: AuthService,
    private _router: Router,private formBuilder: FormBuilder) { }

    registerForm !: FormGroup;

  ngOnInit(): void {
    
  }

  validate(email:string,question:string,answer:string){

    this.UserData.email=email;

    this._auth.validateuser(email,question,answer)
    .subscribe(
      res => {
        console.log(res);
        this.validates=false;
        this._router.navigate(['/forgotpassword2',{email:email}]);
      },
      err => {
        this.error=true,
      console.log(err)
      }
    ) 

  }

  againvalidate(){
    this.error= false;
    this._router.navigate(['/forgotpassword']);
  }
}
