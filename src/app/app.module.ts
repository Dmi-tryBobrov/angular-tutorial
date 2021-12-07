import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StaffComponent } from './staff/staff.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { MessagesComponent } from './messages/messages.component';
import { TopStaffComponent } from './top-staff/top-staff.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { StaffCardSearchComponent } from './staff-card-search/staff-card-search.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    StaffCardComponent,
    MessagesComponent,
    TopStaffComponent,
    StaffCardSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
