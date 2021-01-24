import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { StoreService } from "../../store.service";

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EmployeeTableComponent implements OnInit {

  columnsToDisplay = ['firstName', 'lastName', 'country', 'gender', 'dob', 'age'];

  constructor(
    readonly store: StoreService
  ) { }

  ngOnInit(): void {
  }

}
