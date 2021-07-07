import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { CategoryComponent } from './category/category.component';
import { TypesComponent } from './types/types.component';
import { EvaluationStudentComponent } from './evaluation-student/evaluation-student.component';
import { CertComponent } from './cert/cert.component';
import { TestsSchoolComponent } from './tests-school/tests-school.component';
import { TestsInComponent } from './tests-in/tests-in.component';
import { TestsTrendComponent } from './tests-trend/tests-trend.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'ראשי'
        },
        component: TeacherHomeComponent,
        children: [
            {
                path: 'types/:type',
                data: {
                    title: 'הזנת נתונים לתעודה'
                },
                component: TypesComponent
            },
            {
                path: 'evaluation/:type',
                data: {
                    title: 'הערכות לתעודה'
                },
                component: EvaluationStudentComponent
            },
            {
                path: 'cert/:type',
                data: {
                    title: 'תעודות'
                },
                component: CertComponent
            },
        ]
    },
    {
        path: 'tests',
        data: {
            title: 'ציונים להבחניות'
        },
        component: TeacherHomeComponent,
        children: [
            {
                path: '',
                data: {
                    title: 'בית סיפרית'
                },
                component: TestsSchoolComponent
            },
            {
                path: 'school',
                data: {
                    title: 'בית סיפרית'
                },
                component: TestsSchoolComponent
            },
            {
                path: 'in',
                data: {
                    title: 'פנימית'
                },
                component: TestsInComponent
            },
            {
                path: 'trend',
                data: {
                    title: 'מגמה'
                },
                component: TestsTrendComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeacherRoutingModule { }
