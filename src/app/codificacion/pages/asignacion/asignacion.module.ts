import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionComponent } from './asignacion.component';
import { AsignacionRoutingModule } from './asignacion-rounting.module';
import { CargaCodificadorComponent } from './carga-codificador/carga-codificador.component';
import { CargaSupervisorComponent } from './carga-supervisor/carga-supervisor.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
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
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    AsignacionComponent,
    CargaCodificadorComponent,
    CargaSupervisorComponent

  ],
  imports: [
    CommonModule,
    AsignacionRoutingModule,

    //BrowserModule,
    //BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CheckboxModule,
    ToastModule,
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
export class AsignacionModule { }
