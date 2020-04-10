import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { ProgrammedefinitionService } from 'src/app/services/programmegroupdefination.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-product-type-definition',
  templateUrl: './view-product-type-definition.component.html',
  styleUrls: ['./view-product-type-definition.component.css']
})
export class ViewProductTypeDefinitionComponent implements OnInit {

  private productDefinationGroup: FormGroup;

  constructor( private dataService: DataService, private router: Router, private programDefinationService: ProgrammedefinitionService) {
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
    this.getProductGroup();
  }

  getProductGroup() {
    this.programDefinationService.getProductGroup(this.productDefinationGroup.get('insertedBy').value).subscribe(data => {
      console.log(JSON.stringify(data));

      this.programDefinationService = data.data;
    },
      error => {

      })


  }

}
