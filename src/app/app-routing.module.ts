import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { OtherComponent } from './pages/other/other.component';
import { LoginComponent } from './pages/login/login.component';
import { RxDemoComponent } from './pages/rx-demo/rx-demo.component';
const routes: Routes = [
  {
    path: '',
    //component: ListComponent
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'other',
        component: OtherComponent
      },
      {
        path: 'rx',
        component: RxDemoComponent
      }
    ]
  }, {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

