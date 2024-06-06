import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisionComponent } from './supervision.component';
import { SupervisionRoutingModule } from './supervision-routing.module';
import { KnobModule } from 'primeng/knob';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SupervisionComponent
  ],
  imports: [
    CommonModule,
    SupervisionRoutingModule,

    KnobModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ConfirmPopupModule,
    ToastModule,
    FileUploadModule,
    HttpClientModule,
    //CalendarModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
		//SliderModule,
		//DialogModule,
		//MultiSelectModule,
		//ContextMenuModule,
		DropdownModule,
		ButtonModule,
    ChipModule,
    BadgeModule,
		//ToastModule,
    InputTextModule,
    ProgressBarModule,
    //HttpClientModule,
    FormsModule
  ]
})
export class SupervisionModule { }
