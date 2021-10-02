import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobseekerProfileComponent } from './view-jobseeker-profile.component';

describe('ViewJobseekerProfileComponent', () => {
  let component: ViewJobseekerProfileComponent;
  let fixture: ComponentFixture<ViewJobseekerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobseekerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobseekerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
