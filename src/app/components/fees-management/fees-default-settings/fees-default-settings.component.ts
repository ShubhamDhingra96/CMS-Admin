import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FeesService } from 'src/app/services/fees.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { LimitManagementService } from 'src/app/services/limit-management.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-fees-default-settings',
  templateUrl: './fees-default-settings.component.html',
  styleUrls: ['./fees-default-settings.component.css']
})
export class FeesDefaultSettingsComponent implements OnInit {

  private feesDefaultSettingsComponent: FormGroup;
  private submitted = false;
  private confirmForm: any[] = [];
  private show: boolean = false;
  private enterData: boolean = true;
  private confirm: boolean = false;

  private isfeeCodeExist: boolean = false;
  private channelsForm: any[] = [];
  private success: string = "";

  private transactionData: [];
  private groupTransactionData: any[] = [];

  private isHigher: boolean = false;
  private isLower: boolean = false;
  private isBoth: boolean = false;

  private isCount: boolean = false;
  private isAmount: boolean = false;

  private isPercentage: boolean = false;
  private isFlat: boolean = false;
  private IsBoth: boolean = false;
  private isChecked: boolean = false;

  constructor(private formBuilder: FormBuilder, private limitService: LimitManagementService, private feesService: FeesService, private dataService: DataService, private router: Router) {
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
    this.getTransaction();
    this.getGroupTransaction();
    this.feesDefaultSettingsComponent = this.formBuilder.group({
      feeCode: '',
      feeDescription: '',
      transaction: '',
      groupTransactions: '',
      frequency: '',
      criteria: '',
      criteriaFrom: '',
      criteriaTo: '',
      percentage: '',
      perFlat: '',
      flat: '',
      limit: '',
      minLimit: '',
      maxLimit: '',
      rule: '',
      chargeFeeTo: '',
      seperateLine: '',
      seperateLines: '',
      createdBy: sessionStorage.getItem('user'),
      feeTable: this.formBuilder.array([])

    })
  }


  checkedSaperateLine() {
    this.isChecked=!this.isChecked;
    this.feesDefaultSettingsComponent.patchValue({seperateLine:(this.isChecked)?'Yes':'No'})

  }

  
  getTransaction() {

    this.limitService.getTransactionData().subscribe(
      (response) => {
        this.transactionData = JSON.parse(JSON.stringify(response)).list;

      })
  }

  getGroupTransaction() {

    this.feesService.getGroupTransaction().subscribe(
      (response) => {
        this.groupTransactionData = JSON.parse(JSON.stringify(response)).list;

      })
  }


  add() {
    
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.channelsForm = [];

  
    if (this.feesDefaultSettingsComponent.invalid) {
      return;
    }

    this.feesService.checkFeeCode(this.feesDefaultSettingsComponent.get('createdBy').value, this.feesDefaultSettingsComponent.get('feeCode').value)
      .subscribe(
        (Response) => {
          let dataRes = JSON.parse(JSON.stringify(Response)).data;
          if (dataRes) {
            $("input[name='feeCode']").css('border', '1px solid red');

            this.isfeeCodeExist = true;
            return;
          }
          this.add1(
            this.feesDefaultSettingsComponent.get('feeCode').value,
            this.feesDefaultSettingsComponent.get('feeDescription').value,
            this.feesDefaultSettingsComponent.get('transaction').value,
            this.feesDefaultSettingsComponent.get('groupTransactions').value,
            this.feesDefaultSettingsComponent.get('frequency').value,
            this.feesDefaultSettingsComponent.get('criteria').value,
            this.feesDefaultSettingsComponent.get('criteriaFrom').value,
            this.feesDefaultSettingsComponent.get('criteriaTo').value,
            this.feesDefaultSettingsComponent.get('percentage').value,
            this.feesDefaultSettingsComponent.get('perFlat').value,
            this.feesDefaultSettingsComponent.get('flat').value,
            this.feesDefaultSettingsComponent.get('limit').value,
            this.feesDefaultSettingsComponent.get('minLimit').value,
            this.feesDefaultSettingsComponent.get('maxLimit').value,
            this.feesDefaultSettingsComponent.get('rule').value,
            this.feesDefaultSettingsComponent.get('chargeFeeTo').value,
            this.feesDefaultSettingsComponent.get('seperateLine').value
          );
          this.submitted = false;
          this.confirmForm.push(this.feesDefaultSettingsComponent.value);
          let data = {
            feeCode: this.feesDefaultSettingsComponent.get('feeCode').value,
            feeDescription: this.feesDefaultSettingsComponent.get('feeDescription').value,
            transaction: this.feesDefaultSettingsComponent.get('transaction').value,
            groupTransactions: this.feesDefaultSettingsComponent.get('groupTransactions').value,
            frequency: this.feesDefaultSettingsComponent.get('frequency').value,
            criteria: this.feesDefaultSettingsComponent.get('criteria').value,
            criteriaFrom: this.feesDefaultSettingsComponent.get('criteriaFrom').value,
            criteriaTo: this.feesDefaultSettingsComponent.get('criteriaTo').value,
            percentage: this.feesDefaultSettingsComponent.get('percentage').value,
            perFlat: this.feesDefaultSettingsComponent.get('perFlat').value,
            flat: this.feesDefaultSettingsComponent.get('flat').value,
            limit: this.feesDefaultSettingsComponent.get('limit').value,
            minLimit: this.feesDefaultSettingsComponent.get('minLimit').value,
            maxLimit: this.feesDefaultSettingsComponent.get('maxLimit').value,
            rule: this.feesDefaultSettingsComponent.get('rule').value,
            chargeFeeTo: this.feesDefaultSettingsComponent.get('chargeFeeTo').value,
            seperateLine: (this.feesDefaultSettingsComponent.get('seperateLine').value)?'Yes':'No'
          }
          this.channelsForm.push(data);
          this.resetLimitEntry();

        })

  }
  resetLimitEntry() {
    this.feesDefaultSettingsComponent.patchValue({
      feeCode: '',
      feeDescription: '',
      transaction: '',
      groupTransactions: '',
      frequency: '',
      criteria: '',
      criteriaFrom: '',
      criteriaTo: '',
      percentage: '',
      perFlat: '',
      flat: '',
      limit: '',
      minLimit: '',
      maxLimit: '',
      rule: '',
      chargeFeeTo: '',
      seperateLine: '',
      createdBy: sessionStorage.getItem('user')

    })
  }
  add1(feeCode: any,
    feeDescription: any,
    transaction: any,
    groupTransactions: any,
    frequency: any,
    criteria: any,
    criteriaFrom: any,
    criteriaTo: any,
    percentage: any,
    perFlat: any,
    flat: any,
    limit: any,
    minLimit: any,
    maxLimit: any,
    rule: any,
    chargeFeeTo: any,
    seperateLine: any) {

    (<FormArray>this.feesDefaultSettingsComponent.get("feeTable")).push(this.addLimit(feeCode, feeDescription,
      transaction, groupTransactions, frequency, criteria, criteriaFrom, criteriaTo,
      percentage, perFlat, flat, limit, minLimit, maxLimit, rule, chargeFeeTo, seperateLine));

  }

  addLimit(feeCode: any, feeDescription: any, transaction: any, groupTransactions: any, frequency: any,
    criteria: any, criteriaFrom: any, criteriaTo: any, percentage: any, perFlat: any, flat: any, limit: any, minLimit: any,
    maxLimit: any, rule: any, chargeFeeTo: any, seperateLine: any): FormGroup {
    return this.formBuilder.group({
      feeCode: feeCode,
      feeDescription: feeDescription,
      transaction: transaction,
      groupTransactions: groupTransactions,
      frequency: frequency,
      criteria: criteria,
      criteriaFrom: criteriaFrom,
      criteriaTo: criteriaTo,
      percentage: percentage,
      perFlat: perFlat,
      flat: flat,
      limit: limit,
      minLimit: minLimit,
      maxLimit: maxLimit,
      rule: rule,
      chargeFeeTo: chargeFeeTo,
      seperateLine: seperateLine,
      feeType: '0',
      createdBy: sessionStorage.getItem('user'),
      createdOn: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: '',
      modifiedOn: '',
    })

  }
  addValidation() {
      this.feesDefaultSettingsComponent.get('feeCode').setValidators([Validators.required, Validators.pattern(environment.letterNumber)]),
      this.feesDefaultSettingsComponent.get('feeDescription').setValidators([Validators.required, Validators.pattern(environment.letterNumber)]),
      this.feesDefaultSettingsComponent.get('transaction').setValidators([Validators.required]),
      this.feesDefaultSettingsComponent.get('groupTransactions').setValidators([Validators.required]),
      this.feesDefaultSettingsComponent.get('frequency').setValidators([Validators.required]),
      this.feesDefaultSettingsComponent.get('criteria').setValidators([Validators.required]),
      this.feesDefaultSettingsComponent.get('perFlat').setValidators([Validators.required]),
      this.feesDefaultSettingsComponent.get('limit').setValidators([Validators.required]),
      this.feesDefaultSettingsComponent.get('chargeFeeTo').setValidators([Validators.required]),
      this.feesDefaultSettingsComponent.get('seperateLines').setValidators([Validators.required])
  }

  updateValidation() {
      this.feesDefaultSettingsComponent.get('feeCode').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('feeDescription').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('transaction').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('groupTransactions').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('frequency').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('criteria').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('criteriaFrom').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('criteriaTo').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('percentage').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('perFlat').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('limit').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('minLimit').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('maxLimit').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('flat').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('rule').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('chargeFeeTo').updateValueAndValidity(),
      this.feesDefaultSettingsComponent.get('seperateLines').updateValueAndValidity()
  }

  removeValidation() {
      this.feesDefaultSettingsComponent.get('feeCode').clearValidators,
      this.feesDefaultSettingsComponent.get('feeDescription').clearValidators,
      this.feesDefaultSettingsComponent.get('transaction').clearValidators,
      this.feesDefaultSettingsComponent.get('groupTransactions').clearValidators,
      this.feesDefaultSettingsComponent.get('frequency').clearValidators,
      this.feesDefaultSettingsComponent.get('criteria').clearValidators,
      this.feesDefaultSettingsComponent.get('criteriaFrom').clearValidators,
      this.feesDefaultSettingsComponent.get('criteriaTo').clearValidators,
      this.feesDefaultSettingsComponent.get('percentage').clearValidators,
      this.feesDefaultSettingsComponent.get('perFlat').clearValidators,
      this.feesDefaultSettingsComponent.get('limit').clearValidators,
      this.feesDefaultSettingsComponent.get('minLimit').clearValidators,
      this.feesDefaultSettingsComponent.get('maxLimit').clearValidators,
      this.feesDefaultSettingsComponent.get('flat').clearValidators,
      this.feesDefaultSettingsComponent.get('rule').clearValidators,
      this.feesDefaultSettingsComponent.get('chargeFeeTo').clearValidators,
      this.feesDefaultSettingsComponent.get('seperateLines').clearValidators
  }
  
 
  confirmFeeDetails() {
    if (this.confirmForm.length == 0) {
      this.success = "Please add Fee Management details";
      $("#error").show('fast')
      return;
    }
    this.enterData = false;
    this.confirm = true;
  }

  remove(i) {
    (<FormArray>this.feesDefaultSettingsComponent.get("feeTable")).removeAt(i);
  }
  selectLimit() {
    this.isHigher = false;
    this.isLower = false;
    this.isBoth = false;
    let limit = this.feesDefaultSettingsComponent.get('limit').value.toString();
    if (limit) {
      switch (limit) {
        case "Higher": {
          this.isHigher = true;
          this.isLower = false;
          this.isBoth = false;
          this.feesDefaultSettingsComponent.get('minLimit').clearValidators();
          this.feesDefaultSettingsComponent.get('maxLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('minLimit').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('maxLimit').updateValueAndValidity();
        }
          break;

        case "Lower": {
          this.isHigher = false;
          this.isLower = true;
          this.isBoth = false;
          this.feesDefaultSettingsComponent.get('minLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('maxLimit').clearValidators()
          this.feesDefaultSettingsComponent.get('minLimit').updateValueAndValidity()
          this.feesDefaultSettingsComponent.get('maxLimit').updateValueAndValidity()
        }
          break;

        case "Both": {
          this.isHigher = false;
          this.isLower = false;
          this.isBoth = true;
          this.feesDefaultSettingsComponent.get('minLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('maxLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('minLimit').updateValueAndValidity()
          this.feesDefaultSettingsComponent.get('maxLimit').updateValueAndValidity()
        }
          break;
        default: {
          this.isHigher = false;
          this.isLower = false;
          this.isBoth = false;
        }
          break;
      }
    }
  }

  selectCriteria() {
    this.isCount = false;
    this.isAmount = false;
    let criteria = this.feesDefaultSettingsComponent.get('criteria').value.toString();
    if (criteria) {
      switch (criteria) {
        case "Count": {
          this.isCount = true;
          this.isAmount = false;
          this.feesDefaultSettingsComponent.get('criteriaFrom').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('criteriaTo').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('criteriaFrom').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('criteriaTo').updateValueAndValidity();
        }
          break;

        case "Amount": {
          this.isCount = false;
          this.isAmount = true;
          this.feesDefaultSettingsComponent.get('criteriaFrom').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('to').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesDefaultSettingsComponent.get('criteriaFrom').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('to').updateValueAndValidity();
        }
          break;
        default: {
          this.isCount = false;
          this.isAmount = false;

        }
          break;
      }
    }
  }
  selectPercentage() {
    this.isPercentage = false;
    this.isFlat = false;
    this.IsBoth = false;
    let perFlat = this.feesDefaultSettingsComponent.get('perFlat').value.toString();
    if (perFlat) {
      switch (perFlat) {
        case "Percentage": {
          this.isPercentage = true;
          this.isFlat = false;
          this.IsBoth = false;
          this.feesDefaultSettingsComponent.get('percentage').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesDefaultSettingsComponent.get('flat').clearValidators()
          this.feesDefaultSettingsComponent.get('rule').clearValidators()
          this.feesDefaultSettingsComponent.get('percentage').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('flat').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('rule').updateValueAndValidity();
        }
          break;

        case "Flat": {
          this.isPercentage = false;
          this.isFlat = true;
          this.IsBoth = false;
          this.feesDefaultSettingsComponent.get('percentage').clearValidators()
          this.feesDefaultSettingsComponent.get('flat').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesDefaultSettingsComponent.get('rule').clearValidators()
          this.feesDefaultSettingsComponent.get('percentage').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('flat').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('rule').updateValueAndValidity();
        }
          break;

        case "Both": {
          this.isPercentage = false;
          this.isFlat = false;
          this.IsBoth = true;
          this.feesDefaultSettingsComponent.get('percentage').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesDefaultSettingsComponent.get('flat').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesDefaultSettingsComponent.get('rule').setValidators([Validators.required]);
          this.feesDefaultSettingsComponent.get('percentage').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('flat').updateValueAndValidity();
          this.feesDefaultSettingsComponent.get('rule').updateValueAndValidity();
        }
          break;
        default: {
          this.isPercentage = false;
          this.isFlat = false;
          this.IsBoth = false;
        }
          break;
      }
    }
  }

  save() {
    this.removeValidation();
    this.updateValidation();
    if ((<FormArray>this.feesDefaultSettingsComponent.get('feeTable')).length > 0) {
      this.feesService.save((<FormArray>this.feesDefaultSettingsComponent.get('feeTable')).value)
        .subscribe((response) => {
          this.success = JSON.parse(JSON.stringify(response)).message
          while ((<FormArray>this.feesDefaultSettingsComponent.get('feeTable')).length > 0) {
            (<FormArray>this.feesDefaultSettingsComponent.get('feeTable')).removeAt(0);
          }
          this.confirmForm = null;
          //this.feesDefaultSettingsComponent.reset();
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
      alert('Please add Fees details')
      $("#error").show('fast')
      return;
    }
  }

  cancel() {
    this.enterData = true;
    this.confirm = false;
    $("input[name='feeCode']").removeAttr('style');
    this.isfeeCodeExist = false;
    this.submitted = false;
  }

  isInput() {
    $("input[name='feeCode']").removeAttr('style');
    this.isfeeCodeExist = false;
  }

}
