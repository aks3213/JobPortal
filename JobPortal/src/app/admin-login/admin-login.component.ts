import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {



  loginUserData:any={"asertype":"0"}

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    
  }


  
  error=false;
  loginUsers(email:string,password:string) {
    this._auth.loginAdmin(email,password)
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
    this._router.navigate(['/adminLogin'])
  }
}
