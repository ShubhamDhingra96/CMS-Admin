import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlasticSetupServiceService } from 'src/app/services/plastic-setup/plastic-setup-service.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-plastic-detail-confirmation',
  templateUrl: './plastic-detail-confirmation.component.html',
  styleUrls: ['./plastic-detail-confirmation.component.css']
})
export class PlasticDetailConfirmationComponent implements OnInit {
  private error: boolean = false;
  private message: string = "";
  private entity: any[] = [];
  private isEntity = false;
  private isView = false;
  private selectEntityForm: FormGroup;
  private hasNoRecords: boolean = false;
  private records: string = "";

  constructor(private http: HttpClient, private loginService: LoginService, private formBuilder: FormBuilder, private plasticService: PlasticSetupServiceService, private dataService: DataService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.isEntity = true;
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  selectEntity() {

    let data = this.selectEntityForm.get('entity').value;
    if (data) {
      this.isEntity = false;
      this.isView = true;
      this.plasticService.getSpecificPlasticDetails(data)
        .subscribe((response) => {

          this.plasticData = JSON.parse(JSON.stringify(response)).list
          if (this.plasticData.length>0) {
            this.hasNoRecords = false;
            this.records = "";
          } else {
            this.hasNoRecords = true;
            this.records = "No records found."
          }
        })
    }
  }

  ngOnInit() {
    this.selectEntityForm = this.formBuilder.group({
      entity: ['']
    })
    this.dataService.getFlag(true)
    // this.getBinData();

    if (sessionStorage.getItem('user') === 'cmsadmin') {
      console.log('yes admin')
      this.loginService.getAllUser().subscribe
        ((response) => {
          this.entity = JSON.parse(JSON.stringify(response)).list;
        })

      this.isEntity = true;
      this.isView = false;
    } else {
      this.isEntity = false;
      this.isView = true;
      this.plasticService.getSpecificPlasticDetails(sessionStorage.getItem('user'))
        .subscribe((response) => {
          this.plasticData = response.list
        })
    }
  }

  plasticData = [];

  getBinData() {
    // console.log("JSON :"+JSON.stringify(this.binData))

    var requestData = {
      "plasticCode": '8888888'
    }
    // var data = this.binSetup;
    this.plasticService.getPlasticDetails(requestData).subscribe(data => {

      this.plasticData = data.list;
      if (this.plasticData.length <= 0) {
        this.error = true;
        this.message = "No record found.";
      }
    },
      error => {
        this.error = true;
        this.message = error.error.message;
      });

  }

  AddPlasticDetails() {


  }

}
