import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {environment } from '@/environments/environment';
import {Tools} from '@/app/utils/global.common';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  
  @Input() list;
  @Input() size;
  constructor() { }
  formatFile (item) {
      let thumbnail;
      switch (Tools.getFileType(item)) {
          case 'image':
              thumbnail = environment.IMAGE_DOWNLOAD + Tools.changeImgSize(item);
              break;
          case 'pdf':
              thumbnail = 'assets/images/pdf.png';
              break;
          default:
              thumbnail = 'assets/images/noimage.png';
              break;
      }
      return {
          thumbnail: thumbnail,
          fullUrl: environment.IMAGE_DOWNLOAD + item,
          url: item
      };
  }
  private width:Number;
  private files:Array<any> = [];
  init(){
    let src;
    if(!this.list){
      return;
    }
    if (typeof this.list === 'string') {
      let splitKey = this.list.indexOf(',') !== -1 ? ',' : this.list.indexOf(';') !== -1 ? ';' : ':';
      src = this.list.split(splitKey);
    } else if (this.list instanceof Array) {
      src = this.list;
    } else {
        console.error('图片格式不正确');
    }
    src && src.forEach(item => {
      if (item.length) {
          this.files.push(this.formatFile(item));
      }
    });
  }
  ngOnInit() {
    switch (this.size) {
      case 'small':
          this.width = 60;
          break;
      case 'mini':
          this.width = 32;
          break;
      default:
          this.width = 100;
          break;
  }
    this.init();
  }
  ngOnChanges(changes: SimpleChanges){
    this.init();
  }
}
