import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {


  userdata :any={}

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getuser();
  }

  getuser(){
    this._auth.getUsers().subscribe(
      res => this.userdata=res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/home'])
            }
          }
        }
    )
  }

  confirmm(id:string){
    var t = confirm("are you sure??");
    if(t==true){
      this.deleteUser(id);
      this._router.navigate(['/managejobseeker']);
    }
  }

  deleteUser(id:string){
    //console.log("this is param : ", this.param.toString());
    return this._auth.deleteUser(id).subscribe((response: any) => {
      console.log(response.data);
      //navigate to /lists/response._id
      this.getuser();
    });
  }

}
