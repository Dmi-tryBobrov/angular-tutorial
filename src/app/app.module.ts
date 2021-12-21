import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StaffCardComponent } from './staff/staff-card/staff-card.component';
import { MessagesComponent } from './messages/messages.component';
import { TopStaffComponent } from './staff/top-staff/top-staff.component';
import { StaffCardSearchComponent } from './staff/staff-card-search/staff-card-search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { MaxLengthDirective } from './shared/max-length.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AdminComponent } from './admin/admin.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { StaffModule } from './staff/staff.module';

@NgModule({
  declarations: [
    AppComponent,
    // StaffCardComponent,
    MessagesComponent,
    // TopStaffComponent,
    // StaffCardSearchComponent,
    NotFoundComponent,
    AuthComponent,
    MaxLengthDirective,
    // AdminComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    StaffModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
