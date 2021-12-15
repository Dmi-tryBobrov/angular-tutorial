import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { MessagesComponent } from './messages/messages.component';
import { TopStaffComponent } from './top-staff/top-staff.component';
import { StaffCardSearchComponent } from './staff-card-search/staff-card-search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { MaxLengthDirective } from './shared/max-length.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffCardComponent,
    MessagesComponent,
    TopStaffComponent,
    StaffCardSearchComponent,
    NotFoundComponent,
    AuthComponent,
    MaxLengthDirective,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
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
