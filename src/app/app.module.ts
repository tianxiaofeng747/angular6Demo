import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

//拦截器
import {httpInterceptorProviders} from './http-interceptors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { HeroesListComponent } from './pages/hero-list/hero-list.component';
import { OtherComponent } from './pages/other/other.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RxDemoComponent } from './pages/rx-demo/rx-demo.component';
import { ListDetailComponent } from './pages/list/list-detail/list-detail.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { MyBoxerDirective } from './directive/my-boxer.directive';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeroesListComponent,
    OtherComponent,
    LoginComponent,
    RxDemoComponent,
    ListDetailComponent,
    FileListComponent,
    MyBoxerDirective,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
     BrowserAnimationsModule,
     FormsModule,
     ReactiveFormsModule,
     NgZorroAntdModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
