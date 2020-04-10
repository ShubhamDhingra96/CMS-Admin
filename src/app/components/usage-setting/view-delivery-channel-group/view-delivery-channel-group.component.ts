import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-delivery-channel-group',
  templateUrl: './view-delivery-channel-group.component.html',
  styleUrls: ['./view-delivery-channel-group.component.css']
})
export class ViewDeliveryChannelGroupComponent implements OnInit {

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
    this.dataService.getFlag(true)
  }

}
