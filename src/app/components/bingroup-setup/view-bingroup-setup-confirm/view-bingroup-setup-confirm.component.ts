import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bingroup-setup-confirm',
  templateUrl: './view-bingroup-setup-confirm.component.html',
  styleUrls: ['./view-bingroup-setup-confirm.component.css']
})
export class ViewBingroupSetupConfirmComponent implements OnInit {

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
