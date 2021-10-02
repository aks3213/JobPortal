import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VewJobDetailsComponent } from './vew-job-details.component';

describe('VewJobDetailsComponent', () => {
  let component: VewJobDetailsComponent;
  let fixture: ComponentFixture<VewJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VewJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VewJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
