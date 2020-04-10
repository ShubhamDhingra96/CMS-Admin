import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-specific-setting',
  templateUrl: './view-specific-setting.component.html',
  styleUrls: ['./view-specific-setting.component.css']
})
export class ViewSpecificSettingComponent implements OnInit {

  constructor( private dataService: DataService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  ngOnInit() {
  }

}
