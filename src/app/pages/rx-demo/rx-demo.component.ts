import { Component, OnInit } from '@angular/core';
import {ElementRef,ViewChild, ViewContainerRef} from '@angular/core';
import {of, interval, concat} from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

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
    let numbers = of(10,20,30);
    var letters = of('a', 'b', 'c');
    
    let result = interval(1000).pipe(
      map(item =>{
        
      })
    );
    result.subscribe(res =>{
      console.log(res)
    });
    // let click = fromEvent(this.viewcontainer.element, 'click');
    // click.subscribe( (evt: MouseEvent) =>{
    //   console.log(evt);
    // });
    //console.log(Observable);
  }

}
