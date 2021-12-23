import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaintComponent } from './paint.component';
import { PaintRoutingModule } from './paint-routing.module';



@NgModule({
  declarations: [
    PaintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaintRoutingModule
  ],
  exports: [
    PaintComponent
  ]
})
export class PaintModule { }
