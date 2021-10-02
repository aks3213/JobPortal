import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobsByEmployerComponent } from './view-jobs-by-employer.component';

describe('ViewJobsByEmployerComponent', () => {
  let component: ViewJobsByEmployerComponent;
  let fixture: ComponentFixture<ViewJobsByEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobsByEmployerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobsByEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
