import { Component, OnInit, NgZone, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Errors } from '../../filters/Errors';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import * as $ from 'jquery';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';


import { DataService } from 'src/app/DataService';
import { AccessrightsService } from 'src/app/services/accessrights.service';


@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],

})
export class DashboardMenuComponent implements OnInit {
  public isCollapsed = true;
  public dashbordForm: FormGroup;
  public dashbordmenu: string = "";
  private dashboard_menu: any[] = [];
  private dashboard_functions: any[] = [];
  public subModule: any[] = [{ active: false }];

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, public dataService: DataService, private accessrightService: AccessrightsService) {

    if (sessionStorage.getItem('user') === 'cmsadmin') {
      this.loginService.getDashboradMenu().subscribe((response) => {
        this.dashboard_menu = JSON.parse(JSON.stringify(response)).list;
        dataService.setdata(this.dashboard_menu);
        this.subModule = [];
        for (let x = 0; x < this.dashboard_menu.length; x++) {
          let data = { active: false };
          this.subModule.push(data)
        }
        this.dataService.getFlag(true);
      })
    } else {
      this.accessrightService.getMenu(sessionStorage.getItem('user').toString())
        .subscribe((response) => {
          this.dashboard_menu = JSON.parse(JSON.stringify(response)).list
          dataService.setdata(this.dashboard_menu);
          this.subModule = [];
          for (let x = 0; x < this.dashboard_menu.length; x++) {
            let data = { active: false };
            this.subModule.push(data)
          }
          this.dataService.getFlag(true);
        })
    }

  }

  ngOnInit() {
    this.dashbordForm = this.fb.group({
      username: [''],
      password: [''],

    });
    this.dataService.currentObject.subscribe(data => this.dashboard_functions = data);

  }

  public getDashboradFunctions(moduleId: String, i: any) {
    this.dashboard_functions = this.dashboard_menu.filter(res => res.moduleId == moduleId)
    this.dataService.changeMessage(this.dashboard_functions);
    for (let x = 0; x < this.dashboard_menu.length; x++) {
      this.subModule[x].active = false;
    }
    this.subModule[i].active = !this.subModule[i].active;

  }

  activateClass() {
    $(this).addClass("active")
  }


}
