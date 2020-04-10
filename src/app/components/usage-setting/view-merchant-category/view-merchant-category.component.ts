import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-merchant-category',
  templateUrl: './view-merchant-category.component.html',
  styleUrls: ['./view-merchant-category.component.css']
})
export class ViewMerchantCategoryComponent implements OnInit {

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
