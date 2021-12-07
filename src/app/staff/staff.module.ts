import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StaffRoutingModule } from './staff-routing.module';

import { StaffComponent } from './staff.component';
import { AddNewStaffComponent } from './add-new-staff/add-new-staff.component';


@NgModule({
  declarations: [
    StaffComponent,
    AddNewStaffComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
