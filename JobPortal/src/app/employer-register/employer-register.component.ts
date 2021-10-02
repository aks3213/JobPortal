import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

//import csc from 'country-state-city'

// Import Interfaces`
//import { ICountry, IState, ICity } from 'country-state-city';

declare var require: any
var worldMapData = require('city-state-country');


//let csc = require('country-state-city').default
@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.css']
})



export class EmployerRegisterComponent implements OnInit {

  registerUserData : any={"usertype":"2"}
  //registerUserData.usertype=1;
  mobNumberPattern = "^[0-9]{10}$";
 error=false;

 countries:any=[]
 states:any=[]
 cities:any=[]
  

  constructor(private _auth: AuthService,
              private _router: Router) {
              }


// statesList = worldMapData.getAllStates();
 countriesList = worldMapData.getAllCountries();
 AllstatesList = worldMapData.getAllStates();

 //statesList = worldMapData.getAllStatesFromCountry('India');


  ngOnInit() {
   // this.getCountries();
  // console.log(this.countriesList)
  
  }

  selectedCountry = true;
  selectedState = true;
 
  title = 'app';
  //states! = [];
  //cities = [];
 
 // console.log(csc(getAllCountries()));

 //const statesList = worldMapData.getAllStates();

 
 
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
 
  
 
 
 
  

  onSubmit() {
    this.registerUser();
  }

  submitted=false;
  registerUser() {
    console.log(this.registerUserData)
    this._auth.signup(this.registerUserData)
    .subscribe(
      res => {
     // console.log(res),
        this._router.navigate(['/home'])
      },
      err =>{ console.log(err),
        this.error=true
      }
    )      
  }

  againregisterUser(){
    this.error=false,

    this._router.navigate(['/employerRegister'])
  }

}
