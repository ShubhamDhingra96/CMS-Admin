import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductSettingServiceService } from 'src/app/services/product-setting-service.service';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/DataService';
import { UsagesService } from 'src/app/services/usages.service';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';


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
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.css']
})
export class ProductSettingsComponent implements OnInit {

  UsageSettingFormGroup: FormGroup;
  private productCode: any[] = [];
  private isEntity = false;
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
  private limitmanagement: any[] = [];
  private success: string = "";
  private isExist: boolean = false;

  private usagesSetting = null;
  private usageCode = null;
  private isCountry: boolean = false;
  private isDeliveryChannel: boolean = false;
  private isAcquiringNetwork: boolean = false;
  private isMerchantCategory: boolean = false;
  private isLimitManagement: boolean = false;
  private isFeeManagement: boolean = false;
  private isCardUsage: boolean = false;
  private isAlertSetting: boolean = false;
  private ViewData: any[] = [];
  private selectForm: boolean = true;
  private isExistGroup: boolean = false;
  private submitted: boolean = false;
  private confirmForm: any = null;
  private productIDAry = new Set();
  private usageTypeAry = new Set();

  private showData: boolean = true;
  private confirm: boolean = false;


  constructor(private dataService: DataService, private router: Router, private usageService: UsagesService, private http: HttpClient, private formBuilder: FormBuilder,
    private productService: ProductSettingServiceService) {

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
      productName: '',
      productDesc: '',
      prodCurr: '',
      productCode: '',
      productId: '',
      usageDescription: '',
      effectiveDate: '',
      usageType: ['', Validators.required],
      usageRestriction: ['', Validators.required],
      code: ['', Validators.required],
      insertedBy: sessionStorage.getItem('user'),
      createdby: sessionStorage.getItem('user'),
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedDate: null,
      modifiedBy: null,
      usageSettingFormArraygroup: this.formBuilder.array([]),
    })

    this.getProductCodeList();

  }







  resetes() {
    this.UsageSettingFormGroup.patchValue({
      productName: '',
      productDesc: '',
      prodCurr: '',
      productId: ''
    })
  }

  removeArray() {
    while ((<FormArray>this.UsageSettingFormGroup.get('usageSettingFormArraygroup')).length > 0) {
      (<FormArray>this.UsageSettingFormGroup.get('usageSettingFormArraygroup')).removeAt(0)
    }
  }

  remove(i) {
    (<FormArray>this.UsageSettingFormGroup.get('usageSettingFormArraygroup')).removeAt(i);
    if ((<FormArray>this.UsageSettingFormGroup.get('usageSettingFormArraygroup')).length == 0) {
      this.confirmForm = null;
    }
  }


  getProductCodeList() {

    var requestData = {
    }
    this.productService.getProductCodeList(requestData).subscribe(data => {
      this.productCode = data.data;
    },
      error => {

      });

  }

  selectProductCode() {
    let productCode = this.UsageSettingFormGroup.get('productCode').value
    this.resetes();
    if (productCode) {
      let data = this.productCode.filter(res => res.productCode == productCode)[0];
      console.log(data)
      this.UsageSettingFormGroup.patchValue({
        productName: data.productName,
        productDesc: data.productDescription,
        prodCurr: data.productCurrency,
        productId: data.productId
      })

    } else {
      this.resetes();
    }
  }
  selectUsageSetting() {
    this.isExist = false;
    let usageSetting = this.UsageSettingFormGroup.get('usageType').value;
    let productCode = this.UsageSettingFormGroup.get('productCode').value;
    console.log(usageSetting);
    console.log(productCode);
    if (usageSetting) {
      switch (Number(usageSetting)) {
        case Setting.COUNTRY: {
          let d = this.productCode.filter(res => res.productCode == productCode && res.productUsageSetting.filter(res => res.usageType == 'Country')[0])
          if (d.length>0) {
            this.isExist = true;
            break;
          }

          this.getCountry(this.UsageSettingFormGroup.get('insertedBy').value)

        }
          break;
        case Setting.ACQUIRING_NETWORK: {
          let d = this.productCode.filter(res => res.productCode == productCode && res.productUsageSetting.filter(res => res.usageType == 'Acquiring Network')[0])

          if (d.length>0) {
            this.isExist = true;
            break;
          }
          this.getAcquiringNetwork(this.UsageSettingFormGroup.get('insertedBy').value);
        }
          break;
        case Setting.CARD_USAGE_SETTING: {
          let d = this.productCode.filter(res => res.productCode == productCode && res.productUsageSetting.filter(res => res.usageType == 'Card Usage Setting')[0])
          if (d.length>0) {
            this.isExist = true;
            break;
          }
          this.getCardUsageSetting(this.UsageSettingFormGroup.get('insertedBy').value);
        }
          break;
        case Setting.DELIVERY_CHANNEL: {

          let d = this.productCode.filter(res => res.productCode == productCode && res.productUsageSetting.filter(res => res.usageType == 'Delivery Channel')[0])
          if (d.length>0) {
            this.isExist = true;
            break;
          }
          this.getDeliveryChannel(this.UsageSettingFormGroup.get('insertedBy').value);

        }
          break;
        case Setting.FEE_MANAGEMENT: {
          this.getFeeManagement(this.UsageSettingFormGroup.get('createdby').value);

        }
          break;
        case Setting.LIMIT_MANAGEMENT: {
          let d = this.productCode.filter(res => res.productCode == productCode && res.productUsageSetting.filter(res => res.usageType == 'Limit Management')[0])
          if (d.length>0) {
            this.isExist = true;
            break;
          }
          this.getLimitManagement(this.UsageSettingFormGroup.get('createdby').value);

        }
          break;
        case Setting.MERCHANT_CATEGORY: {

          let d = this.productCode.filter(res => res.productCode == productCode && res.productUsageSetting.filter(res => res.usageType == 'Merchant Category')[0])
          if (d.length>0) {
            this.isExist = true;
            break;
          }
          this.getMerchantCategory(this.UsageSettingFormGroup.get('insertedBy').value);

        }
          break;
        case Setting.ALERT_SETTING: {
          let d = this.productCode.filter(res => res.productCode == productCode && res.productUsageSetting.filter(res => res.usageType == 'Alert Setting')[0])
          if (d.length>0) {
            this.isExist = true;
            break;
          }
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
          this.country = response.data;
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

          this.country = response.data;
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
          this.country = response.data;
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


  view() {

    this.selectForm = false;
    this.isCountry = false;
    this.isDeliveryChannel = false;
    this.isAcquiringNetwork = false;
    this.isCardUsage = false;
    this.isAlertSetting = false;
    this.isMerchantCategory = false;
    this.isLimitManagement = false;
    this.usagesSetting = this.UsageSettingFormGroup.get('usageType').value;
    this.usageCode = this.UsageSettingFormGroup.get('code').value;

    switch (Number(this.usagesSetting)) {
      case Setting.COUNTRY: {
        this.ViewData = [];
        this.isCountry = true;
        this.ViewData.push(this.country.filter(res => res.groupId == this.usageCode)[0])
      }
        break;
      case Setting.ACQUIRING_NETWORK: {
        this.ViewData = [];
        this.isAcquiringNetwork = true;
        this.ViewData.push(this.acquiringNetwork.filter(res => res.groupCode == this.usageCode)[0]);
      }
        break;
      case Setting.CARD_USAGE_SETTING: {
        this.ViewData = [];
        this.isCardUsage = true;
        this.ViewData.push(this.country.filter(res => res.groupId == this.usageCode)[0])
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
        this.ViewData.push(this.country.filter(res => res.limitCode == this.usageCode)[0])
      }
        break;
      case Setting.MERCHANT_CATEGORY: {
        this.ViewData = [];
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
        this.ViewData = [];
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
    this.isMerchantCategory = false;
    this.isLimitManagement = false;
    this.ViewData = [];
    this.UsageSettingFormGroup.patchValue({
      usageType: '',
      code: ''
    })
  }


  addToTable() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.confirmForm = null;

    if (this.UsageSettingFormGroup.invalid && !this.isExist)
      return;

    let data = this.UsageSettingFormGroup.value;
    let usagetype = this.UsageSettingFormGroup.get('usageType').value;
    let usagecode = this.UsageSettingFormGroup.get('code').value
    switch (Number(usagetype)) {
      case Setting.COUNTRY: {
        let d = this.country.filter(res => res.groupId == usagecode)[0];
        data.usageDescription = d.groupDescription;
        data.usageType = "Country";
        data.code = d.groupCode;
      }
        break;
      case Setting.ACQUIRING_NETWORK: {
        let d = this.acquiringNetwork.filter(res => res.groupCode == usagecode)[0]
        data.usageDescription = d.groupDescription;
        data.usageType = "Acquiring Network";
        data.code = d.groupCode;
      }
        break;
      case Setting.CARD_USAGE_SETTING: {
        let d = this.cardUsageSetting.filter(res => res.groupId == usagecode)[0]
        data.usageDescription = d.groupDescription;
        data.usageType = "Card Usage Setting";
        data.code = d.groupCode;
      }
        break;
      case Setting.DELIVERY_CHANNEL: {
        let d = this.deliveryChannel.filter(res => res.groupId == usagecode)[0]
        data.usageDescription = d.groupDescription;
        data.usageType = "Delivery Channel";
        data.code = d.groupCode;

      }
        break;
      case Setting.FEE_MANAGEMENT: {
        let d = this.feeManagement.filter(res => res.feeCode == usagecode)[0]

        data.usageDescription = d.groupDescription;
        data.usageType = "Fee Management";
        data.code = d.groupCode;
      }
        break;
      case Setting.LIMIT_MANAGEMENT: {
        let d = this.country.filter(res => res.limitCode == usagecode)[0]
        data.usageDescription = d.groupDescription;
        data.usageType = "Limit Management";
        data.code = d.groupCode;
      }
        break;
      case Setting.MERCHANT_CATEGORY: {
        let d = this.merchantCategory.filter(res => res.groupId == usagecode)[0]
        data.usageDescription = d.groupDescription;
        data.usageType = "Merchant Category";
        data.code = d.groupCode;
      }
        break;
      case Setting.ALERT_SETTING: {
        let d = this.alertSessting.filter(res => res.groupId == usagecode)[0]
        data.usageDescription = d.groupDescription;
        data.usageType = "Alert Setting";
        data.code = d.groupCode;
      }
        break;

      default: {

      }
        break;
    }

    console.log(data)

    this.add(
      data.productCode,
      data.productName,
      data.productDesc,
      data.prodCurr,
      data.usageType,
      data.code,
      data.productId,
      data.usageDescription,
      data.usageRestriction,
      data.effectiveDate
    );
    this.submitted = false;
    this.confirmForm = this.UsageSettingFormGroup.value;

    this.resetGroupEntery();
  }


  resetGroupEntery() {
    this.UsageSettingFormGroup.patchValue({
      productCode: '',
      productName: '',
      productDesc: '',
      prodCurr: '',
      usageType: '',
      code: '',
      usageDescription: '',
      effectiveDate: '',
      usageRestriction: ''
    })
  }

  add(productCode: any,
    productName: any,
    productDesc: any,
    prodCurr: any,
    usageType: any,
    code: any,
    productId: any,
    usageDescription: any,
    usageResctriction: any,
    effectiveDate: any
  ) {
    (<FormArray>this.UsageSettingFormGroup.get("usageSettingFormArraygroup")).push(this.addGroup(
      productCode,
      productName,
      productDesc,
      prodCurr,
      usageType,
      code,
      productId,
      usageDescription,
      usageResctriction,
      effectiveDate));
  }


  addGroup(
    productCode: any,
    productName: any,
    productDesc: any,
    prodCurr: any,
    usageType: any,
    code: any,
    productId: any,
    usageDescription: any,
    usageResctriction: any,
    effectiveDate: any
  ): FormGroup {
    return this.formBuilder.group({
      productCode: productCode,
      productName: productName,
      productDesc: productDesc,
      prodCurr: prodCurr,
      productId: productId,
      usageDescription: usageDescription,
      usageRestriction: usageResctriction,
      effectiveDate: effectiveDate,
      usageType: usageType,
      code: code,
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedDate: null,
      modifiedBy: null,
      insertedBy: sessionStorage.getItem('user')
    })
  }


  addValidation() {

    this.UsageSettingFormGroup.get('productCode').setValidators([Validators.required]),
      this.UsageSettingFormGroup.get('productName').setValidators([Validators.required]),
      this.UsageSettingFormGroup.get('productDesc').setValidators([Validators.required]),
      this.UsageSettingFormGroup.get('prodCurr').setValidators([Validators.required]),
      this.UsageSettingFormGroup.get('usageType').setValidators([Validators.required]),
      this.UsageSettingFormGroup.get('code').setValidators([Validators.required])
  }


  updateValidation() {

    this.UsageSettingFormGroup.get('productCode').updateValueAndValidity();
    this.UsageSettingFormGroup.get('productName').updateValueAndValidity();
    this.UsageSettingFormGroup.get('productDesc').updateValueAndValidity();
    this.UsageSettingFormGroup.get('prodCurr').updateValueAndValidity();
    this.UsageSettingFormGroup.get('usageType').updateValueAndValidity();
    this.UsageSettingFormGroup.get('code').updateValueAndValidity();

  }


  save() {
    let anyData: any[] = [];
    let productID = new Set();
    let usageType = new Set();
    for (let ch of this.confirmForm.usageSettingFormArraygroup) {

      if (!productID.has(ch.productId) && !usageType.has(ch.usageType)) {


        let data = {
          productId: ch.productId,
          insertedBy: ch.insertedBy,
          modifiedBy: null,
          insertedDate: ch.insertedDate,
          modifiedDate: null,
          productCode: ch.productCode,
          productName: ch.productName,
          productDesc: ch.productDesc,
          prodCurr: this.confirmForm.prodCurr,
          usageDescription: ch.usageDescription,
          usageRestriction: ch.usageRestriction,
          usageType: ch.usageType,
          code: ch.code
        }
        productID.add(ch.productId);
        usageType.add(ch.usageType);
        anyData.push(data);
      }

    }




    this.productService.save(anyData)
      .subscribe(
        (response) => {
          this.success = response.message;
          $("#success").show('fast');

          this.confirm = false;
          this.showData = true;
          this.confirmForm = null;
          this.removeArray();
        }
        ,
        (error) => {
          this.success = error.error.message;
          $("#error").show('fast');
        }
      )

  }

  close() {
    $("#error").hide('fast');
    $("#success").hide('fast');
  }

  confirmData() {
    if (this.confirmForm == null) {
      this.success = "Please add Data."
      $("#error").show('fast');
      return;
    }
    this.confirm = true;
    this.showData = false;
  }
  back() {
    this.confirm = false;
    this.showData = true;
  }

}
