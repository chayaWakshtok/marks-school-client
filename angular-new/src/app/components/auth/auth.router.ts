import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    {
        path: 'register',
        data: {
            title: 'Register'
        },
        component:RegisterComponent
    },
    {
        path: '',
        data: {
            title: 'Login'
        },
        component:LoginComponent
    },
    {
        path: 'login',
        data: {
            title: 'Login'
        },
        component:LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
