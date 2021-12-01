import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopStaffComponent } from './top-staff/top-staff.component';
import { StaffComponent } from './staff/staff.component';
import { StaffCardComponent } from './staff-card/staff-card.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: TopStaffComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'staff_card/:id', component: StaffCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
