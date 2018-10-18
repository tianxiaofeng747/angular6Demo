import { Component, OnInit } from '@angular/core';
import {ElementRef,ViewChild, ViewContainerRef} from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.scss']
})
export class RxDemoComponent implements OnInit {

  constructor( private el: ElementRef) { }
  @ViewChild('tian' , { read: ViewContainerRef }) viewcontainer: ViewContainerRef;
  //@ViewChild('tian') viewelement: ElementRef;　
  ngOnInit() {
    console.log(this.viewcontainer);
    // let click = fromEvent(this.viewcontainer.element, 'click');
    // click.subscribe( (evt: MouseEvent) =>{
    //   console.log(evt);
    // });
    //console.log(Observable);
  }

}
