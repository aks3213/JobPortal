import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';
import { JobseekerRegisterComponent } from './jobseeker-register/jobseeker-register.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { LogoutComponent } from './logout/logout.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ServiceComponent } from './our-service/service.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { WebRequestService } from './services/web-request.service';
import { WebReqInterceptor } from './services/web-req-iterceptor.service';
import { ManageEmployerComponent } from './manage-employer/manage-employer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPassword2Component } from './forgot-password2/forgot-password2.component';
import { ViewJobseekerProfileComponent } from './view-jobseeker-profile/view-jobseeker-profile.component';
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
import { SearchResumeComponent } from './search-resume/search-resume.component';
import { ViewResumeComponent } from './view-resume/view-resume.component';
import { EditResumeComponent } from './edit-resume/edit-resume.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { FooterComponent } from './footer/footer.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { MessageService } from './services/message.service';
import { HireComponent } from './hire/hire.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { MyEmployesComponent } from './my-employes/my-employes.component';
import { VewJobDetailsComponent } from './view-job-details/vew-job-details.component';
import { ViewUsersComponent } from './view-users/view-users.component';

import { ModalModule } from './_modal';
//import { Ng2SearchPipeModule } from 'ng2-search-filter/src/ng2-filter.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FileUploadModule } from 'ng2-file-upload';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    JobseekerLoginComponent,
    JobseekerRegisterComponent,
    EmployerLoginComponent,
    EmployerRegisterComponent,
    MustMatchDirective,
    LogoutComponent,
    NavigationBarComponent,
    AboutusComponent,
    ContactusComponent,
    ServiceComponent,
    AdminLoginComponent,
    AddJobComponent,
    ViewJobsComponent,
    ManageUserComponent,
    ManageEmployerComponent,
    ForgotPasswordComponent,
    ForgotPassword2Component,
    ViewJobseekerProfileComponent,
    ViewProfileComponent,
    EditProfileComponent,
    EditProfile2Component,
    PdfmakerComponent,
    RatingComponent,
    MailNotificationsComponent,
    FAQComponent,
    AdminFAQComponent,
    ViewFAQComponent,
    ViewJobsByEmployerComponent,
    SearchResumeComponent,
    ViewResumeComponent,
    EditResumeComponent,
    SearchJobsComponent,
    FooterComponent,
    EditJobsComponent,
    MyJobsComponent,
    HireComponent,
    ViewNotificationComponent,
    ApplyForJobComponent,
    MyEmployesComponent,
    VewJobDetailsComponent,
    ViewUsersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule, MatDialogModule, CommonModule, Ng2SearchPipeModule,FileUploadModule,
    MatButtonModule, MatIconModule, BrowserAnimationsModule,
  ],
  providers: [AuthService,
    WebRequestService, MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
