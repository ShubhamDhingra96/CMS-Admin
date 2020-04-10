import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-fees-default-settings',
  templateUrl: './view-fees-default-settings.component.html',
  styleUrls: ['./view-fees-default-settings.component.css']
})
export class ViewFeesDefaultSettingsComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) {
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
