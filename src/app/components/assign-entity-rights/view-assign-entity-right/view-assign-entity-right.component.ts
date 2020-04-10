import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { LoginService } from 'src/app/services/login.service';
import { AccessrightsService } from 'src/app/services/accessrights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-assign-entity-right',
  templateUrl: './view-assign-entity-right.component.html',
  styleUrls: ['./view-assign-entity-right.component.css']
})
export class ViewAssignEntityRightComponent implements OnInit {

  private rights: any[] = [];
  private dashboard_menu: any[] = [];
  private user = null;
  constructor(private dataService: DataService,private router: Router, private loginService: LoginService, private accessrightService: AccessrightsService) {

    if(sessionStorage.getItem('user')){}
    else{
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
   }

  ngOnInit() {
    this.user = sessionStorage.getItem('user')
    if (sessionStorage.getItem('user') === 'cmsadmin') {
      this.loginService.getDashboradMenu().subscribe((response) => {
        this.dashboard_menu = JSON.parse(JSON.stringify(response)).list;
        this.addMenu(this.dashboard_menu);
        this.dataService.getFlag(true);
      })
    } else {
      this.accessrightService.getMenu(sessionStorage.getItem('user').toString())
        .subscribe((response) => {
          this.dashboard_menu = JSON.parse(JSON.stringify(response)).list
          this.addMenu(this.dashboard_menu);
          this.dataService.getFlag(true);
        })
    }
  }
  addMenu(dashboard_menu: any[]) {
    
    for (let menu of dashboard_menu) {        
      
      for (let submenu of menu.cmsFunctionsList) {
        let accessRight=menu.moduleName+" --  "+submenu.functionName+" --  ";
        for (let subsubmenu of submenu.cmsJobsList) {
          accessRight+=subsubmenu.jobName+", ";
        }
        this.rights.push(accessRight);
      }
     
    }
  }

}
