import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlasticSetupServiceService } from 'src/app/services/plastic-setup/plastic-setup-service.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { BinSetupService } from 'src/app/services/bin-setup.service';

@Component({
  selector: 'app-view-binsetup',
  templateUrl: './view-binsetup.component.html',
  styleUrls: ['./view-binsetup.component.css']
})
export class ViewBinsetupComponent implements OnInit {
  private error: boolean = false;
  private message: string = "";
  private isEntity = false;
  private selectEntityForm: FormGroup;
  private isView = false;
  private entity: any[] = [];
  plasticData = [];
  binSetupData = [];

  constructor(private formBuilder: FormBuilder,private loginService: LoginService,private dataService: DataService, private router: Router, private http: HttpClient, private plasticService: PlasticSetupServiceService,private  binSetupService: BinSetupService) {
    if (sessionStorage.getItem('user')) {
      this.isEntity = true;
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  selectEntity(){
    
    let data = this.selectEntityForm.get('entity').value;
    if(data){
      this.isEntity = false;
      this.isView = true;
      this.binSetupService.getSpecificBinSetupDetails(data)
        .subscribe((response) => {
         
          this.binSetupData = JSON.parse(JSON.stringify(response)).list
          if(this.binSetupData.length<=0){
            this.error = true;
            this.message = "No record found.";
           
          }
          console.log(this.binSetupData)
        })
    }
  }

  ngOnInit() {
    //this.getBinData();

    this.selectEntityForm = this.formBuilder.group({
      entity: ['']
    })
    this.dataService.getFlag(true)

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
      this.binSetupService.getSpecificBinSetupDetails(sessionStorage.getItem('user'))
        .subscribe((response) => {
          this.binSetupData = response.list
          if(this.binSetupData.length<=0){
            this.error = true;
            this.message = "No record found.";
          }
        })
    }
  }
  binData = [];

  getBinData() {
    // console.log("JSON :"+JSON.stringify(this.binData))

    var requestData = {
      "cmsBinNumber": '8888888'
    }
    // var data = this.binSetup;
    this.plasticService.getBinData(requestData).subscribe(data => {
      // console.log(JSON.stringify(data));
      this.binData = data.list;
      if(this.binData.length<=0){
        this.error = true;
        this.message = "No record found.";
      }
    },
      error => {
        this.error = true;
        this.message = error.error.message;
      });

  }
}
