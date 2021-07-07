import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { ManagerRoutingModule } from './manager.router';
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
import { ChartsModule } from 'ng2-charts';
import { IconModule } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrendsComponent } from './trends/trends.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SubjectsComponent } from './subjects/subjects.component';
import {DropdownModule} from 'primeng/dropdown';
import { ClassesComponent } from './classes/classes.component';
import { UsersComponent } from './users/users.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { StudentsComponent } from './students/students.component';
import {CalendarModule} from 'primeng/calendar';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { EvaluationsLevelComponent } from './evaluations-level/evaluations-level.component';
import { CommentComponent } from './comment/comment.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import { MarkRangeComponent } from './mark-range/mark-range.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { TestsComponent } from './tests/tests.component';


@NgModule({
  declarations: [
    HomeManagerComponent,
    TrendsComponent,
    SubjectsComponent,
    ClassesComponent,
    UsersComponent,
    StudentsComponent,
    EvaluationsComponent,
    EvaluationsLevelComponent,
    CommentComponent,
    MarkRangeComponent,
    TestsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
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
    SplitButtonModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class ManagerModule { }
