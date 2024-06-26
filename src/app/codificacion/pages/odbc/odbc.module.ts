import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdbcRoutingModule } from './odbc-routing.module';
import { OdbcComponent } from './odbc.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    OdbcComponent
  ],
  imports: [
    CommonModule,
    OdbcRoutingModule,
    CalendarModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    DividerModule,
    ProgressBarModule
  ]
})
export class OdbcModule { }
