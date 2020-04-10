import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/DataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BinGroupService } from 'src/app/services/bin-group.service';
import { UsagesService } from 'src/app/services/usages.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

enum Setting {
  COUNTRY = 0,
  DELIVERY_CHANNEL = 1,
  ACQUIRING_NETWORK = 2,
  CARD_USAGE_SETTING = 3,
  MERCHANT_CATEGORY = 4,
  LIMIT_MANAGEMENT = 5,
  FEE_MANAGEMENT = 6,
  ALERT_SETTING = 7
}


@Component({
  selector: 'app-view-usage-settings',
  templateUrl: './view-usage-settings.component.html',
  styleUrls: ['./view-usage-settings.component.css']
})


export class ViewUsageSettingsComponent implements OnInit {

  private isEntity = false;
  private UsageSettingFormGroup: FormGroup;
  private isView = false;
  private code: any[] = [];
  private country: any[] = [];
  private acquiringNetwork: any[] = [];
  private cardUsageSetting: any[] = [];
  private feeManagement: any[] = [];
  private limitManagement: any[] = [];
  private merchantCategory: any[] = [];
  private alertSessting: any[] = [];
  private deliveryChannel: any[] = [];
  private limitmanagement: any[] =[];

  private usagesSetting = null;
  private usageCode = null;
  private isCountry: boolean = false;
  private isDeliveryChannel: boolean = false;
  private isAcquiringNetwork: boolean = false;
  private isMerchantCategory: boolean = false;
  private isLimitManagement: boolean =false;
  private isFeeManagement: boolean =false;
  private isCardUsage: boolean =false;
  private isAlertSetting: boolean=false;
  private ViewData: any[] = [];
  private selectForm: boolean = true;

  constructor(private formBuilder: FormBuilder, private usageService: UsagesService, private dataService: DataService, private router: Router, private http: HttpClient) {

    if (sessionStorage.getItem('user')) {
      this.isEntity = true;
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  ngOnInit() {
    this.UsageSettingFormGroup = this.formBuilder.group({
      usageType: ['',Validators.required],
      code: ['',Validators.required],
      insertedBy: sessionStorage.getItem('user'),
      createdby: sessionStorage.getItem('user')
    })
  }
  addValidation() {
    this.UsageSettingFormGroup.get('usageType').setValidators([Validators.required]),
      this.UsageSettingFormGroup.get('code').setValidators([Validators.required,])
  }
  updateValidation() {
    this.UsageSettingFormGroup.get('usageType').updateValueAndValidity(),
      this.UsageSettingFormGroup.get('code').updateValueAndValidity()
      
  }
  removeValidation() {
    this.UsageSettingFormGroup.get('usageType').clearValidators(),
    this.UsageSettingFormGroup.get('code').clearValidators()
  }
  selectUsageSetting() {
    let usageSetting = this.UsageSettingFormGroup.get('usageType').value;
    if (usageSetting) {

      switch (Number(usageSetting)) {

        case Setting.COUNTRY: {
          this.getCountry(this.UsageSettingFormGroup.get('insertedBy').value)
        }
          break;
        case Setting.ACQUIRING_NETWORK: {
          this.getAcquiringNetwork(this.UsageSettingFormGroup.get('insertedBy').value);
        }
          break;
        case Setting.CARD_USAGE_SETTING: {
          this.getCardUsageSetting(this.UsageSettingFormGroup.get('insertedBy').value);
        }
          break;
        case Setting.DELIVERY_CHANNEL: {
          this.getDeliveryChannel(this.UsageSettingFormGroup.get('insertedBy').value);

        }
          break;
        case Setting.FEE_MANAGEMENT: {
          this.getFeeManagement(this.UsageSettingFormGroup.get('createdby').value);

        }
          break;
        case Setting.LIMIT_MANAGEMENT: {
          this.getLimitManagement(this.UsageSettingFormGroup.get('createdby').value);

        }
          break;
        case Setting.MERCHANT_CATEGORY: {
          this.getMerchantCategory(this.UsageSettingFormGroup.get('insertedBy').value);

        }
          break;
        case Setting.ALERT_SETTING: {
          this.getAlertSetting(this.UsageSettingFormGroup.get('insertedBy').value);

        }
          break;

        default: {
          this.removeArrayElement();

        }
          break;
      }
    } else {
      this.removeArrayElement();
    }
  }
  removeArrayElement() {
    this.code = [];    
  }


  getCountry(user: string) {
    this.usageService.getCountryGroupUserBase(user)
      .subscribe(
        (response) => {
          this.country = response.data;
          this.removeArrayElement();
          for (let res of response.data) {
            let usage = {
              settingId: res.groupId,
              settingName: res.groupCode
            }
            this.code.push(usage);
          }
        },
        (error) => {
          this.removeArrayElement();
        }
      )

  }

  getAcquiringNetwork(user: string) {
    this.usageService.viewAcquiringNetworkGroup(user)
      .subscribe(
        (response) => {
          this.removeArrayElement();
          this.acquiringNetwork = response.data;

          for (let res of this.acquiringNetwork) {
            let usage = {
              settingId: res.groupCode,
              settingName: res.groupCode
            }
            this.code.push(usage);
          }
        },
        (error) => {
          this.removeArrayElement();
        }
      )

  }
  getCardUsageSetting(user: string) {
    this.usageService.viewCardUsageSetting(user)
    
      .subscribe(
        (response) => {
          this.cardUsageSetting = response.data;
          this.removeArrayElement();
          console.log("Card Usage Setting")
          for (let res of response.data) {
            let usage = {
              settingId: res.groupId,
              settingName: res.groupCode
            }
            this.code.push(usage);
          }
        },
        (error) => {
          this.removeArrayElement();
        }
      )

  }
  getDeliveryChannel(user: string) {
    this.usageService.getDeliveryChannelGroupUserBase(user)
      .subscribe(
        (response) => {
          this.deliveryChannel = response.data;
          this.removeArrayElement();
          for (let res of response.data) {
            let usage = {
              settingId: res.groupId,
              settingName: res.groupCode
            }
            this.code.push(usage);
          }
        },
        (error) => {
          this.removeArrayElement();
        }
      )
  }

  getFeeManagement(user: string) {
    this.usageService.viewFeeManagement(user)
    .subscribe(
      (response) => {
        this.feeManagement = response.data;
        this.removeArrayElement();
        for (let res of response.data) {
          let usage = {
            settingId: res.feeCode,
            settingName: res.feeCode
          }
          this.code.push(usage);
        }
      },
      (error) => {
        this.removeArrayElement();
      }
    )

}

  getLimitManagement(user: string) {
    this.usageService.viewLimitManagement(user)
    .subscribe(
      (response) => {        
        this.limitManagement = response.data;
        this.removeArrayElement();
        for (let res of response.data) {
          let usage = {
            settingId: res.limitCode,
            settingName: res.limitCode
          
          }
          this.code.push(usage);
        }
      },
      (error) => {
        this.removeArrayElement();
      }
    )

}

  getMerchantCategory(user: string) {
    this.usageService.viewMerchaneCategory(user)
      .subscribe(
        (response) => {
          this.merchantCategory = response.data;
          this.removeArrayElement();
          for (let res of response.data) {
            let usage = {
              settingId: res.groupId,
              settingName: res.merchantGroupCode
            }
            this.code.push(usage);
          }
        },
        (error) => {
          this.removeArrayElement();
        }
      )

  }

  getAlertSetting(user: string) {
    this.usageService.viewAlertSetting(user)
      .subscribe(
        (response) => {
          this.alertSessting = response.data;
          this.removeArrayElement();
          for (let res of response.data) {
            let usage = {
              settingId: res.groupId,
              settingName: res.groupCode
            }
            this.code.push(usage);
          }
        },
        (error) => {
          this.removeArrayElement();
        }
      )

  }

  view() {
    this.addValidation();
    this.selectForm = false;
    this.isCountry = false;
    this.isDeliveryChannel = false;
    this.isAcquiringNetwork = false;
    this.isCardUsage = false;
    this.isAlertSetting=false;
    this.isMerchantCategory=false;
    this.isLimitManagement=false;
    this.usagesSetting = this.UsageSettingFormGroup.get('usageType').value;
    this.usageCode = this.UsageSettingFormGroup.get('code').value;

    console.log(this.usagesSetting);

    switch (Number(this.usagesSetting)) {
      case Setting.COUNTRY: {
        this.ViewData = [];
        
        this.isCountry = true;
        this.ViewData.push(this.country.filter(res => res.groupId == this.usageCode)[0])


      }
        break;
      case Setting.ACQUIRING_NETWORK: {

        this.ViewData = [];
        console.log("vewdata:", this.ViewData)
        this.isAcquiringNetwork = true;
        console.log(this.acquiringNetwork.filter(res => res.groupCode == this.usageCode));

        this.ViewData.push(this.acquiringNetwork.filter(res => res.groupCode == this.usageCode)[0]);
        console.log("vewdata:", this.ViewData);

      }
        break;
      case Setting.CARD_USAGE_SETTING: {
        this.ViewData = [];
        console.log("Viewdata",this.ViewData)
        this.isCardUsage = true;
        this.ViewData.push(this.country.filter(res => res.groupId == this.usageCode)[0])
        console.log("Viewdata",this.ViewData)
      }
        break;
      case Setting.DELIVERY_CHANNEL: {
        this.ViewData = [];
        this.isDeliveryChannel = true;
        this.ViewData.push(this.deliveryChannel.filter(res => res.groupId == this.usageCode)[0])

      }
        break;
      case Setting.FEE_MANAGEMENT: {
        this.ViewData = [];
        this.isFeeManagement = true;
        this.ViewData.push(this.country.filter(res => res.feeCode == this.usageCode)[0])


      }
        break;
      case Setting.LIMIT_MANAGEMENT: {
        this.ViewData = [];
        this.isLimitManagement = true;
        console.log("Viewdata",this.ViewData)
        this.ViewData.push(this.country.filter(res => res.limitCode == this.usageCode)[0])
        // console.log("Viewdata",this.limitmanagement.filter(res => res.limitCode == this.usageCode)[0])
        console.log("Viewdata",this.ViewData)
      }
        break;
      case Setting.MERCHANT_CATEGORY: {
        this.ViewData = [];
        alert("inside viewdata",)
        this.isMerchantCategory = true;
        this.ViewData.push(this.country.filter(res => res.groupId == this.usageCode)[0])
       

      }
        break;
      case Setting.ALERT_SETTING: {
        this.ViewData = [];
        this.isAlertSetting = true;
        this.ViewData.push(this.country.filter(res => res.groupId == this.usageCode)[0])


      }
        break;

      default: {
        console.log("default" + this.usagesSetting);


      }
        break;
    }


  }
  cancel() {
    this.selectForm = true;
    this.isCountry = false;
    this.isDeliveryChannel = false;
    this.isAcquiringNetwork = false;
    this.isCardUsage = false;
    this.isMerchantCategory=false;
    this.isLimitManagement=false;

    this.ViewData = [];
    this.UsageSettingFormGroup.patchValue({
      usageType: '',
      code: ''
    })
  }

}





