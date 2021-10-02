import { NotFoundComponent } from './not-found/not-found.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';
import { JobseekerRegisterComponent } from './jobseeker-register/jobseeker-register.component';
import { LogoutComponent } from './logout/logout.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ServiceComponent } from './our-service/service.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageEmployerComponent } from './manage-employer/manage-employer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPassword2Component } from './forgot-password2/forgot-password2.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfile2Component } from './edit-profile2/edit-profile2.component';
import { PdfmakerComponent } from './pdfmaker/pdfmaker.component';
import { RatingComponent } from './rating/rating.component';
import { MailNotificationsComponent } from './mail-notifications/mail-notifications.component';
import { FAQComponent } from './faq/faq.component';
import { AdminFAQComponent } from './admin-faq/admin-faq.component';
import { ViewFAQComponent } from './view-faq/view-faq.component';
import { ViewJobsByEmployerComponent } from './view-jobs-by-employer/view-jobs-by-employer.component';
import { ViewResumeComponent } from './view-resume/view-resume.component';
import { SearchResumeComponent } from './search-resume/search-resume.component';
import { EditResumeComponent } from './edit-resume/edit-resume.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { FooterComponent } from './footer/footer.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { HireComponent } from './hire/hire.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { MyEmployesComponent } from './my-employes/my-employes.component';
import { VewJobDetailsComponent } from './view-job-details/vew-job-details.component';
import { ViewUsersComponent } from './view-users/view-users.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  
  {path: 'home', component: HomeComponent},
  {path: 'jobseekerLogin', component: JobseekerLoginComponent},
  {path: 'jobseekerRegister', component: JobseekerRegisterComponent},
  {path: 'employerLogin', component: EmployerLoginComponent},
  {path: 'employerRegister', component: EmployerRegisterComponent},
  
  {path: 'logout', component: LogoutComponent},
  {path: 'navigation', component: NavigationBarComponent},
  {path: 'about', component: AboutusComponent},
  {path: 'contact', component: ContactusComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'addJob', component: AddJobComponent},
  {path: 'viewjob', component: ViewJobsComponent},
  {path: 'managejobseeker', component: ManageUserComponent},
  {path: 'manageemplyer', component: ManageEmployerComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'forgotpassword2', component: ForgotPassword2Component},
  {path: 'viewProfile', component: ViewProfileComponent},
  {path: 'editProfile', component: EditProfileComponent},
  {path: 'editProfile2', component: EditProfile2Component},
  {path: 'CreateResume', component: PdfmakerComponent},
  {path: 'rating', component: RatingComponent},
  {path: 'mailNotification', component: MailNotificationsComponent},
  {path: 'addquestion', component: FAQComponent},
  {path: 'Answer', component: AdminFAQComponent},
  {path: 'ViewFAQ', component: ViewFAQComponent},
  {path: 'ViewJobs', component: ViewJobsByEmployerComponent},
  {path: 'ViewResume', component: ViewResumeComponent},
  {path: 'SearchResume', component: SearchResumeComponent},
  {path: 'EditResume', component: EditResumeComponent},
  {path: 'SearchJobs', component: SearchJobsComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'EditJob/:jobId', component: EditJobsComponent},
  {path: 'ViewAllJobs', component: MyJobsComponent},
  {path: 'Hire/:email', component: HireComponent},
  {path: 'ViewNotification/:email', component: ViewNotificationComponent},
  {path: 'ApplyForJob/:jobid', component: ApplyForJobComponent},
  {path: 'MyEmployes/:jobid', component: MyEmployesComponent},
  {path: 'job/:id', component: VewJobDetailsComponent},
  {path: 'FindUser', component: ViewUsersComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ HomeComponent,
                                  EmployerLoginComponent, EmployerRegisterComponent,NotFoundComponent,
                                  JobseekerLoginComponent, JobseekerRegisterComponent, LogoutComponent,
                                  NavigationBarComponent, AboutusComponent, ContactusComponent, ServiceComponent,
                                  AdminLoginComponent, AddJobComponent, ViewJobsComponent, ManageUserComponent,
                                  ManageEmployerComponent, ForgotPasswordComponent, ForgotPassword2Component,
                                  ViewProfileComponent, EditProfileComponent, EditProfile2Component, PdfmakerComponent,
                                  RatingComponent, MailNotificationsComponent, FAQComponent, AdminFAQComponent, ViewFAQComponent,
                                  ViewJobsByEmployerComponent, ViewResumeComponent, SearchResumeComponent, EditResumeComponent,
                                  SearchJobsComponent, FooterComponent, EditJobsComponent, MyJobsComponent, HireComponent,
                                  // tslint:disable-next-line:max-line-length
                                  ViewNotificationComponent, ApplyForJobComponent, MyEmployesComponent, ViewUsersComponent, VewJobDetailsComponent
                                          ];
