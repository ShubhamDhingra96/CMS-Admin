import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-definition-confirmation',
  templateUrl: './program-definition-confirmation.component.html',
  styleUrls: ['./program-definition-confirmation.component.css']
})
export class ProgramDefinitionConfirmationComponent implements OnInit {

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
    this.dataService.getFlag(true)
  }

}
