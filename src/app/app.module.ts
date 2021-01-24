import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeGenderComponent } from './components/employee-gender/employee-gender.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { EmployeeCountryComponent } from './components/employee-country/employee-country.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';

const matModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeGenderComponent,
    ToolbarComponent,
    EmployeeCountryComponent,
    EmployeeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...matModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
