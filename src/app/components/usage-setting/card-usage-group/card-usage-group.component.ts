import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CardUsageDetailServicesService } from 'src/app/services/card-usage-detail-services.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-card-usage-group',
  templateUrl: './card-usage-group.component.html',
  styleUrls: ['./card-usage-group.component.css']
})
export class CardUsageGroupComponent implements OnInit {

  private cardUsageGroup: FormGroup
  private submitted: boolean = false;
  private confirmForm: any[] = [];
  private enterData: boolean = true;
  private confirm: boolean = false;
  private success: string = "";
  private isgroupCodeExist: boolean = false;

  constructor(private formBuilder: FormBuilder, private cardUsageservice: CardUsageDetailServicesService, private dataService: DataService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  ngOnInit() {
    this.cardUsageGroup = this.formBuilder.group({
      groupCode: [''],
      groupName: [''],
      groupDesc: [''],
      transactionAmount: [''],
      description: [''],
      insertedBy:sessionStorage.getItem('user'),
      cardUsageDetailsFormGroup: this.formBuilder.array([])
    })
  }
  addValidation() {
    this.cardUsageGroup.get('groupCode').setValidators([Validators.required, Validators.pattern(environment.letterNumber), Validators.maxLength(6)]);
    this.cardUsageGroup.get('groupName').setValidators([Validators.required, Validators.pattern(environment.known), Validators.maxLength(12)]);
    this.cardUsageGroup.get('groupDesc').setValidators([Validators.required, Validators.pattern(environment.address), Validators.maxLength(20)]);
    this.cardUsageGroup.get('transactionAmount').setValidators([Validators.required]);
    this.cardUsageGroup.get('description').setValidators([Validators.required]);
  }
  updateValidation() {
    this.cardUsageGroup.get('groupCode').updateValueAndValidity();
    this.cardUsageGroup.get('groupName').updateValueAndValidity();
    this.cardUsageGroup.get('groupDesc').updateValueAndValidity();
    this.cardUsageGroup.get('transactionAmount').updateValueAndValidity();
    this.cardUsageGroup.get('description').updateValueAndValidity();
  }
  removeValidation() {
    this.cardUsageGroup.get('groupCode').clearValidators();
    this.cardUsageGroup.get('groupName').clearValidators();
    this.cardUsageGroup.get('groupDesc').clearValidators();
    this.cardUsageGroup.get('transactionAmount').clearValidators();
    this.cardUsageGroup.get('description').clearValidators();
  }
  addToTable() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    if (this.cardUsageGroup.invalid)
      return;

    this.cardUsageservice.checkCardUsage(this.cardUsageGroup.get('insertedBy').value, this.cardUsageGroup.get('groupCode').value)
      .subscribe((response) => {
        let dataRes = JSON.parse(JSON.stringify(response)).data;
        if (dataRes) {
          $("input[name='groupCode']").css('border', '1px solid red');            
          this.isgroupCodeExist = true;
          return;
        }
        this.add(
          this.cardUsageGroup.get('groupCode').value,
          this.cardUsageGroup.get('groupName').value,
          this.cardUsageGroup.get('groupDesc').value,
          this.cardUsageGroup.get('transactionAmount').value,
          this.cardUsageGroup.get('description').value,
        );
        this.submitted = false;
        this.confirmForm.push(this.cardUsageGroup.value);
        this.resetGroupEntry();
      })

  }
  resetGroupEntry() {
    this.cardUsageGroup.patchValue({
      groupCode: '',
      groupName: '',
      groupDesc: '',
      transactionAmount: '',
      description: '',
      insertedBy:sessionStorage.getItem('user'),
    })
  }

  cancel() {
    this.confirm = false;
    this.enterData = true;
    while ((<FormArray>this.cardUsageGroup.get('cardUsageDetailsFormGroup')).length > 0) {
      (<FormArray>this.cardUsageGroup.get('cardUsageDetailsFormGroup')).removeAt(0);
    }
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
    this.submitted = false;
  }

  back() {
    this.confirm = false;
    this.enterData = true;
  }

  transactionSelect() {

    switch (this.cardUsageGroup.get('transactionAmount').value) {
      case "all": {
        this.cardUsageGroup.patchValue({
          description: 'All Transactions'
        })
      }
        break;
      case "web": {
        this.cardUsageGroup.patchValue({
          description: 'Web type Transactions'
        })
      }
        break;
      case "atm": {
        this.cardUsageGroup.patchValue({
          description: 'ATM type Transactions'
        })
      }
        break;
      case "ivr": {
        this.cardUsageGroup.patchValue({
          description: 'IVR type Transactions'
        })
      }
        break;
    }

  }

  add(groupCode: '',
    groupName: '',
    groupDesc: '',
    transactionAmount: '',
    description: ''
  ) {
    (<FormArray>this.cardUsageGroup.get("cardUsageDetailsFormGroup")).push(this.addGroup(groupCode,
      groupName,
      groupDesc,
      transactionAmount,
      description));
    console.log((<FormArray>this.cardUsageGroup.get("cardUsageDetailsFormGroup")).value)
  }
  addGroup(
    groupCode: any,
    groupName: any,
    groupDesc: any,
    transactionAmount: any,
    description: any): FormGroup {
    return this.formBuilder.group({
      cardUsageGroupCode: groupCode,
      cardUsageGroupName: groupName,
      cardUsageGroupDesc: groupDesc,
      cardUsageGrouptransactionAmount: transactionAmount,
      cardUsageGroupDescription: description,
      cardGroupCodeDetails: groupCode,
      cardGroupDescriptionDetail: groupDesc,
      cardGroupTransactionDetails: transactionAmount,
      cardGroupTransactionDescDetails: description,
      insertedBy: sessionStorage.getItem('user'),
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: sessionStorage.getItem('user'),
      modifiedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),


    })
  }
  remove(i) {
    (<FormArray>this.cardUsageGroup.get("cardUsageDetailsFormGroup")).removeAt(i);
  }
  confirmCardUsageDetails() {
    if(this.confirmForm.length==0){
      this.success = "Please add CardUsage details";
      $("#error").show('fast')
      return;
    }
    this.enterData = false;
    this.confirm = true;
    
  }
  save() {
    this.removeValidation();
    this.updateValidation();
    console.log((<FormArray>this.cardUsageGroup.get("cardUsageDetailsFormGroup")).value)
    if ((<FormArray>this.cardUsageGroup.get('cardUsageDetailsFormGroup')).length > 0) {
      this.cardUsageservice.save((<FormArray>this.cardUsageGroup.get("cardUsageDetailsFormGroup")).value)
        .subscribe((response) => {

          while ((<FormArray>this.cardUsageGroup.get('cardUsageDetailsFormGroup')).length > 0) {
            (<FormArray>this.cardUsageGroup.get('cardUsageDetailsFormGroup')).removeAt(0);
          }
          this.resetGroupEntry();
          this.confirmForm = [];
          this.success = response.message
          $('#success').show('fast')
          this.enterData = true;
          this.confirm = false;
        },
          (error) => {
            this.success = JSON.parse(JSON.stringify(error)).error.message;
            $("#error").show('fast')

          })
    } else {
      
      this.success = "Please add CardUsage details";
      $("#error").show('fast')
      return;
    }

  }
  close() {
    $('#success').hide('fast')
    $("#error").hide('fast')
  }

  isInput() {
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
  }


}
