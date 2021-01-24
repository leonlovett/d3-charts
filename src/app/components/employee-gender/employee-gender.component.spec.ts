import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGenderComponent } from './employee-gender.component';

describe('EmployeeGenderComponent', () => {
  let component: EmployeeGenderComponent;
  let fixture: ComponentFixture<EmployeeGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
