
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
import { ManagerModule } from '../manager/manager.module';
import { TeacherRoutingModule } from './teacher.router';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { CategoryComponent } from './category/category.component';
import { TypesComponent } from './types/types.component';
import { MessagesModule } from 'primeng/messages';
import { EvaluationStudentComponent } from './evaluation-student/evaluation-student.component';
import { CertComponent } from './cert/cert.component';
import { TestsSchoolComponent } from './tests-school/tests-school.component';
import { TestsTrendComponent } from './tests-trend/tests-trend.component';
import { TestsInComponent } from './tests-in/tests-in.component';

@NgModule({
    declarations: [
        TeacherHomeComponent,
        CategoryComponent,
        TypesComponent,
        EvaluationStudentComponent,
        CertComponent,
        TestsSchoolComponent,
        TestsTrendComponent,
        TestsInComponent
    ],
    imports: [
        CommonModule,
        TeacherRoutingModule,
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
        ManagerModule,
        MessagesModule
    ],
    providers: [
        MessageService,
        ConfirmationService
    ]
})
export class TeacherModule { }
