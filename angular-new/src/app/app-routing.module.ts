import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./components/manager/manager.module').then(m => m.ManagerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'secretary',
    loadChildren: () => import('./components/secretary/secretary.module').then(m => m.SecretaryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'teacher',
    loadChildren: () => import('./components/teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
