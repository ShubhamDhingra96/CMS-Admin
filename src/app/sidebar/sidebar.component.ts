import { Component, OnInit, NgZone, Input, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Errors } from '../filters/Errors';
import { Route, Router } from '@angular/router';
import * as $ from 'jquery';
import { DataService } from '../DataService';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
 
})
export class SidebarComponent implements OnInit {

  private dashboard_functions:any[]=[];

  private error: Errors;

  isOpen = true;
  alert(i){
    console.log(i);
    console.log(this.dashboard_functions.length)
   if(i===this.dashboard_functions.length){
    $('.dropmenu').on('click', function (){     
      $(this).toggleClass('openmenu');
      $(this).next('.submenu').slideToggle(200);
      $(this).parent().siblings().children().removeClass('openmenu').next().slideUp();
        return false
      });
    }
 
   
  }
  constructor(private zone: NgZone,private fb: FormBuilder,private loginService: LoginService,private router: Router, public dataService: DataService) {
  
    
      
    $(document).ready(function () {
      $('.report-child').hide();
      $('.reports').on('click', function () {
        $(this).toggleClass('active-menuitem');
        $('.report-child').toggle('fast');
      });
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active', 1000);
      });
      
    });
  
  }

  ngOnInit() {
    this.dataService.currentObject.subscribe(data=>this.dashboard_functions=data);
     
  }

  

}
