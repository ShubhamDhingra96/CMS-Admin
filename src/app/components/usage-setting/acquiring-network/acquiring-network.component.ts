import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UsagesService } from 'src/app/services/usages.service';
import { formatDate } from '@angular/common';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-acquiring-network',
  templateUrl: './acquiring-network.component.html',
  styleUrls: ['./acquiring-network.component.css']
})
export class AcquiringNetworkComponent implements OnInit {
  private acquiredNetworkGroup: FormGroup;
  private submitted: boolean = false;
  private confirmForm: any[] = [];
  private enterData: boolean = true;
  private confirm: boolean = false;

  private channelsForm: any[] = [];
  private acquiringNetworkDefinition: any[] = [];
  private networkId: any[] = [];
  private countryCode: any[] = [];
  private deliveryChannelId: any[] = [];
  private success: string = "";
  private isATM: boolean = false;
  private isPOS: boolean = false;
  private isgroupCodeExist: boolean = false;



  constructor(private formBuilder: FormBuilder, private usageService: UsagesService, private dataService: DataService, private router: Router) {
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
    this.acquiredNetworkGroup = this.formBuilder.group({
      groupCode: '',
      groupName: '',
      groupDescription: '',
      networkType: '',
      networkDesc: '',
      networkId: '',
      networkIdDesc: '',
      countryCode: '',
      networkDescriDesc: '',
      deliveryChannel: '',
      deliveryChannelName: '',
      location: '',
      terminalId: '',
      merchantId: '',
      insertedBy:sessionStorage.getItem('user'),
      acquiredGroups: this.formBuilder.array([])
    })

    this.getAcquiringNetworkDefinition();
    this.getDeliveryChannel();
  }

  addValidation() {
    this.acquiredNetworkGroup.get('groupCode').setValidators([Validators.required]),
      this.acquiredNetworkGroup.get('groupName').setValidators([Validators.required]),
      this.acquiredNetworkGroup.get('groupDescription').setValidators([Validators.required]),
      this.acquiredNetworkGroup.get('networkType').setValidators([Validators.required]),
      this.acquiredNetworkGroup.get('networkId').setValidators([Validators.required]),
      this.acquiredNetworkGroup.get('countryCode').setValidators([Validators.required]),
      this.acquiredNetworkGroup.get('deliveryChannel').setValidators([Validators.required]),
      this.acquiredNetworkGroup.get('deliveryChannelName').setValidators([Validators.required])
    // this.acquiredNetworkGroup.get('location').setValidators([Validators.required]);
    // this.acquiredNetworkGroup.get('terminalId').setValidators([Validators.required]);
    // this.acquiredNetworkGroup.get('merchantId').setValidators([Validators.required]);
  }

  updateValidation() {
    this.acquiredNetworkGroup.get('groupCode').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('groupName').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('networkType').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('groupDescription').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('networkId').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('countryCode').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('deliveryChannel').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('deliveryChannelName').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('location').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('terminalId').updateValueAndValidity(),
      this.acquiredNetworkGroup.get('merchantId').updateValueAndValidity()
  }

  getAcquiringNetworkDefinition() {
    this.usageService.getAcquiredNetworkType()
      .subscribe((response) => {
        this.acquiringNetworkDefinition = JSON.parse(JSON.stringify(response)).data;
      })

  }

  getDeliveryChannel() {
    this.usageService.getDeliveryChannel()
      .subscribe((response) => {
        this.deliveryChannelId = JSON.parse(JSON.stringify(response)).data;

      })

  }

  selectDeliveryChannel() {
    let deliveryCode = this.acquiredNetworkGroup.get("deliveryChannel").value;
    let data = this.deliveryChannelId.filter(res => res.delId == deliveryCode)[0]
    this.acquiredNetworkGroup.patchValue({
      deliveryChannelName: data.delCode
    })
    if (data.delId == "DEL002") {
      this.isATM = true;
      this.isPOS = false;
      this.acquiredNetworkGroup.get('location').setValidators([Validators.required]);
      this.acquiredNetworkGroup.get('terminalId').setValidators([Validators.required]);
      this.updateValidation()
      this.acquiredNetworkGroup.get('merchantId').clearValidators();
      this.acquiredNetworkGroup.get('merchantId').updateValueAndValidity()
    } else if (data.delId == "DEL005") {
      this.isATM = false;
      this.isPOS = true;
      this.acquiredNetworkGroup.get('terminalId').setValidators([Validators.required]);
      this.acquiredNetworkGroup.get('merchantId').setValidators([Validators.required]);
      this.updateValidation();
      this.acquiredNetworkGroup.get('location').clearValidators();
      this.acquiredNetworkGroup.get('location').updateValueAndValidity()
    } else {
      this.isATM = false;
      this.isPOS = false;
      this.acquiredNetworkGroup.get('location').clearValidators()
      this.acquiredNetworkGroup.get('terminalId').clearValidators()
      this.acquiredNetworkGroup.get('merchantId').clearValidators()
      this.updateValidation();
    }
  }

  selectNetworkType() {
    let networkType = this.acquiredNetworkGroup.get("networkType").value;
    let data = this.acquiringNetworkDefinition.filter(res => res.acquiredNetworkGroupId == networkType)[0];
    this.networkId = data.networkId
    this.acquiredNetworkGroup.patchValue({
      networkDesc: data.acquiredNetworkGroupDescription
    })
  }

  selectNetworkId() {
    let networkId = this.acquiredNetworkGroup.get("networkId").value;
    let data = this.networkId.filter(res => res.networkId == networkId)[0];
    this.countryCode = data.countryCode
    this.acquiredNetworkGroup.patchValue({
      networkIdDesc: data.networkDescription
    })
  }

  selectCountryCode() {
    let countryCode = this.acquiredNetworkGroup.get("countryCode").value;
    let data = this.countryCode.filter(res => res.countryCodeId == countryCode)[0];
    this.acquiredNetworkGroup.patchValue({
      networkDescriDesc: data.countryCodeDesc
    })
  }

  getNetworkTypeName(networktype: any): string {
    return this.acquiringNetworkDefinition.filter(res => res.acquiredNetworkGroupId == networktype)[0].acquiredNetworkGroupName;
  }

  getNetworkIdName(networkid: any): string {
    return this.networkId.filter(res => res.networkId == networkid)[0].networkName;
  }

  getCountryCodeName(countryCode): string {
    return this.countryCode.filter(res => res.countryCodeId == countryCode)[0].countryCodeName;
  }

  removeValidation() {
    this.acquiredNetworkGroup.get('groupCode').clearValidators(),
      this.acquiredNetworkGroup.get('groupName').clearValidators(),
      this.acquiredNetworkGroup.get('networkType').clearValidators(),
      this.acquiredNetworkGroup.get('groupDescription').clearValidators(),
      this.acquiredNetworkGroup.get('networkId').clearValidators(),
      this.acquiredNetworkGroup.get('countryCode').clearValidators(),
      this.acquiredNetworkGroup.get('deliveryChannel').clearValidators(),
      this.acquiredNetworkGroup.get('deliveryChannelName').clearValidators(),
      this.acquiredNetworkGroup.get('location').clearValidators(),
      this.acquiredNetworkGroup.get('terminalId').clearValidators(),
      this.acquiredNetworkGroup.get('merchantId').clearValidators()
  }

  addToTable() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.channelsForm = [];
    if (this.acquiredNetworkGroup.invalid)
      return;

    this.usageService.checkAcquiredNetworkGroup(this.acquiredNetworkGroup.get('insertedBy').value, this.acquiredNetworkGroup.get('groupCode').value)
      .subscribe(
        (response) => {
          let dataRes = JSON.parse(JSON.stringify(response)).data;
          if (dataRes) {
            $("input[name='groupCode']").css('border', '1px solid red');
            
            this.isgroupCodeExist = true;
            return;
          }

          this.add(
            this.acquiredNetworkGroup.get('groupCode').value,
            this.acquiredNetworkGroup.get('groupName').value,
            this.acquiredNetworkGroup.get('groupDescription').value,
            this.acquiredNetworkGroup.get('networkType').value,
            this.acquiredNetworkGroup.get('networkId').value,
            this.acquiredNetworkGroup.get('countryCode').value,
            this.acquiredNetworkGroup.get('deliveryChannel').value,
            this.acquiredNetworkGroup.get('deliveryChannelName').value,
            this.acquiredNetworkGroup.get('location').value,
            this.acquiredNetworkGroup.get('terminalId').value,
            this.acquiredNetworkGroup.get('merchantId').value
          );
          this.submitted = false;
          this.confirmForm.push(this.acquiredNetworkGroup.value);
          let data = {
            groupCode: this.acquiredNetworkGroup.get('groupCode').value,
            groupName: this.acquiredNetworkGroup.get('groupName').value,
            groupDesc: this.acquiredNetworkGroup.get('groupDescription').value,
            deliveryChannels: this.acquiredNetworkGroup.get('deliveryChannel').value,
            networkType: this.acquiredNetworkGroup.get('networkType').value,
            networkId: this.acquiredNetworkGroup.get('networkId').value,
            countryCode: this.acquiredNetworkGroup.get('countryCode').value,
            deliveryChannelName: this.acquiredNetworkGroup.get('deliveryChannelName').value,
            location: this.acquiredNetworkGroup.get('location').value,
            terminalId: this.acquiredNetworkGroup.get('terminalId').value,
            merchantId: this.acquiredNetworkGroup.get('merchantId').value
          }
          this.channelsForm.push(data);
          this.resetGroupEntry();
        }
      )

  }
  resetGroupEntry() {
    this.acquiredNetworkGroup.patchValue({
      groupCode: '',
      groupName: '',
      groupDescription: '',
      networkType: '',
      networkDesc: '',
      networkId: '',
      networkIdDesc: '',
      countryCode: '',
      networkDescriDesc: '',
      deliveryChannel: '',
      deliveryChannelName: '',
      location: '',
      terminalId: '',
      merchantId: ''  ,
      insertedBy:sessionStorage.getItem('user')    
    })
  }
  add(groupCode: any,
    groupName: any,
    groupDescription: any,
    networkType: any,
    networkId: any,
    countryCode: any,
    deliveryChannel: any,
    deliveryChannelName: any,
    location: any,
    terminalId: any,
    merchantId: any) {

    (<FormArray>this.acquiredNetworkGroup.get("acquiredGroups")).push(this.addGroup(groupCode,
      groupName,
      groupDescription,
      networkType,
      networkId,
      countryCode,
      deliveryChannel,
      deliveryChannelName,
      location,
      terminalId,
      merchantId));

    console.log((<FormArray>this.acquiredNetworkGroup.get("acquiredGroups")).value)
  }
  addGroup(groupCode: any,
    groupName: any,
    groupDescription: any,
    networkType: any,
    networkId: any,
    countryCode: any,
    deliveryChannel: any,
    deliveryChannelName: any,
    location: any,
    terminalId: any,
    merchantId: any): FormGroup {
    return this.formBuilder.group({
      groupCode: groupCode,
      groupName: groupName,
      groupDescription: groupDescription,
      networkType: this.getNetworkTypeName(networkType),
      networkId: this.getNetworkIdName(networkId),
      countryCode: this.getCountryCodeName(countryCode),
      deliveryChannel: deliveryChannel,
      deliveryChannelName: deliveryChannelName,
      location: location,
      terminalId: terminalId,
      merchantId: merchantId,
      groupId: '',
      insertedBy: sessionStorage.getItem('user'),
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: '',
      modifiedDate: '',
    })
  }

  remove(i) {
    (<FormArray>this.acquiredNetworkGroup.get("acquiredGroups")).removeAt(i);
  }
  confirmMerchant() {
    if(this.confirmForm.length==0){
      this.success = "Please add Acquiring details";
      $("#error").show('fast')
      return;
    }
    this.enterData = false;
    this.confirm = true;
  }

  save() {
    this.removeValidation();
    this.updateValidation();
    if ((<FormArray>this.acquiredNetworkGroup.get('acquiredGroups')).length > 0) {
      this.usageService.saveAcquiredNetworkGroup((<FormArray>this.acquiredNetworkGroup.get('acquiredGroups')).value)
        .subscribe((response) => {
          this.success = JSON.parse(JSON.stringify(response)).message
          while ((<FormArray>this.acquiredNetworkGroup.get('acquiredGroups')).length > 0) {
            (<FormArray>this.acquiredNetworkGroup.get('acquiredGroups')).removeAt(0);
          }
          this.acquiredNetworkGroup.reset();
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
      
      this.success = 'Please add merchant'
      $("#error").show('fast')
      return;
    }

  }

  cancel() {
    this.enterData = true;
    this.confirm = false;
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
    this.submitted = false;
  }

  isInput() {
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
  }
}
