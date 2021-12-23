import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

import { CustomPreloadingStrategyService } from './services/custom-preloading-strategy.service';
import { ShowcaseComponent } from './showcase/showcase.component';

const routes: Routes = [
  {path: '', redirectTo: '/staff', pathMatch: 'full'},
  {path: 'staff', component: StaffComponent},
  {
    path: 'paint', 
    loadChildren: () => import('./paint/paint.module').then(m => m.PaintModule),
    data: {preload: true}
  },
  {path: 'showcase', component: ShowcaseComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {preloadingStrategy: CustomPreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
