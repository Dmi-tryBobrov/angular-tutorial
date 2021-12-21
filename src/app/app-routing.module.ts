import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { TopStaffComponent } from './staff/top-staff/top-staff.component';
import { StaffComponent } from './staff/staff.component';
import { StaffCardComponent } from './staff/staff-card/staff-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

import { CustomPreloadingStrategyService } from './services/custom-preloading-strategy.service';
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/staff', pathMatch: 'full'},
  {path: 'staff', component: StaffComponent},
  // {
  //   path: 'staff', 
  //   loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
  //   data: {preload: true}
  // },
  {path: 'auth', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {preloadingStrategy: CustomPreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
