import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _employees: Array<any> = [];
  genderDomain: Array<any>;
  employeesByGender: Array<any> = [];
  employeesLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  maleToFemaleRatio: number | string;
  countryDomain: Array<any>;
  employeesByCountry: Array<any>;

  getGenderDomain() {
    this.genderDomain = this._employees.map(employee => employee.gender);
  }

  getGenderWinnerCount() {
    return this.employeesByGender.sort((a, b) => b.count - a.count)[0].count;
  }

  getCountryDomain() {
    this.countryDomain = this._employees.map(employee => employee.location.country);
  }

  getCountryWinnerCount() {
    return this.employeesByCountry.sort((a, b) => b.count - a.count)[0].count;
  }

  getEmployees() {
    return this._employees;
  }

  setEmployees(employees) {
    this._employees = employees;
    this.getEmployeesByGender();
    this.getEmployeesByCountry();
    this.getGenderDomain();
    this.getCountryDomain();
    this.employeesLoaded.next(true);
  }

  getEmployeesByGender() {
    const employees = this.getEmployees().reduce((acc, obj) => {
      let key = obj['gender'];
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj);
      return acc;
    }, {});
    this.employeesByGender = [
      {
        gender: 'male',
        count: employees.male.length
      },
      {
        gender: 'female',
        count: employees.female.length
      }
    ].sort((a, b) => {
      if (a.gender.toLowerCase() < b.gender.toLowerCase()) return 1;
      if (a.gender.toLowerCase() > b.gender.toLowerCase()) return -1;
      return 0;
    })
    this.maleToFemaleRatio = (employees.male.length / employees.female.length).toFixed(3);
  }

  getEmployeesByCountry() {
    const employees = this.getEmployees().reduce((acc, obj) => {
      let key = obj['location']['country'];
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj);
      return acc;
    }, {});
    this.employeesByCountry = Object.entries(employees).map(item => {
      return {
        country: item[0],
        count: item[1]['length']
      }
    });
  }

  setEmployeesByCountry(ebc: Array<any>) {
    this.employeesByCountry = [...ebc];
  }

}
