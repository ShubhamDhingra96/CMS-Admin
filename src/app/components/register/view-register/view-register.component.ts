import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-register',
  templateUrl: './view-register.component.html',
  styleUrls: ['./view-register.component.css']
})
export class ViewRegisterComponent implements OnInit {
   //Accordion
   isFirstOpen = true;
  constructor() {
    $(document).ready(function () {

      $('.report-child').show();
      $('.reports').on('click',function(){
        $(this).toggleClass('active-menuitem');
        $('.report-child').toggle('fast');
      });
    

      $('.close').on('click', function () {
        $("#message").hide('fast');
      });

      $('#close').on('click', function () {
        $("#message").hide('fast');
      })

      $('input').focus(function(){
        $(this).parents('.form-group').addClass('focused');
      });
      
      $('input').blur(function(){
        var inputValue = $(this).val();
        if ( inputValue == "" ) {
          $(this).removeClass('filled');
          $(this).parents('.form-group').removeClass('focused');  
        } else {
          $(this).addClass('filled');
        }
      })  
    });


   }

  ngOnInit() {
  }
}
