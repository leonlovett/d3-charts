import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface EmployeesResponse {
  results: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userUrl: string = 'https://randomuser.me/api?inc=dob,gender,name,location,picture&results=';

  constructor(
    private readonly http: HttpClient
  ) { }

  async getData() {
    const numberOfUsers = Math.floor(Math.random() * 2500);
    return this.http.get<EmployeesResponse>(`${this.userUrl}${numberOfUsers}&noinfo`).toPromise();
  }

}
