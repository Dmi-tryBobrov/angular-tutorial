import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { TopStaffComponent } from './top-staff/top-staff.component';
import { StaffComponent } from './staff/staff.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

import { CustomPreloadingStrategyService } from './services/custom-preloading-strategy.service';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: TopStaffComponent},
  {
    path: 'staff', 
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
    data: {preload: true}
  },
  {path: 'auth', component: AuthComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'staff_card/:id', component: StaffCardComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {preloadingStrategy: CustomPreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
