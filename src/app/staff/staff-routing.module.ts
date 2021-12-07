import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddNewStaffComponent } from './add-new-staff/add-new-staff.component';

import { StaffComponent } from './staff.component';
import { StaffCardComponent } from '../staff-card/staff-card.component';

const routes: Routes = [
  {
    path: '', component: StaffComponent,
    children: [
      {
        path: 'add_staff', component: AddNewStaffComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
