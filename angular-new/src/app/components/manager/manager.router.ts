import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { TrendsComponent } from './trends/trends.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { UsersComponent } from './users/users.component';
import { ClassesComponent } from './classes/classes.component';
import { StudentsComponent } from './students/students.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { CommentComponent } from './comment/comment.component';
import { EvaluationsLevelComponent } from './evaluations-level/evaluations-level.component';
import { MarkRangeComponent } from './mark-range/mark-range.component';
import { TestsComponent } from './tests/tests.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'ראשי'
        },
        component: HomeManagerComponent,
        children: [
            {
                path: '',
                data: {
                    title: 'מגמות'
                },
                component: TrendsComponent
            },
            {
                path: 'trends',
                data: {
                    title: 'מגמות'
                },
                component: TrendsComponent
            },
            {
                path: 'subjects',
                data: {
                    title: 'מקצועות'
                },
                component: SubjectsComponent
            },
            {
                path: 'users',
                data: {
                    title: 'משתמשים'
                },
                component: UsersComponent
            },
            {
                path: 'classes',
                data: {
                    title: 'כיתות'
                },
                component: ClassesComponent
            },
            {
                path: 'students',
                data: {
                    title: 'תלמידות'
                },
                component: StudentsComponent
            },
            {
                path: 'evaluations',
                data: {
                    title: 'הערכות'
                },
                component: EvaluationsComponent
            },
            {
                path: 'evaluations-level',
                data: {
                    title: 'דרוגי הערכות'
                },
                component: EvaluationsLevelComponent
            },
            {
                path: 'comments',
                data: {
                    title: 'הערות'
                },
                component: CommentComponent
            },
            {
                path: 'marks-range',
                data: {
                    title: 'טווח ציונים'
                },
                component: MarkRangeComponent
            },
            {
                path: 'tests',
                data: {
                    title: 'הבחניות'
                },
                component: TestsComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
