import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StaffRoutingModule } from './staff-routing.module';

import { StaffComponent } from './staff.component';
import { AddNewStaffComponent } from './add-new-staff/add-new-staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { StaffCardSearchComponent } from './staff-card-search/staff-card-search.component';
import { TopStaffComponent } from './top-staff/top-staff.component';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    StaffComponent,
    AddNewStaffComponent,
    StaffListComponent,
    StaffCardComponent,
    StaffCardSearchComponent,
    TopStaffComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StaffRoutingModule
  ],
  exports: [
    StaffComponent
  ]
})
export class StaffModule { }
