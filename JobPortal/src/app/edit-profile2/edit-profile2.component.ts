import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


declare var require: any
var worldMapData = require('city-state-country');

@Component({
  selector: 'app-edit-profile2',
  templateUrl: './edit-profile2.component.html',
  styleUrls: ['./edit-profile2.component.css']
})
export class EditProfile2Component implements OnInit {



  

  constructor(private _auth: AuthService,
    private _router: Router) { }

  public myArr: string[] =[];

  userdata:any=[]   
  usertype!:String ;
  id!:string;

  ujobseeker = false;
  uemployer = false;
  admin = false;


  countries:any=[]
 states:any=[]
 cities:any=[]

  registerUserData : any={}
  //registerUserData.usertype=1;
  mobNumberPattern = "^[0-9]{10}$";
  error=false;

  ngOnInit(): void {

    this.getdetails()

  }

  countriesList = worldMapData.getAllCountries();

  onSelectCountry(country_id: string) {
    // this.selectedCountry = country_id;
   //  console.log(country_id)
    // this.selectedState = 0;
     this.cities = [];
    /* this.states = worldMapData.getAllStatesFromCountry(country_id).filter((item:any) => {
       return item.country_id === String(country_id)
     });*/
      this.states = worldMapData.getAllStatesFromCountry(country_id)
     return  this.states
   }
  
   onSelectState(state_id: string) {
    // console.log(state_id)
     //this.selectedState = state_id;
    /* this.cities = this.getCity().filter((item) => {
       return item.state_id === Number(state_id)
     });*/
     this.cities = worldMapData.getAllCitiesFromState(state_id)
     return  this.cities
   }


  getdetails(){
  
    this._auth.getUser().subscribe(

      res => {
        console.log(res);
        this.userdata= res;
        
        console.log(this.userdata);
        this.usertype=this.userdata.usertype;
       // this.id= this.userdata._id;
        console.log(this.usertype)

        if(this.usertype=="1"){
          this.ujobseeker = true;
        }else if(this.usertype == "2"){
          this.uemployer = true;
        }else if(this.usertype == "0"){
          this.admin = true;
        }

        for(let key in this.userdata) {   
            this.myArr.push(this.userdata[key]);
        }

        console.log(this.myArr)
        //console.log(this.myArr[5])
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
           if (err.status === 401) {
             this._router.navigate(['/home'])
           }
         }
      })
  }

  onSubmit() {
    
   // this.registerUser();
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerUserData, null, 4));
   //console.log(this.registerForm.value)
   this.registerUser();
  }

   

  //submitted=false;
  registerUser() {
    console.log(this.registerUserData)
    this._auth.updateuser(this.registerUserData)
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

}
