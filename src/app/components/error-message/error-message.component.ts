import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ErrorService } from '../../services/error.service';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  providers: []
})
export  class ErrorMessageComponent implements OnInit {
  private error: any;
  public display = false;


  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    $(document).ready(function () {

      $('.close').on('click', function () {
        $("#message").hide('fast');
      });

      $('#close').on('click', function () {
        $("#message").hide('fast');
      })
    });

  }





  ngOnInit() {
    alert(JSON.parse(JSON.stringify(this.config.data)));
    this.error=JSON.parse(JSON.stringify(this.config.data))
  }

  

  public  openDialog() {
   
    
  }
}
