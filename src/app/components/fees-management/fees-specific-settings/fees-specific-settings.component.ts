import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FeesService } from 'src/app/services/fees.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UsagesService } from 'src/app/services/usages.service';
import{LimitManagementService}from'src/app/services/limit-management.service';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-fees-specific-settings',
  templateUrl: './fees-specific-settings.component.html',
  styleUrls: ['./fees-specific-settings.component.css']
})
export class FeesSpecificSettingsComponent implements OnInit {
  private feesSpecificSettingsComponent: FormGroup;
  private submitted = false;
  private confirmForm: any[] = [];
  private show: boolean = false;
  private enterData: boolean = true;
  private confirm: boolean = false;

  private isfeeCodeExist: boolean = false;
  private channelsForm: any[] = [];
  private success: string = "";

  private acquiringNetwork: any[] = [];
  private countryGroup: any[] = [];
  private deliveryChannels: any[] = [];
  private merchantIdGroup: any[] = [];

  private transactionData : [];
  private groupTransactionData : [];
  
  private isHigher: boolean = false;
  private isLower: boolean = false;
  private isBoth: boolean = false;

  private isCount: boolean = false;
  private isAmount: boolean = false;

  private isPercentage: boolean = false;
  private isFlat: boolean = false;
  private IsBoth: boolean = false;
  private isChecked: boolean = false;

  constructor(private formBuilder: FormBuilder,private usageService:UsagesService, private limitService:LimitManagementService, private feesService: FeesService, private dataService: DataService, private router: Router) {
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
    this.feesSpecificSettingsComponent = this.formBuilder.group({
      feeCode: '',
      feeDescription: '',
      transaction: '',
      frequency: '',
      percentage: '',
      limit: '',
      chargeFeeTo: '',
      groupTransactions: '',
      criteria: '',
      criteriaFrom: '',
      criteriaTo: '',
      countryCode: '',
      minLimit: '',
      maxLimit: '', 
      acquiringNetwork: '',
      deliveryChannels: '',
      merchantIdGroup: '',
      flat: '',
      perFlat: '',
      rule: '',   
      countryName: '',
      acquiringNetworkName: '',
      deliveryChannelName: '',
      merchantIdGroupName: '',    
      seperateLine: '',
      seperateLines: '',
      createdBy: sessionStorage.getItem('user'),
      feeTable: this.formBuilder.array([])
    })
    this.getCountryGroup();
    this.getAcquiringNetworkGroup();
    this.getDeliveryChannelGroup();
    
  }

  checkedSaperateLine() {
    this.isChecked=!this.isChecked;
    this.feesSpecificSettingsComponent.patchValue({seperateLine:(this.isChecked)?'Yes':'No'})

  }
  getTransaction(){
    this.limitService.getTransactionData().subscribe(
      (response) => {       
        this.transactionData=JSON.parse(JSON.stringify(response)).list;
       
      }) 
  }

  getGroupTransaction(){
    this.feesService.getGroupTransaction().subscribe(
      (response) => {       
        this.groupTransactionData=JSON.parse(JSON.stringify(response)).list;
       
      }) 
  }
  

  getCountryGroup(){
    this.usageService.getAllCountryGroup()
    .subscribe(
      (response)=>{
        this.countryGroup=JSON.parse(JSON.stringify(response)).data;
        
        
      }
    )
  }

  selectCountrygroup(){
    this.feesSpecificSettingsComponent.patchValue({
      countryName:this.countryGroup.filter(res=>res.groupId==this.feesSpecificSettingsComponent.get('countryCode').value)[0].groupName
    })
  }

  getCountryGroupCodeName(id):string{
    return this.countryGroup.filter(res=>res.groupId==id)[0].groupCode
  }

  getAcquiringNetworkGroup(){
    this.usageService.getAllAcquiredNetworkGroup()
      .subscribe((response) => {
        this.acquiringNetwork = JSON.parse(JSON.stringify(response)).data;
       
      })
  }

  selectAcquiringGroup(){
    this.feesSpecificSettingsComponent.patchValue({
      acquiringNetworkName:this.acquiringNetwork.filter(res=>res.groupCode==this.feesSpecificSettingsComponent.get('acquiringNetwork').value)[0].groupName
    })
  }
  
  getAcquiringGroupCodeName(id):string{
     return this.acquiringNetwork.filter(res=>res.groupCode==id)[0].groupName
  }

  getDeliveryChannelGroup(){
    this.usageService.getAllDeliveryChannelGroup()
    .subscribe((response) => {
      this.deliveryChannels = JSON.parse(JSON.stringify(response)).data;
     
    })
  }
  selectDeliveryChannel(){
   this.feesSpecificSettingsComponent.patchValue({
    deliveryChannelName:this.deliveryChannels.filter(res=>res.groupCode==this.feesSpecificSettingsComponent.get('deliveryChannels').value)[0].groupName
   })
  }
  getDeliveryChannelGroupCodeName(id):string{
    return this.deliveryChannels.filter(res=>res.groupCode==id)[0].groupName
  }

  selectMerchantIdGroup(){
   switch(this.feesSpecificSettingsComponent.get('merchantIdGroup').value){
    case "ALL-ALL": {
      this.feesSpecificSettingsComponent.patchValue({
        merchantIdGroupName: 'All'
      })
    }
      break;
   }
  }

  add() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.channelsForm = [];
    console.log("valid")
    console.log(this.feesSpecificSettingsComponent)
    if (this.feesSpecificSettingsComponent.invalid){
      return;
    }
    this.feesService.checkFeeCode(this.feesSpecificSettingsComponent.get('createdBy').value, this.feesSpecificSettingsComponent.get('feeCode').value)
      .subscribe(
        (Response) => {
          let dataRes = JSON.parse(JSON.stringify(Response)).data;
          if (dataRes) {
            $("input[name='feeCode']").css('border', '1px solid red');

            this.isfeeCodeExist = true;
            return;
          }
          this.add1(
            this.feesSpecificSettingsComponent.get('feeCode').value,
            this.feesSpecificSettingsComponent.get('feeDescription').value,
            this.feesSpecificSettingsComponent.get('transaction').value,
            this.feesSpecificSettingsComponent.get('frequency').value,
            this.feesSpecificSettingsComponent.get('percentage').value,
            this.feesSpecificSettingsComponent.get('limit').value,
            this.feesSpecificSettingsComponent.get('chargeFeeTo').value,
            this.feesSpecificSettingsComponent.get('groupTransactions').value,
            this.feesSpecificSettingsComponent.get('criteria').value,
            this.feesSpecificSettingsComponent.get('criteriaFrom').value,
            this.feesSpecificSettingsComponent.get('criteriaTo').value,
            this.getCountryGroupCodeName(this.feesSpecificSettingsComponent.get('countryCode').value),
            this.feesSpecificSettingsComponent.get('minLimit').value,
            this.feesSpecificSettingsComponent.get('maxLimit').value,   
            this.getAcquiringGroupCodeName(this.feesSpecificSettingsComponent.get('acquiringNetwork').value),
            this.getDeliveryChannelGroupCodeName(this.feesSpecificSettingsComponent.get('deliveryChannels').value),
            this.feesSpecificSettingsComponent.get('merchantIdGroup').value,
            this.feesSpecificSettingsComponent.get('flat').value,
            this.feesSpecificSettingsComponent.get('perFlat').value,
            this.feesSpecificSettingsComponent.get('rule').value,         
            this.feesSpecificSettingsComponent.get('countryName').value,
            this.feesSpecificSettingsComponent.get('acquiringNetworkName').value,
            this.feesSpecificSettingsComponent.get('deliveryChannelName').value,
            this.feesSpecificSettingsComponent.get('merchantIdGroupName').value,          
            this.feesSpecificSettingsComponent.get('seperateLine').value
          );
          this.submitted = false;
          this.confirmForm.push(this.feesSpecificSettingsComponent.value);
          let data = {
            feeCode: this.feesSpecificSettingsComponent.get('feeCode').value,
            feeDescription: this.feesSpecificSettingsComponent.get('feeDescription').value,
            transaction: this.feesSpecificSettingsComponent.get('transaction').value,            
            frequency: this.feesSpecificSettingsComponent.get('frequency').value,
            percentage: this.feesSpecificSettingsComponent.get('percentage').value,
            limit: this.feesSpecificSettingsComponent.get('limit').value,
            chargeFeeTo: this.feesSpecificSettingsComponent.get('chargeFeeTo').value,
            groupTransactions: this.feesSpecificSettingsComponent.get('groupTransactions').value,
            criteria: this.feesSpecificSettingsComponent.get('criteria').value,
            criteriaFrom: this.feesSpecificSettingsComponent.get('criteriaFrom').value,
            criteriaTo: this.feesSpecificSettingsComponent.get('criteriaTo').value,
            countryCode: this.feesSpecificSettingsComponent.get('countryCode').value,
            minLimit: this.feesSpecificSettingsComponent.get('minLimit').value,
            maxLimit: this.feesSpecificSettingsComponent.get('maxLimit').value,   
            acquiringNetwork: this.feesSpecificSettingsComponent.get('acquiringNetwork').value,
            deliveryChannels: this.feesSpecificSettingsComponent.get('deliveryChannels').value,
            merchantIdGroup: this.feesSpecificSettingsComponent.get('merchantIdGroup').value,
            flat: this.feesSpecificSettingsComponent.get('flat').value,
            perFlat: this.feesSpecificSettingsComponent.get('perFlat').value,
            rule: this.feesSpecificSettingsComponent.get('rule').value,
            countryName: this.feesSpecificSettingsComponent.get('countryName').value,
            acquiringNetworkName: this.feesSpecificSettingsComponent.get('acquiringNetworkName').value,
            deliveryChannelName: this.feesSpecificSettingsComponent.get('deliveryChannelName').value,
            merchantIdGroupName: this.feesSpecificSettingsComponent.get('merchantIdGroupName').value,                   
            seperateLine: this.feesSpecificSettingsComponent.get('seperateLine').value
          }
          this.channelsForm.push(data);
          this.resetLimitEntry();
        })
  }
  resetLimitEntry() {
    this.feesSpecificSettingsComponent.patchValue({
      feeCode: '',
      feeDescription: '',
      transaction: '',
      frequency: '',
      percentage: '',
      limit: '',
      chargeFeeTo: '',
      groupTransactions: '',
      criteria: '',
      criteriaFrom: '',
      criteriaTo: '',
      countryCode: '',
      minLimit: '',
      maxLimit: '',     
      acquiringNetwork: '',
      deliveryChannels: '',
      merchantIdGroup: '',
      flat: '',
      perFlat: '',
      rule: '',
      countryName: '',
      acquiringNetworkName: '',
      deliveryChannelName: '',
      merchantIdGroupName: '',    
      seperateLine: ' '
    })
  }
  add1(feeCode: any,
    feeDescription: any,
    transaction: any,
    frequency: any,
    percentage: any,
    limit: any,
    chargeFeeTo: any,
    groupTransactions: any,
    criteria: any,
    criteriaFrom: any,
    criteriaTo: any,
    countryCode: any,
    minLimit: any,
    maxLimit: any,
    acquiringNetwork: any,
    deliveryChannels: any,
    merchantIdGroup: any,
    flat: any,
    perFlat: any,
    rule: any,
    countryName: any,
    acquiringNetworkName: any,
    deliveryChannelName: any,
    merchantIdGroupName: any,
    seperateLine: any
    
  ) {
    
    (<FormArray>this.feesSpecificSettingsComponent.get("feeTable")).push(this.addFee(feeCode,
      feeDescription,transaction,frequency,percentage,limit,chargeFeeTo, groupTransactions,criteria,
      criteriaFrom,criteriaTo,countryCode,minLimit,maxLimit,acquiringNetwork,deliveryChannels,merchantIdGroup,flat,perFlat,
      rule,countryName,acquiringNetworkName,deliveryChannelName,merchantIdGroupName,seperateLine));
     
  }

  addFee(feeCode: any, feeDescription: any, transaction: any, frequency: any, percentage: any, limit: any, chargeFeeTo: any, 
    groupTransactions: any, criteria: any,criteriaFrom: any,criteriaTo: any, countryCode: any, minLimit: any,
    maxLimit: any,acquiringNetwork: any, deliveryChannels: any, merchantIdGroup: any, flat: any, perFlat: any,rule: any, countryName: any, 
    acquiringNetworkName: any, deliveryChannelName: any, merchantIdGroupName: any,
    seperateLine: any): FormGroup {
    return this.formBuilder.group({
      feeCode: feeCode,
      feeDescription: feeDescription,
      transaction: transaction,
      frequency: frequency,
      percentage: percentage,
      limit: limit,
      minLimit: minLimit,
      maxLimit: maxLimit,
      chargeFeeTo: chargeFeeTo,
      groupTransactions: groupTransactions,
      criteria: criteria,
      criteriaFrom: criteriaFrom,
      criteriaTo: criteriaTo,
      countryCode: countryCode,
      acquiringNetwork: acquiringNetwork,
      deliveryChannels: deliveryChannels,
      merchantIdGroup: merchantIdGroup,
      flat: flat,
      perFlat: perFlat,
      rule: rule,
      countryName: countryName,
      acquiringNetworkName: acquiringNetworkName,
      deliveryChannelName: deliveryChannelName,
      merchantIdGroupName: merchantIdGroupName,
      seperateLine: seperateLine,
      feeType: '0',
      createdBy: sessionStorage.getItem('user'),
      createdOn: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: '',
      modifiedOn: '',

    })
  }


  addValidation() {
      this.feesSpecificSettingsComponent.get('feeCode').setValidators([Validators.required,Validators.pattern(environment.letterNumber)]),
      this.feesSpecificSettingsComponent.get('feeDescription').setValidators([Validators.required,Validators.pattern(environment.letterNumber)]),
      this.feesSpecificSettingsComponent.get('transaction').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('frequency').setValidators([Validators.required]),    
      this.feesSpecificSettingsComponent.get('limit').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('chargeFeeTo').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('groupTransactions').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('criteria').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('countryCode').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('acquiringNetwork').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('deliveryChannels').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('merchantIdGroup').setValidators([Validators.required]),     
      this.feesSpecificSettingsComponent.get('perFlat').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('countryName').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('acquiringNetworkName').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('deliveryChannelName').setValidators([Validators.required]),
      this.feesSpecificSettingsComponent.get('seperateLines').setValidators([Validators.required])
  }
  updateValidation() {
      this.feesSpecificSettingsComponent.get('feeCode').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('feeDescription').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('transaction').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('frequency').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('percentage').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('limit').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('minLimit').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('maxLimit').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('chargeFeeTo').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('groupTransactions').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('criteria').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('criteriaFrom').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('criteriaTo').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('countryCode').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('acquiringNetwork').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('deliveryChannels').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('merchantIdGroup').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('flat').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('perFlat').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('rule').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('countryName').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('acquiringNetworkName').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('deliveryChannelName').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('merchantIdGroupName').updateValueAndValidity(),
      this.feesSpecificSettingsComponent.get('seperateLines').updateValueAndValidity()
  }
  removeValidation() {
      this.feesSpecificSettingsComponent.get('feeCode').clearValidators,
      this.feesSpecificSettingsComponent.get('feeDescription').clearValidators,
      this.feesSpecificSettingsComponent.get('transaction').clearValidators,
      this.feesSpecificSettingsComponent.get('frequency').clearValidators,
      this.feesSpecificSettingsComponent.get('percentage').clearValidators,
      this.feesSpecificSettingsComponent.get('limit').clearValidators,
      this.feesSpecificSettingsComponent.get('minLimit').clearValidators,
      this.feesSpecificSettingsComponent.get('maxLimit').clearValidators,
      this.feesSpecificSettingsComponent.get('chargeFeeTo').clearValidators,
      this.feesSpecificSettingsComponent.get('groupTransactions').clearValidators,
      this.feesSpecificSettingsComponent.get('criteria').clearValidators,
      this.feesSpecificSettingsComponent.get('criteriaFrom').clearValidators,
      this.feesSpecificSettingsComponent.get('criteriaTo').clearValidators,
      this.feesSpecificSettingsComponent.get('countryCode').clearValidators,
      this.feesSpecificSettingsComponent.get('acquiringNetwork').clearValidators,
      this.feesSpecificSettingsComponent.get('deliveryChannels').clearValidators,
      this.feesSpecificSettingsComponent.get('merchantIdGroup').clearValidators,
      this.feesSpecificSettingsComponent.get('flat').clearValidators,
      this.feesSpecificSettingsComponent.get('perFlat').clearValidators,
      this.feesSpecificSettingsComponent.get('rule').clearValidators,
      this.feesSpecificSettingsComponent.get('countryName').clearValidators,
      this.feesSpecificSettingsComponent.get('deliveryChannelName').clearValidators,
      this.feesSpecificSettingsComponent.get('merchantIdGroupName').clearValidators,
      this.feesSpecificSettingsComponent.get('seperateLines').clearValidators
  }
  confirmLimit() {
    this.enterData = false;
    this.confirm = true;
  }
  remove(i) {
    (<FormArray>this.feesSpecificSettingsComponent.get("feeTable")).removeAt(i);
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

  selectLimit(){
    this.isHigher=false;
    this.isLower=false;
    this.isBoth=false;
    let limit=this.feesSpecificSettingsComponent.get('limit').value.toString();
    if(limit){
      switch(limit){
        case "Higher":{
          this.isHigher=true;
          this.isLower=false;
          this.isBoth=false;
          this.feesSpecificSettingsComponent.get('minLimit').clearValidators();
          this.feesSpecificSettingsComponent.get('maxLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('minLimit').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('maxLimit').updateValueAndValidity();
          }
          break;

        case  "Lower":{
          this.isHigher=false;
          this.isLower=true;
          this.isBoth=false;
          this.feesSpecificSettingsComponent.get('minLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('maxLimit').clearValidators();
          this.feesSpecificSettingsComponent.get('minLimit').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('maxLimit').updateValueAndValidity();
        }
        break;

        case "Both":{
          this.isHigher=false;
          this.isLower=false;
          this.isBoth=true;  
          this.feesSpecificSettingsComponent.get('minLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('maxLimit').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('minLimit').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('maxLimit').updateValueAndValidity();   
        }
        break;

        default:{
            this.isHigher = false;
            this.isLower = false;
            this.isBoth = false;
          }
          break;
        
      }
    }
  }
  selectCriteria(){
    this.isCount=false;
    this.isAmount=false;
    let criteria = this.feesSpecificSettingsComponent.get('criteria').value.toString();
    if(criteria){
      switch(criteria){
        case "Count":{
          this.isCount=true;
          this.isAmount=false;
          this.feesSpecificSettingsComponent.get('criteriaFrom').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('criteriaTo').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('criteriaFrom').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('criteriaTo').updateValueAndValidity();
        }
        break;

        case "Amount":{
          this.isCount=false;
          this.isAmount=true;
          this.feesSpecificSettingsComponent.get('criteriaFrom').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('criteriaTo').setValidators([Validators.required,Validators.pattern(environment.onlyNumber)]);
          this.feesSpecificSettingsComponent.get('criteriaFrom').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('criteriaTo').updateValueAndValidity();
        }
        break;
        default:{
          this.isCount=false;
          this.isAmount=false;
          
        }
        break;
      }
    }
  }
  selectPercentage(){
    this.isPercentage=false;
    this.isFlat=false;
    this.IsBoth=false;
    let perFlat = this.feesSpecificSettingsComponent.get('perFlat').value.toString();
    if(perFlat){
      switch(perFlat){
        case "Percentage":{
          this.isPercentage=true;
          this.isFlat=false;
          this.IsBoth=false;
          this.feesSpecificSettingsComponent.get('percentage').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesSpecificSettingsComponent.get('flat').clearValidators();
          this.feesSpecificSettingsComponent.get('rule').clearValidators();
          this.feesSpecificSettingsComponent.get('percentage').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('flat').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('rule').updateValueAndValidity();
        }
        break;

        case "Flat":{
          this.isPercentage=false;
          this.isFlat=true;
          this.IsBoth=false;
          this.feesSpecificSettingsComponent.get('percentage').clearValidators();
          this.feesSpecificSettingsComponent.get('flat').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesSpecificSettingsComponent.get('rule').clearValidators();
          this.feesSpecificSettingsComponent.get('percentage').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('flat').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('rule').updateValueAndValidity();
        }
        break;

        case "Both":{
          this.isPercentage=false;
          this.isFlat=false;
          this.IsBoth=true;
          this.feesSpecificSettingsComponent.get('percentage').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesSpecificSettingsComponent.get('flat').setValidators([Validators.required,Validators.pattern(environment.onlyPercentage)]);
          this.feesSpecificSettingsComponent.get('rule').setValidators([Validators.required]);
          this.feesSpecificSettingsComponent.get('percentage').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('flat').updateValueAndValidity();
          this.feesSpecificSettingsComponent.get('rule').updateValueAndValidity();
        }
        break;
        default:{
          this.isPercentage=false;
          this.isFlat=false;
          this.IsBoth=false;
          }
          break;
      }
    }
  }

  save() {
    this.removeValidation();
    this.updateValidation();

    if ((<FormArray>this.feesSpecificSettingsComponent.get('feeTable')).length > 0) {
      this.feesService.save((<FormArray>this.feesSpecificSettingsComponent.get('feeTable')).value)
        .subscribe((response) => {
          this.success = JSON.parse(JSON.stringify(response)).message
          while ((<FormArray>this.feesSpecificSettingsComponent.get('feeTable')).length > 0) {
            (<FormArray>this.feesSpecificSettingsComponent.get('feeTable')).removeAt(0);
          }
          this.feesSpecificSettingsComponent.reset();
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