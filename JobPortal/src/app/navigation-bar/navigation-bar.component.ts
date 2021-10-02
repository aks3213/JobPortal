import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(public  authService:AuthService,private job: JobService,private _router: Router) { }

  userdata:any=[]
  emailId!:String ;
  usertype!:String ;

  ujobseeker = false;
  uemployer = false;
  admin = false;
  noOne = true;

  ngOnInit(): void {
    this.getid()
  }

  logout(){
    var t = confirm("are you sure??");
    if(t==true){
      this.authService.logout();
      this.ujobseeker = false;
      this.uemployer = false;
      this.admin = false;
      this.noOne = true;
      
      this._router.navigate(['/home']);
    }
  }

  getid(){

   
    this.job.getId().subscribe(
      res => {
              ///this.userid=res.toString(),
              //console.log(res)
              this.userdata= res;
        
             // console.log(this.userdata);
              this.usertype=this.userdata.usertype;
              this.emailId= this.userdata.email;
              //console.log(this.usertype)

              if(this.usertype=="1"){
                this.noOne = false;
                this.uemployer = false;
                this.ujobseeker = true;
              }else if(this.usertype == "2"){
                this.noOne = false;
                this.ujobseeker = false;
                this.uemployer = true;
              }else if(this.usertype == "0"){
                this.noOne = false;
                this.ujobseeker = false;
                this.admin = true;
              }
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

}
