import { ApiService } from '@/service/api.service';
import { Component, OnInit } from '@angular/core';

const URL = {
  list: 'ypt.application.findApplication', // 已接入产品列表
  UN_LIST: 'ypt.application.findUnPluginApplication', // 可接入产品列表
  DETAIL: 'ypt.application.getApplication', // 产品详情
  ADD: 'ypt.application.createApplication', // 新增接入产品
  EDIT: 'ypt.application.updateApplication', // 编辑接入产品
  RIGHT_LIST: 'ypt.rights.findAppRights',	//权限
  RIGHT_EDIT: 'ypt.rights.updateAppRights',	//
  CHECKUPDATE: 'ypt.application.findUUMAppInfoById',
};
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  
  private keywords:String = '';
  private list:Array<any> = [];
  page =  {
    pageSize: 20,
    pageIndex: 1,
    total: 0
  }
  constructor(private api: ApiService) { }
  getList(pageIndex = 1) {
    let param = { keywords: this.keywords };
    this.api.post(URL.list, {
      params: param,
      pageIndex: pageIndex,
      pageSize: this.page.pageSize
    }).then(result => {
      let data = result.data;
      this.page.pageIndex = data.pageIndex;
      this.page.pageSize = data.pageSize;
      this.page.total = data.total;
      this.list = data.rows || [];
      this.list.forEach((item, index) => {
        item.index = (this.page.pageIndex - 1) * this.page.pageSize + index + 1;
      });
    });
  }

  ngOnInit() {
    this.getList();
  }
  private isVisible:Boolean = false;
  private checkedId:String;
  detail(row): void {
    this.checkedId = row.id;
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
