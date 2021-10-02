import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jobseeker-login',
  templateUrl: './jobseeker-login.component.html',
  styleUrls: ['./jobseeker-login.component.css']
})
export class JobseekerLoginComponent implements OnInit {

  loginUserData:any={"usertype":"1"}

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    
  }

  
  error=false;
  loginUsers(email:string,password:string) {
    this._auth.loginJS(email,password)
    .subscribe(
      res => {
        console.log(res)
        this._router.navigate(['/home'])
      },
      err => {
        this.error=true,
      console.log(err)
      }
    ) 
  }

  
  againloginUsers(){
    this.error=false,
    this._router.navigate(['/jobseekerLogin'])
  }
 

}
