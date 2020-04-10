import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOnLoadTr]'
})
export class OnLoadTrDirective {

  @Output() appOnLoadTr: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    
  }
  ngOnInit() {      
     this.appOnLoadTr.emit('dummy'); 
  } 

}
