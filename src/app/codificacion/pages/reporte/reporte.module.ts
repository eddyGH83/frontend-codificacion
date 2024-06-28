import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteComponent } from './reporte.component';
import { Reporte1Component } from './reportes/reporte1.component';
import { Reporte2Component } from './reportes/reporte2.component';
import { Reporte3Component } from './reportes/reporte3.component';
import { Reporte4Component } from './reportes/reporte4.component';
import { Reporte5Component } from './reportes/reporte5.component';
import { Reporte6Component } from './reportes/reporte6.component';
import { Reporte7Component } from './reportes/reporte7.component';
import { Reporte8Component } from './reportes/reporte8.component';
import { Reporte9Component } from './reportes/reporte9.component';
import { Reporte10Component } from './reportes/reporte10.component';
import { Reporte11Component } from './reportes/reporte11.component';
import { Reporte12Component } from './reportes/reporte12.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Reporte0Component } from './reportes/reporte0.component';
import { ToastModule } from 'primeng/toast';




@NgModule({
  declarations: [
    ReporteComponent,
    Reporte1Component,
    Reporte2Component,
    Reporte3Component,
    Reporte4Component,
    Reporte5Component,
    Reporte6Component,
    Reporte7Component,
    Reporte8Component,
    Reporte9Component,
    Reporte10Component,
    Reporte11Component,
    Reporte12Component,
    Reporte0Component
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ToolbarModule,
    SplitButtonModule,
    AccordionModule,
    TabViewModule,
    PanelModule,
    FieldsetModule,
    MenuModule,
    DividerModule,
    SplitterModule,
    ToastModule
  ]
})
export class ReporteModule { }
