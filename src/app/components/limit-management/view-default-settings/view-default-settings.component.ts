import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-default-settings',
  templateUrl: './view-default-settings.component.html',
  styleUrls: ['./view-default-settings.component.css']
})
export class ViewDefaultSettingsComponent implements OnInit {

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
