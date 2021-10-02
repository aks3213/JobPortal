import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private  webRequestService:WebRequestService) { }

  getJob(){
    return this.webRequestService.get('jobs');
  }

  getId(){
    return this.webRequestService.get('getuserid');
  }

  createJob(title:string,description:string,longdescription:string,minexperience:string,minsalary:string,maxsalary:string,location:string,minqualification:string,cname:string,cpname:string,phone:string,uid:string,vacancy:string){
    return this.webRequestService.post('jobs', {title,description,longdescription,minexperience,minsalary,maxsalary,location,minqualification,cname,cpname,phone,uid,vacancy});
  }

  getjob(id:string){
    return this.webRequestService.getjob(id);
  }

  getOnejobs(id:string){
    return this.webRequestService.getOnejobs(id);
  }

  deleteJob(id:string){
    return this.webRequestService.deleteJob(id);
  }

  searchJob(searchText:string){
    return this.webRequestService.searchJob({searchText});
  }

  editJob(user: object){
    return this.webRequestService.editJob(user);
  }

  mail(email:string,description:string,subject:string){
    return this.webRequestService.mail('mailnotification',{email,description,subject})

  }

  Username(id:string){
    return this.webRequestService.Username(id);
  }

  UsernamebyEmail(id:string){
    return this.webRequestService.UsernamebyEmail(id);
  }

  

  faq(Question:string,uid:string){
    return this.webRequestService.mail('faq/question',{Question,uid})
  }

  adminfaq(Answer:string,_id:string){
    return this.webRequestService.adminfaq('faq/addanswer',{Answer,_id})
  }

  getquestion(){
    return this.webRequestService.getquestion('faq/answer');
  }

  createResume(user: object){
    return this.webRequestService.createResume(user);
  }

  getResume(){
    return this.webRequestService.getResume();
  }

  deleteResume(id:string){
    return this.webRequestService.deleteJob(id);
  }

  getOneResume(id:string){
    return this.webRequestService.getOneResume(id);
  }

  searchResume(searchText:string){
    return this.webRequestService.searchResume({searchText});
  }

  editResume(user: object){
    return this.webRequestService.editResume(user);
  }

  getResumes(uid:string){
    return this.webRequestService.getResumes(uid);
  }


  hire(Notification:object){
    return this.webRequestService.hire('Notification/Hire',Notification)
  }

  gethire(email:string){
    return this.webRequestService.gethire('Notification',email);
  }

  Accept(user:object){
    return this.webRequestService.Accept('Notification/Accept',user);
  }



  Apply(Notification:object){
    return this.webRequestService.hire('Notification/Apply',Notification)
  }

  getApply(email:string){
    return this.webRequestService.gethire('Notification/Apply',email);
  }

  ApplyAccept(user:object){
    return this.webRequestService.Accept('Notification/AcceptApply',user);
  }


  getemployes(email:string){
    return this.webRequestService.gethire('Notification/MyEmployes',email);
  }

  getratting(){
    return this.webRequestService.getratting('ratting/get');
  }

  getjobs(email:string){
    return this.webRequestService.getjobs('ratting/viewjobs',email);
  }

  givratting(email:string,Ratting:number,uid:string){
    return this.webRequestService.giverattting('ratting/update',email,{Ratting,uid})
  }

  
}
