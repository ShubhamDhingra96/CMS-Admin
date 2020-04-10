import { Component, OnInit } from '@angular/core';
import { PlasticSetupServiceService } from 'src/app/services/plastic-setup/plastic-setup-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-modify-bingroup-setup',
  templateUrl: './modify-bingroup-setup.component.html',
  styleUrls: ['./modify-bingroup-setup.component.css']
})
export class ModifyBingroupSetupComponent implements OnInit {

  modifybinGroupSetup: FormGroup;
  submitted = false;
  groupCodeName = [];
  transactionSettlementCurrency: any[] = [];
  plastic: any[] = [];
  transactionCurrency = [];
  plasticCodeName = [];

  private success: string = "";

  constructor(private dataService: DataService, private router: Router, private formBuilder: FormBuilder, private plasticService: PlasticSetupServiceService) {
    console.log('active')
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }



  ngOnInit() {
    this.getBinGroupCode();
    this.getTransactionSettlementCurrency();
    this.getPlasticCodelist();
    this.modifybinGroupSetup = this.formBuilder.group({
      groupCode: ['', Validators.required],
      binGroupid: [''],
      binGroupDescription: [''],
      binGroupName: [''],
      bin: [''],
      binDesc: [''],
      binCurrency: [''],
      binSettlement: [''],
      binSettlementType: [''],
      binRangeFrom: [''],
      binRangeTo: [''],
      totalNumberOfCards: [''],
      transactionSettlementCurrency: ['', Validators.required],
      plasticCode: ['', Validators.required],
      grouptable: this.formBuilder.array([]),
      modifiedBy:sessionStorage.getItem('user'),
      modifiedDate:[formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required]
    });

  }

  getTransactionSettlementCurrency() {
    this.plasticService.getCurrencyData().subscribe(data => {
      this.transactionCurrency = data.list;
    },
      error => {

      });
  }

  getPlasticCodelist() {
    this.plasticService.getPlasticCodelist().subscribe(data => {
      this.plasticCodeName = data.list;
    });
  }

  getBinGroupCode() {
    this.plasticService.getBinGroupSetUpDetails().subscribe(data => {
      this.groupCodeName = data.list;
    });
  }

  getBinGroupdetails() {
    let groupCode = this.modifybinGroupSetup.get('groupCode').value

    this.plasticService.getBinGroupCode(groupCode).subscribe(response => {
      let bindetails = JSON.parse(JSON.stringify(response)).data;
  
      this.modifybinGroupSetup.patchValue({
        binGroupid: '',
        binGroupDescription: '',
        binGroupName: '',
        binDesc: '',
        binCurrency: '',
        binSettlement: '',
        binSettlementType: '',
        binRangeFrom: '',
        binRangeTo: '',
        totalNumberOfCards: ''
      })

      let id = bindetails.binGroupId;
      this.modifybinGroupSetup.patchValue({
        binGroupid: bindetails.binGroupid,
        binGroupDescription: bindetails.binGroupDescription,
        binGroupName: bindetails.binGroupName,
        bin: bindetails.selectBin,
        binDesc: bindetails.binDesc,
        binCurrency: bindetails.binCurrency,
        binSettlement: bindetails.binSettlement,
        binSettlementType: bindetails.binSettlementType,
        binRangeFrom: bindetails.binRangeFrom,
        binRangeTo: bindetails.binRangeTo,
        totalNumberOfCards: bindetails.totalNumberOfCards


      })

      this.transactionSettlementCurrency = bindetails.transactionSettlementCurrency;
      this.plastic = bindetails.plasticCode;
    },
      error => {
        this.success = error.error.message;
        $("#error").show('fast')
      });
  }

  submitBinGroupData() {

    this.submitted = true;
    
    
    if (this.modifybinGroupSetup.invalid) {
      return false;
    }
    let groupdata = JSON.parse(JSON.stringify(this.modifybinGroupSetup.value))

    this.plasticService.submitBinGroupData(groupdata).subscribe(data => {
      this.success = JSON.parse(JSON.stringify(data)).message;
      this.modifybinGroupSetup.patchValue({
        binGroupid: '',
        groupCode:'',
        bin: '',
        binGroupDescription: '',
        binGroupName: '',
        binDesc: '',
        binCurrency: '',
        binSettlement: '',
        binSettlementType: '',
        binRangeFrom: '',
        binRangeTo: '',
        totalNumberOfCards: ''
      })
      this.submitted = false;
      $("#success").show('fast')
    },
      error => {
        this.success = error.error.message;
        $("#error").show('fast')
      });

  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

}



