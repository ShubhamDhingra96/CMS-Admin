import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PlasticSetupServiceService } from 'src/app/services/plastic-setup/plastic-setup-service.service';
import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { BinSetupService } from 'src/app/services/bin-setup.service';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-binsetup',
  templateUrl: './add-binsetup.component.html',
  styleUrls: ['./add-binsetup.component.css']
})
export class AddBinsetupComponent implements OnInit {

  binSetupData: FormGroup;
  submitted = false;
  binData: any = {};
  binCurrency = [];
  private success: string = "";
  private isExistGroup: boolean = false;
  constructor(private dataService: DataService, private router: Router, private http: HttpClient
    , private formBuilder: FormBuilder
    , private plasticService: PlasticSetupServiceService,
    private binSetupService: BinSetupService) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }


  ngOnInit() {
    this.getBinCurrency();
    this.binSetupData = this.formBuilder.group({
      bin: ['', [Validators.required, Validators.pattern(environment.binNumber)]],
      binDescription: ['', [Validators.required, Validators.pattern(environment.binDescription)]],
      binCurrency: ['', [Validators.required]],
      currencyDescription: [''],
      settlementCurrency: ['', [Validators.required]],
      settlementCurrencyDesc: [''],
      binType: ['', [Validators.required]],
      binIssue: ['', [Validators.required]],
      binDigit: ['', [Validators.required]],
      checkPerity: ['', [Validators.required]],
      insertedBy: [sessionStorage.getItem('user'), Validators.required],      
      insertedDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
	    modifiedBy:'',
      modifiedDate:'',
    });
  }

  getBinCurrency() {
    this.plasticService.getCurrencyData().subscribe(data => {
     
      this.binCurrency = data.list;
    });
  }

  getCurrencyDec() {

    this.binSetupData.get('settlementCurrency').value
    this.binSetupData.patchValue({

      currencyDescription: this.binSetupData.get('binCurrency').value,

    })

  }

  getSettlementCurrencyDec() {

    this.binSetupData.patchValue({

      settlementCurrencyDesc: this.binSetupData.get('settlementCurrency').value
    })

  }
  get f() { return this.binSetupData.controls; }

  submitBinData() {
    this.submitted = true;
    if (this.binSetupData.invalid) {
      return false;
    }
    this.binSetupService.isExist(
      this.binSetupData.get('insertedBy').value,
      this.binSetupData.get('bin').value
    )
      .subscribe(
        (response) => {
          let dataRes = JSON.parse(JSON.stringify(response)).data;
          if (dataRes) {
            $("input[name='bin']").css('border', '1px solid red');
            this.isExistGroup = true;
            return;
          }
          this.saveData();
        },
        (error) => {
          this.saveData();
        }
      )


  }

  resetEntry(){
    this.binSetupData = this.formBuilder.group({
      bin: ['', [Validators.required, Validators.pattern(environment.binNumber)]],
      binDescription: ['', [Validators.required, Validators.pattern(environment.binDescription)]],
      binCurrency: ['', [Validators.required]],
      currencyDescription: ['', [Validators.required]],
      settlementCurrency: ['', [Validators.required]],
      settlementCurrencyDesc: ['', [Validators.required]],
      binType: ['', [Validators.required]],
      binIssue: ['', [Validators.required]],
      binDigit: ['', [Validators.required]],
      checkPerity: ['', [Validators.required]],
      insertedBy: [sessionStorage.getItem('user'), Validators.required]
    });
  }

  cancel() {   
    $("input[name='bin']").removeAttr('style');
    this.isExistGroup = false;
    this.submitted = false;
  }

  isInput() {
    $("input[name='bin']").removeAttr('style');
    this.isExistGroup = false;
  }
  saveData() {
    let groupdata = JSON.parse(JSON.stringify(this.binSetupData.value))
   
    this.plasticService.submitBinData(groupdata).subscribe(data => {
      this.success=JSON.parse(JSON.stringify(data)).message;
      this.resetEntry();
      $("#success").show('fast');
      this.submitted = false;
    },
      error => {
        this.success = JSON.parse(JSON.stringify(error)).error.message;
        $("#error").show('fast')
        return;
      });
  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }



}
