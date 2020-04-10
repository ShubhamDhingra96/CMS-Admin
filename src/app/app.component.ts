import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataService } from './DataService';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery';
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {


  title = 'CMSADMIN';

  private loginActive: boolean = false;


  constructor(private router: Router, private dataService: DataService, private location: Location) {
    window.onpopstate = function (event) {
      history.go(1);
    }
    if (this.router.url === '/') {
      this.loginActive = false;
    } else {
      this.loginActive = true;
    }
    this.dataService.flagObject.subscribe(flag => this.loginActive = flag)
   
  }

  ngOnInit(): void {
  }

  logout() {
  this.dataService.getFlag(false)
  this.dataService.changeMessage([{name}])
  sessionStorage.clear();
  }

 



}
