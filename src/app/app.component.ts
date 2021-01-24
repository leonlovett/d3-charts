import { Component, OnInit } from '@angular/core';

import { DataService } from "./data.service";
import { StoreService } from "./store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'charts';
  employees: Array<any>;

  constructor(
    private readonly dataService: DataService,
    readonly store: StoreService
  ) {}

  async ngOnInit() {
    const data = await this.dataService.getData();
    this.store.setEmployees(data.results);
  }

}
