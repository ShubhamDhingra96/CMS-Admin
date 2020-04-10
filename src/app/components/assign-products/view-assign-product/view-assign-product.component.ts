import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-assign-product',
  templateUrl: './view-assign-product.component.html',
  styleUrls: ['./view-assign-product.component.css']
})
export class ViewAssignProductComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) {
    if (sessionStorage.getItem('user')) { }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  ngOnInit() {
    this.dataService.getFlag(true)
  }

}
