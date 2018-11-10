import { Component, TemplateRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'nz-demo-layout-custom-trigger',
  templateUrl: './dashboard.component.html' ,
  styles  : [
      `
      :host ::ng-deep .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
      }

      :host ::ng-deep .trigger:hover {
        color: #1890ff;
      }

      :host ::ng-deep .logo {
        height: 32px;
        background: rgba(255, 255, 255, .2);
        margin: 16px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        font-size: 16px;
      }
    `
  ]
})
export class DashboardComponent {
  isCollapsed:Boolean = false;
  triggerTemplate = null;
  constructor( private router: Router){

  }
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  gotoUrl(url){
    this.router.navigate([url]);
    console.log(url)
  }
}
