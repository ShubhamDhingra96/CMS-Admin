import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOnCreate]'
})
export class OnCreateDirective {
 
 
    @Output() appOnCreate: EventEmitter<any> = new EventEmitter<any>();
    constructor() {
      
    }
    ngOnInit() {      
       this.appOnCreate.emit('dummy'); 
    } 
  
  }


