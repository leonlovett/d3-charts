import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCountryComponent } from './employee-country.component';

describe('EmployeeCountryComponent', () => {
  let component: EmployeeCountryComponent;
  let fixture: ComponentFixture<EmployeeCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
