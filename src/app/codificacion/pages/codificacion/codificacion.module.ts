import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodificacionRoutingModule } from './codificacion-routing.module';
import { AsignarCargaCodificacionComponent } from './asignar-carga-codificacion/asignar-carga-codificacion.component';
import { AsignarCargaSupervisionComponent } from './asignar-carga-supervision/asignar-carga-supervision.component';
import { SupervisarCodificacionComponent } from './supervisar-codificacion/supervisar-codificacion.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { CodificacionComponent } from './codificacion.component';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { CodificacionSimpleComponent } from './codificacion-simple/codificacion-simple.component';
import { CodificacionDobleComponent } from './codificacion-doble/codificacion-doble.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { KnobModule } from 'primeng/knob';


@NgModule({
  declarations: [
    AsignarCargaCodificacionComponent,
    AsignarCargaSupervisionComponent,
    SupervisarCodificacionComponent,
    CodificacionComponent,
    CodificacionSimpleComponent,
    CodificacionDobleComponent
  ],
  imports: [
    CommonModule,
    CodificacionRoutingModule,
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
export class CodificacionModule { }
