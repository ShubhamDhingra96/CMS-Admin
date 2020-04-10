import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProgrammedefinitionService } from 'src/app/services/programmedefinition.service';

@Component({
  selector: 'app-view-program-definition',
  templateUrl: './view-program-definition.component.html',
  styleUrls: ['./view-program-definition.component.css']
})
export class ViewProgramDefinitionComponent implements OnInit {
  private definitionDetails: any[] = [];
  constructor(private dataService: DataService, private httpClient: HttpClient, private definitionService: ProgrammedefinitionService, private router: Router) {
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
    this.getDefinitionList();
  }

  getDefinitionList() {
    this.definitionService.getProgrammeDefinitionDetails().subscribe(data => {
      console.log(JSON.stringify(data));

      this.definitionDetails = data.data;
    },
      error => {

      })


  }
}
