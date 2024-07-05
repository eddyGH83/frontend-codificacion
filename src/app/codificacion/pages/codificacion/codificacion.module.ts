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
import { SupervisionLoteSimpleComponent } from './supervision-lote-simple/supervision-lote-simple.component';
import { SupervisionLoteDobleComponent } from './supervision-lote-doble/supervision-lote-doble.component';
import { SupervisionIndividualDobleComponent } from './supervision-individual-doble/supervision-individual-doble.component';
import { SupervisionIndividualSimpleComponent } from './supervision-individual-simple/supervision-individual-simple.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { RecodificacionSimpleComponent } from './recodificacion-simple/recodificacion-simple.component';
import { RecodificacionDobleComponent } from './recodificacion-doble/recodificacion-doble.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [
    AsignarCargaCodificacionComponent,
    AsignarCargaSupervisionComponent,
    SupervisarCodificacionComponent,
    CodificacionComponent,
    CodificacionSimpleComponent,
    CodificacionDobleComponent,
    SupervisionLoteSimpleComponent,
    SupervisionLoteDobleComponent,
    SupervisionIndividualDobleComponent,
    SupervisionIndividualSimpleComponent,
    RecodificacionSimpleComponent,
    RecodificacionDobleComponent
  ],
  imports: [
    CommonModule,
    CodificacionRoutingModule,
    KnobModule,
    ToolbarModule,
    ScrollTopModule,
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
    CheckboxModule,
    ToggleButtonModule,
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
