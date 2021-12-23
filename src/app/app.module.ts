import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { MaxLengthDirective } from './shared/max-length.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { StaffModule } from './staff/staff.module';
import { ShowcaseComponent } from './showcase/showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NotFoundComponent,
    AuthComponent,
    MaxLengthDirective,
    NavigationBarComponent,
    ShowcaseComponent,
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
