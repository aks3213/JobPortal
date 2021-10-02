import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEmployesComponent } from './my-employes.component';

describe('MyEmployesComponent', () => {
  let component: MyEmployesComponent;
  let fixture: ComponentFixture<MyEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
