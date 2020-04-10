import { Injectable, NgZone, Component } from '@angular/core';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { DialogService } from 'primeng/api';

@Injectable({
  providedIn: 'root',  
})
export class NotificationService {
  

  constructor(private zone: NgZone,private dialogService:DialogService) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {     
     
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      // The second parameter is the text in the button. 
      // In the third, we send in the css class for the snack bar.   
     
      //this.open(message);
     // this.snackBar.open(message, 'X', {panelClass: ['error']});
    });
  }

  

  public open(error:any){
    
     const ref = this.dialogService.open(ErrorMessageComponent, {
      data:{
      err: error
      }, 
      header: 'Error',
      width: '70%',
      contentStyle: { "max-height": "350px", "overflow": "auto" }
     });

     ref.onClose.subscribe((response: any) => {
    
     });
  }
}


