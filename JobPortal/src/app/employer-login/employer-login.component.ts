import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.css']
})
export class EmployerLoginComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    
  }
  error = false;
  
  loginUsers(email:string,password:string) {
    //console.log(email+" "+password)
    //console.log(this.loginUserData)
    this._auth.loginEmployer(email,password)
    .subscribe(
      res => {
        //console.log(res)
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
    this._router.navigate(['/employerLogin'])
  }
}
