import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ApiService } from '@/app/service/api.service';
import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
const URL = {
  ADD: 'ypt.application.createApplication', // 新增接入产品
  EDIT: 'ypt.application.updateApplication', // 编辑接入产品
  DETAIL: 'ypt.application.getApplication', // 产品详情
  UNRELEASE: 'ypt.application.findUnReleaseApps'
};
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  private unReleaseList: [];
  private resourceType: Array<Object> = [{
    label: '应用服务',
    value: 'applicationServer',
  }, {
    label: '增值服务',
    value: 'valueAddedServices',
  }];
  validateForm: FormGroup;
  @Input() show: boolean;
  @Output() showChange = new EventEmitter();
  @Input() id: string;
  @Output() changeUp = new EventEmitter();

  constructor(private fb: FormBuilder, private api: ApiService, private message: NzMessageService) {

  }

  ngOnInit() {
    this.getUnrelease();
    this.validateForm = this.fb.group({
      appName: [null, [Validators.required]],
      appCode: [{ value: '', disabled: true }],
      appVersion: [{ value: '', disabled: true }],
      appRole:  [{ value: '', disabled: true }],
      protocolInfo: [null],
      appUrl: [null],
      appType: [null, [Validators.required]]
    });
  }
  //获取app list
  getUnrelease() {
    this.api.post(URL.UNRELEASE, {}).then(result => {
      let data = result.data;
      this.unReleaseList = data;
    });
  }
  handleOk() {
    let params = {};
    for (const i in this.validateForm.controls) {
      let control = this.validateForm.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
      
    }
    let url = this.id ? URL.EDIT : URL.ADD;
    if (this.validateForm.valid) {
      this.api.post(url, {
        params: this.validateForm.value
      }).then(result => {
        this.message.create('success', '保存成功');
        this.changeUp.emit();
        this.handleCancel();
      });
    }
    //this.changeUp.emit(null);
  }
  //双向绑定
  handleCancel() {
    this.show = false;
    this.showChange.emit(this.show);
  }
  handleChangeApp(val) {
    let temp = this.validateForm.get(val).value;
    let appChecked:any = this.unReleaseList.find((item:any) => item.appName == temp);
    

    this.validateForm.patchValue({
      appUrl: appChecked.appUrl,
      appCode: appChecked.appCode,
      appRole: appChecked.appRole,
      appVersion: appChecked.appVersion,
    });
    
  }
}
