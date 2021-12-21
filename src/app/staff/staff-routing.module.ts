import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddNewStaffComponent } from './add-new-staff/add-new-staff.component';

import { StaffComponent } from './staff.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { TopStaffComponent } from './top-staff/top-staff.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminGuard } from '../admin/admin.guard';
import { StaffListComponent } from './staff-list/staff-list.component';

const routes: Routes = [
  {
    path: 'staff',
    component: StaffComponent,
    children: [
      {path: '', redirectTo: '/staff/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: TopStaffComponent},
      {path: 'staff_list', component: StaffListComponent},
      {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
      {path: 'staff_card/:id', component: StaffCardComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
