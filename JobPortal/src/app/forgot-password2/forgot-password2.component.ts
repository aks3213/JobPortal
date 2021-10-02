import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-forgot-password2',
  templateUrl: './forgot-password2.component.html',
  styleUrls: ['./forgot-password2.component.css']
})
export class ForgotPassword2Component implements OnInit {
  
    submitted = false;
  validates= false;
  
  

  constructor(private _auth: AuthService,
    private _router: Router,private route:ActivatedRoute) { }

    public param!:Params;
  registerUserData:any={};

  error = false;

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.param=params['email'];
    });
    
    console.log(this.param);
  }
  
  UserData:any={"email":this.param};

  
  
  resetPassword(){

    console.log(this.UserData);

    this._auth.resetpassword(this.param.toString(),this.UserData.password)
    .subscribe(
      res => {
        console.log(res);     
        this._router.navigate(['/home'])
      },
      err => {
        this.validates=true;
      console.log(err)
      }) 
  }

}
