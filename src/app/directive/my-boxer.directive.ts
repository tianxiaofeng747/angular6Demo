import { Directive, ElementRef, Input, SimpleChanges} from '@angular/core';
import Tools from '@/app/utils/global.common';
import $ from 'jquery';
import '@/app/utils/plugins/boxer/jquery.fs.boxer.js';
@Directive({
  selector: '[appMyBoxer]'
})
export class MyBoxerDirective {
  @Input() href;
  constructor(private el: ElementRef) {
    
  }
  init(){
    if (this.href) {
      let type = Tools.getFileType(this.href);
      if (['pdf', 'image'].includes(type)) {
        this.el.nativeElement.href = this.href;
        $(this.el.nativeElement).boxer();
      }
    }
    // $(this.el.nativeElement).click(() => {
    //   return false;
    // });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.init();
  }
}
