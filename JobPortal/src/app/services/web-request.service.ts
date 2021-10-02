import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
   }

   loginAdmin(email:string,password:string) {
    return this.http.post(`${this.ROOT_URL}/admins/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }
   loginEmployer(email:string,password:string) {
   //  console.log("hello")
    return this.http.post(`${this.ROOT_URL}/users/loginEmployer`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }
  loginJS(email:string,password:string) {
    return this.http.post(`${this.ROOT_URL}/users/loginJS`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  signup(user: any) {
   // console.log(user)
    return this.http.post(`${this.ROOT_URL}/users`, {
      user
    }, {
        observe: 'response'
      });
  }


  updateuser(user: any) {
   // console.log(user)
    return this.http.post(`${this.ROOT_URL}/user/editprofile`, {
      user
    }, {
        observe: 'response'
      });
  }

  adminLogin(user: any) {
    return this.http.post(`${this.ROOT_URL}/admins/login`, {
      user
    }, {
        observe: 'response'
      });
  }

  ///////////////////////////////////////
  
  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/employer/${uri}`);
  }

  post(uri: string, payload: object){
    return this.http.post(`${this.ROOT_URL}/employer/${uri}`, payload);
  }

  Username(id:string){
    return this.http.get(`${this.ROOT_URL}/user/${id}`);
  }

  UsernamebyEmail(email:string){
    return this.http.get(`${this.ROOT_URL}/userbyemail/${email}`);
  }

  getjob(uid:string){
    return this.http.get(`${this.ROOT_URL}/job/${uid}`);
  }

  getOnejobs(id:string){
    return this.http.get(`${this.ROOT_URL}/jobs/${id}`);
  }

  mail(uri: string, payload: object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  getquestion(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  faq(uri: string, payload: object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  adminfaq(uri: string, payload: object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  getUsers(){
    return this.http.get(`${this.ROOT_URL}/jbusers`);
  }

  getUser(){
    return this.http.get(`${this.ROOT_URL}/user/viewProfile`);
  }

  deleteUser(id:string){
    return this.http.delete(`${this.ROOT_URL}/user/${id}`);
  }

  deleteJob(id:string){
    return this.http.delete(`${this.ROOT_URL}/job/${id}`);
  }

  searchJob(user:object){
    return this.http.post(`${this.ROOT_URL}/job/search`,user);
  }

  editJob(user:object){
    return this.http.patch(`${this.ROOT_URL}/job/edit`,user);
  }

  getEmployer(){
    return this.http.get(`${this.ROOT_URL}/eusers`);
  }

  validateuser(){
    return this.http.get(`${this.ROOT_URL}/user/forgotpassword`);
  }


  createResume(user:object){
    return this.http.post(`${this.ROOT_URL}/resume/create`,user);
  }

  getResume(){
    return this.http.get(`${this.ROOT_URL}/resume/view`);
  }

  deleteResume(id:string){
    return this.http.delete(`${this.ROOT_URL}/resume/${id}`);
  }

  getOneResume(id:string){
    return this.http.get(`${this.ROOT_URL}/resume/${id}`);
  }

  searchResume(user:object){
    return this.http.post(`${this.ROOT_URL}/resume/search`,user);
  }

  editResume(user:object){
    return this.http.patch(`${this.ROOT_URL}/resume/edit`,user);
  }

  getResumes(uid:string){
    return this.http.get(`${this.ROOT_URL}/resumes/${uid}`);
  }

  



  hire(uri: string, payload: object){
    //console.log(payload)
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  gethire(uri: string,email:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${email}`);
  }

  Accept(uri: string,user:object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`,user);
  }

  getratting(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);

  }

  getjobs(uri: string,email:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${email}`);
  }

  giverattting(uri: string,email:string,rate:object){
    return this.http.patch(`${this.ROOT_URL}/${uri}/${email}`,rate);
  }

  
}
