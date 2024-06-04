import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';



@NgModule({
  declarations: [
  
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    FormsModule,
    KnobModule
  ]
})
export class DashboardModule { }
