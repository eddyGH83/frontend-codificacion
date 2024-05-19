import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { DiccionariosRoutingModule } from './diccionarios-routing.module';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { CorrectorComponent } from './corrector/corrector.component';
import { MatrizOcupActEconComponent } from './matriz-ocup-act-econ/matriz-ocup-act-econ.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
//import { ConfirmPopupModule } from 'primeng/confirmpopup';


@NgModule({
  declarations: [
    CatalogosComponent,
    CorrectorComponent,
    MatrizOcupActEconComponent
  ],
  imports: [
    CommonModule,
    DiccionariosRoutingModule,
    DividerModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    //ConfirmPopupModule,

    //BrowserModule,
    //BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    //CalendarModule,
    MessagesModule,
    MessageModule,
		//SliderModule,
		//DialogModule,
		//MultiSelectModule,
		//ContextMenuModule,
		DropdownModule,
		ButtonModule,
		//ToastModule,
    InputTextModule,
    ProgressBarModule,
    //HttpClientModule,
    FormsModule
  ],
  providers: [
    MessageService,
    ConfirmationService
    //CatalogosService
  ]
})
export class DiccionariosModule { }
