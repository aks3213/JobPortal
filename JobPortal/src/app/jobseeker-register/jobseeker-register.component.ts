import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators, NgForm } from '@angular/forms';
declare  var jQuery:  any;
@Component({
  selector: 'app-jobseeker-register',
  templateUrl: './jobseeker-register.component.html',
  styleUrls: ['./jobseeker-register.component.css']
})
export class JobseekerRegisterComponent implements OnInit {

  registerUserData : any={"usertype":"1"}
  //registerUserData.usertype=1;
  mobNumberPattern = "^[0-9]{10}$";

 
 
  error=false;
  

  constructor(private _auth: AuthService,
              private _router: Router) {
                
              }

               
  ngOnInit() {
  }

  

 

  onSubmit() {
    this.registerUser();
  }
  
  submitted=false;
  registerUser() {
    this._auth.signup(this.registerUserData)
    .subscribe(
      res => {
      console.log(res),
        
        this._router.navigate(['/home'])
      },
      err =>{ console.log(err),
        this.error=true
      }
    )      
  }

  againregisterUser(){
    this.error=false,

    this._router.navigate(['/jobseekerRegister'])
  }

}
