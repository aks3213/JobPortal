import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFAQComponent } from './view-faq.component';

describe('ViewFAQComponent', () => {
  let component: ViewFAQComponent;
  let fixture: ComponentFixture<ViewFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFAQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
