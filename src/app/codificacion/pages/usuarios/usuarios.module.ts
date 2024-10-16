import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminSupComponent } from './admin-sup/admin-sup.component';
import { AdminJturnoComponent } from './admin-jturno/admin-jturno.component';
import { AdminRespComponent } from './admin-resp/admin-resp.component';
import { AdminComponent } from './admin/admin.component';
import { ChipModule } from 'primeng/chip';




@NgModule({
  declarations: [
  
    UsuariosComponent,
       AdminSupComponent,
       AdminJturnoComponent,
       AdminRespComponent,
       AdminComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    ProgressBarModule,
    TooltipModule,
    ButtonModule,
    ChipModule,

    MessagesModule,
    MessageModule,

    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    RatingModule,
    FormsModule
    
  ],
  providers: [
    MessageService,
    ConfirmationService
    //CatalogosService
  ]
})
export class UsuariosModule { }
