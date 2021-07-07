
import { StudentsComponent } from './students/students.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SecretaryRoutingModule } from './secretary.router';
import { ManagerModule } from '../manager/manager.module';
import { HomeSecretaryComponent } from './home-secretary/home-secretary.component';
import { TeachersComponent } from './teachers/teachers.component';


@NgModule({
  declarations: [
    StudentsComponent,
    HomeSecretaryComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule,
    SecretaryRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    FileUploadModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ConfirmDialogModule,
    DropdownModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule,
    TooltipModule,
    ManagerModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class SecretaryModule { }
