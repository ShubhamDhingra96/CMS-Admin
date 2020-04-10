import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LimitManagementService } from 'src/app/services/limit-management.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { UsagesService } from 'src/app/services/usages.service';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-specific-setting',
  templateUrl: './specific-setting.component.html',
  styleUrls: ['./specific-setting.component.css']
})
export class SpecificSettingComponent implements OnInit {

  private spscificLimitManagement: FormGroup;
  private submitted = false;
  private confirmForm: any = null;
  private show: boolean = false;
  private enterData: boolean = true;
  private confirm: boolean = false;
  private currencyData: [];
  private transactionData: [];
  private success: string = "";
  private isgroupCodeExist: boolean = false;

  private countryCode: any[] = [];
  private deliveryGrp: any[] = [];
  private acquiredGrp: any[] = [];

  constructor(private fromBuilder: FormBuilder, private limitManagementService: LimitManagementService, private dataService: DataService, private router: Router, private usageService: UsagesService) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {

      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

  ngOnInit() {
    this.getCurrency();
    this.getTransaction();
    this.spscificLimitManagement = this.fromBuilder.group({
      limitCode: '',
      limitName: '',
      countryCode: '',
      countryName: '',
      acquiringNetwork: '',
      acquiringNetworkName: '',
      deliveryChannels: '',
      deliveryChannelName: '',
      transaction: '',
      frequency: '',
      levelCheck: '',
      maxCount: '',
      currency: '',
      minAmt: '',
      maxAmt: '',
      insertedBy: sessionStorage.getItem('user'),
      specificTable: this.fromBuilder.array([])

    })

    this.getAquiredNetwork();
    this.getCountryCode();
    this.getDeliveryChannel();
  }

  getCurrency() {

    this.limitManagementService.getCueency().subscribe(
      (response) => {
        this.currencyData = response.list;
      })
  }
  getTransaction() {
    this.limitManagementService.getTransactionData().subscribe(
      (response) => {
        this.transactionData = response.list;
      })
  }


  add() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.confirmForm = null;
    if (this.spscificLimitManagement.invalid)
      return;

    this.limitManagementService.checkLimitCode(this.spscificLimitManagement.get('insertedBy').value,
      this.spscificLimitManagement.get('limitCode').value)
      .subscribe(
        (response) => {
          let dataRes = JSON.parse(JSON.stringify(response)).data;

          if (dataRes) {
            $("input[name='limitCode']").css('border', '1px solid red');
            this.isgroupCodeExist = true;
            return;
          }
          let limitCode = this.spscificLimitManagement.get('limitCode').value;
          let limitName = this.spscificLimitManagement.get('limitName').value;
          let countryCode = this.spscificLimitManagement.get('countryCode').value;
          let acquiringNetwork = this.spscificLimitManagement.get('acquiringNetwork').value;
          let deliveryChannels = this.spscificLimitManagement.get('deliveryChannels').value;
          let transaction = this.spscificLimitManagement.get('transaction').value;
          let frequency = this.spscificLimitManagement.get('frequency').value;
          let levelCheck = this.spscificLimitManagement.get('levelCheck').value;
          let maxCount = this.spscificLimitManagement.get('maxCount').value;
          let currency = this.spscificLimitManagement.get('currency').value;
          let minAmt = this.spscificLimitManagement.get('minAmt').value;
          let maxAmt = this.spscificLimitManagement.get('maxAmt').value;

          (<FormArray>this.spscificLimitManagement.get('specificTable')).push(this.addLimit(limitCode, limitName, countryCode, acquiringNetwork, deliveryChannels, transaction, frequency,
            levelCheck, maxCount, currency, minAmt, maxAmt))
          this.confirmForm = this.spscificLimitManagement.value;
          this.submitted = false;
         
          this.resetLimitEntry();
        },
        (error) => {
          if (error.status === 400) {
            let limitCode = this.spscificLimitManagement.get('limitCode').value;
            let limitName = this.spscificLimitManagement.get('limitName').value;
            let countryCode = this.spscificLimitManagement.get('countryCode').value;
            let acquiringNetwork = this.spscificLimitManagement.get('acquiringNetwork').value;
            let deliveryChannels = this.spscificLimitManagement.get('deliveryChannels').value;
            let transaction = this.spscificLimitManagement.get('transaction').value;
            let frequency = this.spscificLimitManagement.get('frequency').value;
            let levelCheck = this.spscificLimitManagement.get('levelCheck').value;
            let maxCount = this.spscificLimitManagement.get('maxCount').value;
            let currency = this.spscificLimitManagement.get('currency').value;
            let minAmt = this.spscificLimitManagement.get('minAmt').value;
            let maxAmt = this.spscificLimitManagement.get('maxAmt').value;

            (<FormArray>this.spscificLimitManagement.get('specificTable')).push(this.addLimit(limitCode, limitName, countryCode, acquiringNetwork, deliveryChannels, transaction, frequency,
              levelCheck, maxCount, currency, minAmt, maxAmt))
            this.confirmForm = this.spscificLimitManagement.value;
            this.submitted = false;
            
            

            this.resetLimitEntry();
          }
        }
      )

  }

  load(){
    
  }

  addLimit(limitCode: any, limitName: any, countryCode: any, acquiringNetwork: any, deliveryChannels: any, transaction: any, frequency: any, levelCheck: any, maxCount: any, currency: any, minAmt: any, maxAmt: any): FormGroup {
    return this.fromBuilder.group({
      limitCode: limitCode,
      limitName: limitName,
      countryCode: countryCode,
      acquiringNetwork: acquiringNetwork,
      deliveryChannels: deliveryChannels,
      transaction: transaction,
      frequency: frequency,
      levelCheck: levelCheck,
      maxCount: maxCount,
      currency: currency,
      minAmt: minAmt,
      maxAmt: maxAmt,
      limitType: '1',
      createdby: sessionStorage.getItem('user'),
      createdon: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
    })
  }

  resetLimitEntry() {
    this.spscificLimitManagement.patchValue({
      limitCode: '',
      limitName: '',
      countryCode: '',
      countryName: '',
      acquiringNetwork: '',
      acquiringNetworkName: '',
      deliveryChannels: '',
      deliveryChannelName: '',
      transaction: '',
      frequency: '',
      levelCheck: '',
      maxCount: '',
      currency: '',
      minAmt: '',
      maxAmt: '',
      insertedBy: sessionStorage.getItem('user'),
    })
  }

  confirmLimit() {
    if (this.confirmForm == null) {
      this.success = "Please add limit details";
      $("#error").show('fast')
      return;
    }
    this.enterData = false;
    this.confirm = true;
  }

  remove(i) {
    (<FormArray>this.spscificLimitManagement.get("specificTable")).removeAt(i);
  }


  addValidation() {
    this.spscificLimitManagement.get('limitCode').setValidators([Validators.required]);
    this.spscificLimitManagement.get('limitName').setValidators([Validators.required]);
    this.spscificLimitManagement.get('countryCode').setValidators([Validators.required]);
    this.spscificLimitManagement.get('acquiringNetwork').setValidators([Validators.required]);
    this.spscificLimitManagement.get('deliveryChannels').setValidators([Validators.required]);
    this.spscificLimitManagement.get('transaction').setValidators([Validators.required]);
    this.spscificLimitManagement.get('frequency').setValidators([Validators.required]);
    this.spscificLimitManagement.get('levelCheck').setValidators([Validators.required]);
    this.spscificLimitManagement.get('maxCount').setValidators([Validators.required]);
    this.spscificLimitManagement.get('currency').setValidators([Validators.required]);
    this.spscificLimitManagement.get('minAmt').setValidators([Validators.required]);
    this.spscificLimitManagement.get('maxAmt').setValidators([Validators.required]);
  }

  updateValidation() {
    this.spscificLimitManagement.get('limitCode').updateValueAndValidity(),
      this.spscificLimitManagement.get('limitName').updateValueAndValidity(),
      this.spscificLimitManagement.get('countryCode').updateValueAndValidity(),
      this.spscificLimitManagement.get('acquiringNetwork').updateValueAndValidity(),
      this.spscificLimitManagement.get('deliveryChannels').updateValueAndValidity(),
      this.spscificLimitManagement.get('transaction').updateValueAndValidity(),
      this.spscificLimitManagement.get('frequency').updateValueAndValidity(),
      this.spscificLimitManagement.get('levelCheck').updateValueAndValidity(),
      this.spscificLimitManagement.get('maxCount').updateValueAndValidity(),
      this.spscificLimitManagement.get('currency').updateValueAndValidity(),
      this.spscificLimitManagement.get('minAmt').updateValueAndValidity(),
      this.spscificLimitManagement.get('maxAmt').updateValueAndValidity()
  }

  removeValidation() {
    this.spscificLimitManagement.get('limitCode').clearValidators,
      this.spscificLimitManagement.get('limitName').clearValidators,
      this.spscificLimitManagement.get('countryCode').clearValidators,
      this.spscificLimitManagement.get('acquiringNetwork').clearValidators,
      this.spscificLimitManagement.get('deliveryChannels').clearValidators,
      this.spscificLimitManagement.get('transaction').clearValidators,
      this.spscificLimitManagement.get('frequency').clearValidators,
      this.spscificLimitManagement.get('levelCheck').clearValidators,
      this.spscificLimitManagement.get('maxCount').clearValidators,
      this.spscificLimitManagement.get('currency').clearValidators,
      this.spscificLimitManagement.get('minAmt').clearValidators,
      this.spscificLimitManagement.get('maxAmt').clearValidators

  }

  save() {
    this.removeValidation();
    this.updateValidation();
    this.submitted = true;

    if ((<FormArray>this.spscificLimitManagement.get('specificTable')).length > 0) {
      this.limitManagementService.save((<FormArray>this.spscificLimitManagement.get('specificTable')).value)
        .subscribe((response) => {
          this.success = JSON.parse(JSON.stringify(response)).message
          while ((<FormArray>this.spscificLimitManagement.get('specificTable')).length > 0) {
            (<FormArray>this.spscificLimitManagement.get('specificTable')).removeAt(0);
          }
          this.confirmForm = null;
          this.resetLimitEntry();
          this.cancel()
          this.submitted = false;
          $("#success").show('fast');
        },
          (error) => {
            this.success = JSON.parse(JSON.stringify(error)).error.message;
            $("#error").show('fast')
            return;
          }

        )
    } else {

      this.success = 'Please add Limit details'
      $("#error").show('fast')
      return;
    }
  }


  getCountryCode() {
    this.usageService.getAllCountryGroup()
      .subscribe((response) => {
        this.countryCode = JSON.parse(JSON.stringify(response)).data;
      })
  }

  getAquiredNetwork() {
    this.usageService.getAllAcquiredNetworkGroup()
      .subscribe((response) => {
        this.acquiredGrp = JSON.parse(JSON.stringify(response)).data;
      })
  }

  getDeliveryChannel() {
    this.usageService.getAllDeliveryChannelGroup()
      .subscribe((response) => {
        this.deliveryGrp = JSON.parse(JSON.stringify(response)).data;
      })
  }

  selectCountryCode() {
    let countryCode = this.spscificLimitManagement.get('countryCode').value;
    if (countryCode) {
      this.spscificLimitManagement.patchValue({
        countryName: this.countryCode.filter(res => res.groupCode == countryCode)[0].groupName
      })
    }
  }

  selectAcquiredNetwork() {
    let acquiringNetwork = this.spscificLimitManagement.get('acquiringNetwork').value;
    if (acquiringNetwork) {
      this.spscificLimitManagement.patchValue({
        acquiringNetworkName: this.acquiredGrp.filter(res => res.groupCode == acquiringNetwork)[0].groupName
      })
    }
  }


  selectDeliveryChannel() {
    let deliveryChannel = this.spscificLimitManagement.get('deliveryChannels').value;
    if (deliveryChannel) {
      this.spscificLimitManagement.patchValue({
        deliveryChannelName: this.deliveryGrp.filter(res => res.groupCode == deliveryChannel)[0].groupName
      })
    }
  }

  cancel() {
    this.confirmForm = null;
    this.enterData = true;
    this.confirm = false;
    $("input[name='limitCode']").removeAttr('style');
    this.isgroupCodeExist = false;
    this.submitted = false;
  }

  isInput() {
    $("input[name='limitCode']").removeAttr('style');
    this.isgroupCodeExist = false;
  }

}
