import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpResponse } from '@angular/common/http'
import {shareReplay,tap} from 'rxjs/operators';
import {WebRequestService} from './web-request.service';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static  admin:boolean;

  private registerurl = "http://localhost:3000/users";
  private validate = "http://localhost:3000/user/forgotpassword";
  private reset = "http://localhost:3000/user/resetpassword";
  private user = "http://localhost:3000/user/viewProfile";

  

  constructor(private router:Router,private webService:WebRequestService,private  http:HttpClient) { }

  
   

    loginAdmin(email:string,password:string) {
      return this.webService.loginAdmin(email,password).pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token')as string, res.headers.get('x-refresh-token')as string);
          AuthService.admin=true;
        })
      )
    }
    loginEmployer(email:string,password:string) {
      return this.webService.loginEmployer(email,password).pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token')as string, res.headers.get('x-refresh-token')as string);
        })
      )
    }
    
    loginJS(email:string,password:string) {
      return this.webService.loginJS(email,password).pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token')as string, res.headers.get('x-refresh-token')as string);
        })
      )
    }

    signup(user: any) {
      return this.webService.signup(user).pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token')as string, res.headers.get('x-refresh-token')as string);
        })
      )
    }

    validateuser(email:string,question:string,answer:string){
      return this.http.post<any>(this.validate, {email,question,answer})
    }

    resetpassword(email:string,password:string){
      return this.http.post<any>(this.reset, {email,password})

    }

    updateuser(user:any){
      return this.webService.updateuser(user);
    }

    getUser(){
      return this.webService.getUser();
    }

   /* getUser(): Observable<Ijobseeker[]>{
      return this.http.get<Ijobseeker[]>(this.user)
    //  .pipe(map(r => { console.log(r); return this.extractData }))
    }*/
  

    

    getUsers(){
      return this.webService.getUsers();
    }

    getEmployer(){
      return this.webService.getEmployer();
    }
  
    deleteUser(id:string){
      return this.webService.deleteUser(id);
    }
    
    getNewAccessToken() {
      return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
        headers: {
          'x-refresh-token': this.getRefreshToken() as string,
          '_id': this.getUserId() as string
        },
        observe: 'response'
      }).pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token') as string);
        })
      )
    }

    private setSession(userId: string, accessToken: string, refreshToken: string) {
      localStorage.setItem('user-id', userId);
      localStorage.setItem('x-access-token', accessToken);
      localStorage.setItem('x-refresh-token', refreshToken);
    }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

    setAccessToken(accessToken: string) {
      localStorage.setItem('x-access-token', accessToken)
    }
    private removeSession() {
      localStorage.removeItem('user-id');
      localStorage.removeItem('x-access-token');
      localStorage.removeItem('x-refresh-token');
    }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  logout() {
      this.removeSession();
      if(AuthService.admin){
        AuthService.admin=false;
      }
      this.router.navigate(['/home']);
  }

    loggedIn() {
    //  console.log("hello!!");
      return !!localStorage.getItem('x-access-token')    
    }

    isAdmin(){
      return AuthService.admin;
    }
}
