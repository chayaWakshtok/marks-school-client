import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { HomeSecretaryComponent } from './home-secretary/home-secretary.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'ראשי'
        },
        component: HomeSecretaryComponent,
        children: [
            {
                path: '',
                data: {
                    title: 'תלמידות'
                },
                component: StudentsComponent
            },
            {
                path: 'students',
                data: {
                    title: 'תלמידות'
                },
                component: StudentsComponent
            },
            {
                path: 'teachers',
                data: {
                    title: 'מורות'
                },
                component: TeachersComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecretaryRoutingModule { }
