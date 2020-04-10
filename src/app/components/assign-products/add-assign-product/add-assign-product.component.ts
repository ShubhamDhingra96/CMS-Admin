import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assign-product',
  templateUrl: './add-assign-product.component.html',
  styleUrls: ['./add-assign-product.component.css']
})
export class AddAssignProductComponent implements OnInit {

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
