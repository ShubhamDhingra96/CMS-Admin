import { Component, OnInit, NgZone, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Errors } from '../../filters/Errors';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import * as $ from 'jquery';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataService } from 'src/app/DataService';
import { AccessrightsService } from 'src/app/services/accessrights.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],  
})
export class DashboardComponent {
  
  constructor(private dataService:DataService,private router: Router,private accessrightService: AccessrightsService, private zone: NgZone){
    this.dataService.getFlag(true);
    if(sessionStorage.getItem('user')){}
    else{
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
    

  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      // Add data
      chart.data = [{
        "country": "USA",
        "visits": 2025
      }, {
        "country": "China",
        "visits": 1882
      }, {
        "country": "Japan",
        "visits": 1809
      }, {
        "country": "Germany",
        "visits": 1322
      }, {
        "country": "UK",
        "visits": 1122
      }, {
        "country": "France",
        "visits": 1114
      }, {
        "country": "India",
        "visits": 984
      }, {
        "country": "Spain",
        "visits": 711
      }, {
        "country": "Netherlands",
        "visits": 665
      }, {
        "country": "Russia",
        "visits": 580
      }, {
        "country": "South Korea",
        "visits": 443
      }, {
        "country": "Canada",
        "visits": 441
      }, {
        "country": "Brazil",
        "visits": 395
      }];
      // Create axes

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
        if (target.dataItem && target.dataItem.index) {
          return dy + 25;
        }
        return dy;
      });

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "visits";
      series.dataFields.categoryX = "country";
      series.name = "Visits";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = .8;

      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
    });

    //second chart
    this.zone.runOutsideAngular(() => {
      let chart1 = am4core.create("chartdiv1", am4charts.XYChart);

      chart1.paddingRight = 20;

      // Add data
      chart1.data = [{
        "country": "USA",
        "visits": 2025
      }, {
        "country": "China",
        "visits": 1882
      }, {
        "country": "Japan",
        "visits": 1809
      }, {
        "country": "Germany",
        "visits": 1322
      }, {
        "country": "UK",
        "visits": 1122
      }, {
        "country": "France",
        "visits": 1114
      }, {
        "country": "India",
        "visits": 984
      }, {
        "country": "Spain",
        "visits": 711
      }, {
        "country": "Netherlands",
        "visits": 665
      }, {
        "country": "Russia",
        "visits": 580
      }, {
        "country": "South Korea",
        "visits": 443
      }, {
        "country": "Canada",
        "visits": 441
      }, {
        "country": "Brazil",
        "visits": 395
      }];
      // Create axes

      let categoryAxis = chart1.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
        if (target.dataItem && target.dataItem.index) {
          return dy + 25;
        }
        return dy;
      });

      let valueAxis = chart1.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart1.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "visits";
      series.dataFields.categoryX = "country";
      series.name = "Visits";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = .8;

      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
    });
  }
}