import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LimitManagementService } from 'src/app/services/limit-management.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/DataService';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
  styleUrls: ['./default-settings.component.css']
})
export class DefaultSettingsComponent implements OnInit {

  private defaultLimitManagement: FormGroup;
  private submitted = false;
  private confirmForm: any = null;
  private show: boolean = false;
  private enterData: boolean = true;
  private confirm: boolean = false;
  private currencyData: [];
  private transactionData: [];
  private success: string = "";
  private isExistGroup: boolean = false;

  constructor(private fromBuilder: FormBuilder, private limitManagementService: LimitManagementService, private router: Router, private dataService: DataService) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  ngOnInit() {
    this.getCurrency();
    this.getTransaction();
    this.defaultLimitManagement = this.fromBuilder.group(
      {
        limitCode: '',
        limitName: '',
        transaction: '',
        frequency: '',
        levelCheck: '',
        maxCount: '',
        currencyType: '',
        minAmt: '',
        maxAmt: '',
        insertedBy: sessionStorage.getItem('user'),
        createdby: sessionStorage.getItem('user'),
        createdon: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
        modifiedby: '',
        modifiedon: '',
        limitTable: this.fromBuilder.array([])
      }
    )
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
        this.transactionData = JSON.parse(JSON.stringify(response)).list;

      })
  }

  add() {

    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.confirmForm = null;
    if (this.defaultLimitManagement.invalid)
      return;

    this.limitManagementService.checkLimitCode(this.defaultLimitManagement.get('insertedBy').value,
      this.defaultLimitManagement.get('limitCode').value)
      .subscribe(
        (response) => {
          let dataRes = JSON.parse(JSON.stringify(response)).data;

          if (dataRes) {
            $("input[name='limitCode']").css('border', '1px solid red');
            this.isExistGroup = true;
            return;

          }


          let limitCode = this.defaultLimitManagement.get('limitCode').value;
          let limitName = this.defaultLimitManagement.get('limitName').value;
          let transaction = this.defaultLimitManagement.get('transaction').value;
          let frequency = this.defaultLimitManagement.get('frequency').value;
          let levelCheck = this.defaultLimitManagement.get('levelCheck').value;
          let maxCount = this.defaultLimitManagement.get('maxCount').value;
          let currencyType = this.defaultLimitManagement.get('currencyType').value;
          let minAmt = this.defaultLimitManagement.get('minAmt').value;
          let maxAmt = this.defaultLimitManagement.get('maxAmt').value;

          (<FormArray>this.defaultLimitManagement.get('limitTable')).push(this.addLimit(limitCode, limitName, transaction, frequency,
            levelCheck, maxCount, currencyType, minAmt, maxAmt))
          this.confirmForm = this.defaultLimitManagement.value;
          this.submitted = false;
        
          
          this.resetLimitEntry();
        },
        (error) => {
          let limitCode = this.defaultLimitManagement.get('limitCode').value;
          let limitName = this.defaultLimitManagement.get('limitName').value;
          let transaction = this.defaultLimitManagement.get('transaction').value;
          let frequency = this.defaultLimitManagement.get('frequency').value;
          let levelCheck = this.defaultLimitManagement.get('levelCheck').value;
          let maxCount = this.defaultLimitManagement.get('maxCount').value;
          let currencyType = this.defaultLimitManagement.get('currencyType').value;
          let minAmt = this.defaultLimitManagement.get('minAmt').value;
          let maxAmt = this.defaultLimitManagement.get('maxAmt').value;
          (<FormArray>this.defaultLimitManagement.get('limitTable')).push(this.addLimit(limitCode, limitName, transaction, frequency,
            levelCheck, maxCount, currencyType, minAmt, maxAmt))
          this.confirmForm = this.defaultLimitManagement.value;
          this.submitted = false;
        
          this.resetLimitEntry();
        });

  }



  addLimit(limitCode: any, limitName: any, transaction: any, frequency: any, levelCheck: any, maxCount: any, currencyType: any, minAmt: any, maxAmt: any): FormGroup {
    return this.fromBuilder.group({
      limitCode: limitCode,
      limitName: limitName,
      transaction: transaction,
      frequency: frequency,
      levelCheck: levelCheck,
      maxCount: maxCount,
      currencyType: currencyType,
      minAmt: minAmt,
      maxAmt: maxAmt,
      limitType: '0',
      createdby: sessionStorage.getItem('user'),
      createdon: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedby: '',
      modifiedon: '',
    })


  }

  resetLimitEntry() {
    this.defaultLimitManagement.patchValue({
      limitCode: '',
      limitName: '',
      transaction: '',
      frequency: '',
      levelCheck: '',
      maxCount: '',
      currencyType: '',
      minAmt: '',
      maxAmt: '',
      insertedBy: sessionStorage.getItem('user'),
      // limitType:''      
    })
  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

  addValidation() {
    this.defaultLimitManagement.get('limitCode').setValidators([Validators.required]),
      this.defaultLimitManagement.get('limitName').setValidators([Validators.required]),
      this.defaultLimitManagement.get('transaction').setValidators([Validators.required]),
      this.defaultLimitManagement.get('frequency').setValidators([Validators.required]),
      this.defaultLimitManagement.get('levelCheck').setValidators([Validators.required]),
      this.defaultLimitManagement.get('maxCount').setValidators([Validators.required]),
      this.defaultLimitManagement.get('currencyType').setValidators([Validators.required]),
      this.defaultLimitManagement.get('minAmt').setValidators([Validators.required]),
      this.defaultLimitManagement.get('maxAmt').setValidators([Validators.required])
  }

  updateValidation() {
    this.defaultLimitManagement.get('limitCode').updateValueAndValidity(),
      this.defaultLimitManagement.get('limitName').updateValueAndValidity(),
      this.defaultLimitManagement.get('transaction').updateValueAndValidity(),
      this.defaultLimitManagement.get('frequency').updateValueAndValidity(),
      this.defaultLimitManagement.get('levelCheck').updateValueAndValidity(),
      this.defaultLimitManagement.get('maxCount').updateValueAndValidity(),
      this.defaultLimitManagement.get('currencyType').updateValueAndValidity(),
      this.defaultLimitManagement.get('minAmt').updateValueAndValidity(),
      this.defaultLimitManagement.get('maxAmt').updateValueAndValidity()
  }

  removeValidation() {
    this.defaultLimitManagement.get('limitCode').clearValidators,
      this.defaultLimitManagement.get('limitName').clearValidators,
      this.defaultLimitManagement.get('transaction').clearValidators,
      this.defaultLimitManagement.get('frequency').clearValidators,
      this.defaultLimitManagement.get('levelCheck').clearValidators,
      this.defaultLimitManagement.get('maxCount').clearValidators,
      this.defaultLimitManagement.get('currencyType').clearValidators,
      this.defaultLimitManagement.get('minAmt').clearValidators,
      this.defaultLimitManagement.get('maxAmt').clearValidators

  }
  confirmLimit() {

    if (this.confirmForm == null) {
      this.success = "Please add specific limit details";
      $("#error").show('fast')
      return;
    }
    this.enterData = false;
    this.confirm = true;
  }

  remove(i) {
    (<FormArray>this.defaultLimitManagement.get("limitTable")).removeAt(i);
  }


  save() {
    this.removeValidation();
    this.updateValidation();
    this.submitted = true;

    if ((<FormArray>this.defaultLimitManagement.get('limitTable')).length > 0) {
      this.limitManagementService.save((<FormArray>this.defaultLimitManagement.get('limitTable')).value)
        .subscribe((response) => {
          this.success = JSON.parse(JSON.stringify(response)).message
          while ((<FormArray>this.defaultLimitManagement.get('limitTable')).length > 0) {
            (<FormArray>this.defaultLimitManagement.get('limitTable')).removeAt(0);
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

  cancel() {
    this.confirmForm = null;
    this.enterData = true;
    this.confirm = false;
    $("input[name='limitCode']").removeAttr('style');
    this.isExistGroup = false;
    this.submitted = false;
  }

  isInput() {
    $("input[name='limitCode']").removeAttr('style');
    this.isExistGroup = false;
  }

}
