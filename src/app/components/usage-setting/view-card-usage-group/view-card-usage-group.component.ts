import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-card-usage-group',
  templateUrl: './view-card-usage-group.component.html',
  styleUrls: ['./view-card-usage-group.component.css']
})
export class ViewCardUsageGroupComponent implements OnInit {

  constructor(private dataService:DataService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  ngOnInit() {
    this.dataService.getFlag(true)
  }

}
