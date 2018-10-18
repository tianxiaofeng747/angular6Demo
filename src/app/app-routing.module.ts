import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './pages/list/list.component';
import {HeroesListComponent} from './pages/hero-list/hero-list.component';
import {OtherComponent} from './pages/other/other.component';
import {LoginComponent} from './pages/login/login.component';
import { RxDemoComponent } from './pages/rx-demo/rx-demo.component';
const routes: Routes = [
  {
    path: '',
    //component: ListComponent
    redirectTo: 'rx',
    pathMatch: 'full',
  },{
    path: 'list',
    component: HeroesListComponent
  },{
    path: 'other',
    component: OtherComponent
  },{
    path: 'login',
    component: LoginComponent
  }, {
    path: 'rx',
    component: RxDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

