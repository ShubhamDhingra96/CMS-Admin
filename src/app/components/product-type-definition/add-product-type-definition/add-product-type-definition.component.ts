import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProgrammedefinitionService } from 'src/app/services/programmegroupdefination.service';
import { ProductDefinationService } from 'src/app/services/productdefination.service';
import { AddBingroupSetupComponent } from '../../bingroup-setup/add-bingroup-setup/add-bingroup-setup.component';
import { formatDate } from '@angular/common';
import { BinGroupService } from 'src/app/services/bin-group.service';
import { BinSetupService } from 'src/app/services/bin-setup.service';


@Component({
  selector: 'app-add-product-type-definition',
  templateUrl: './add-product-type-definition.component.html',
  styleUrls: ['./add-product-type-definition.component.css']
})
export class AddProductTypeDefinitionComponent implements OnInit {

  private productDefinationGroup: FormGroup;
  private productDefination: any[] = [];
  private productCurrency: any[] = [];
  private binGroupDefination: any[] = [];
  private programId: any[] = [];
  private submitted: boolean = false;
  private confirm: boolean = false;
  private confirmForm: any = null;
  private success: string = "";
  private dataEntry: boolean = true;
  private isFixedDate: boolean = false;
  private isVariableDate: boolean = false;
  private isChecked: boolean = false;
  private currencyCountryList: any[] = [];
  private currencyCountryLists = new Set();
  private cardActivation: any[] = [];
  private cardActivationList = new Set();
  private plasticCodes: any[] = [];
  private plasticCodeList = new Set();
  private enable: boolean = true;
  private disable: boolean = false;
  private deliveryChcek: boolean = false
  private _program: any[] = null;



  constructor(private formBuilder: FormBuilder, private binService: BinSetupService, private programDefinationService: ProgrammedefinitionService, private dataService: DataService, private router: Router, private productService: ProductDefinationService) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
    this.loadCurrency()
  }

  ngOnInit() {
    console.log('init')

    this.productDefinationGroup = this.formBuilder.group({
      productCode: '',
      productName: '',
      productDescription: '',
      pairCards: '',
      applicationType: '',
      programType: '',
      programCode: '',
      programDescription: '',
      productCurrency: '',
      currencyDescription: '',
      serviceCode: '',
      pinTryLimit: '',
      cardGenerationMethod: '',
      cardEmbossing: '',
      pinDeliveryMethod: '',
      cardExpiryMethod: '',
      expiryMonth: '',
      expiryPeriod: '',
      variableExpiryPeriod: '',
      embossingTemplateId: '',
      replacementTemplateId: '',
      welcomeTemplate: '',
      issuingCurrencyCountry: '',
      cardActivationGroup: '',
      deliverMethod: '',
      countryCurrencyListDB: '',
      countryCurrencyList: '',
      cardActivationGroupAdd: '',
      cardActivationRemove: '',
      binGroup: '',
      binCurrency: '',
      binGroupDescription: '',
      binRangeFrom: '',
      binrangeTo: '',
      plasticCode: '',
      plasticCodeAdd: '',
      plasticCodeRemove: '',
      productDefinationArrayGroup: this.formBuilder.array([]),
      insertedBy: [sessionStorage.getItem('user'), Validators.required],
      insertedDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedDate: null,
      modifiedBy: null
    })
    this.getProgramGroupDefinition();
    this.getProgramGroupDefinitionCurrency();
    this.getBinGroup();

  }

  selectPair() {
    this.isChecked = !this.isChecked;
    this.productDefinationGroup.patchValue({ pairCards: (this.isChecked) ? 'Yes' : 'No' })

  }

  showDeliveryMethod() {
    this.deliveryChcek = !this.deliveryChcek;

  }


  selectProgramType() {
    let programType = this.productDefinationGroup.get("programType").value;
    let data = this.productDefination.filter(res => res.programDefinitionid == programType)[0];
    // this.programId = data.programDefinitionid
    this.productDefinationGroup.patchValue({
      programDescription: data.programDescription
    })
  }

  selectBinGroup() {
    let binGroup = this.productDefinationGroup.get("binGroup").value;
    //this.resetGroupEntery();
    //if (binGroup) {
      let data = this.binGroupDefination.filter(res => res.binGroupId == binGroup)[0];
      console.log(data);
      
      this.removeValidationForBinGroup();
      this.enable = false;
      this.disable = false;
      this.productDefinationGroup.patchValue({
        binCurrency: data.binCurrency,
        binGroupDescription: data.binGroupDesc,
        binRangeFrom: data.binRnangeFrom,
        binrangeTo: data.binRangeTo
      })
      let plasticValue = data.plasticCode.toString();
      let split = plasticValue.split(',');
      this.plasticCodes = split;


      // (error) => {
      //   this.resetGroupEntery();
      // }

    // } else {
    //   this.resetGroupEntery();
    // }
  }
  loadCurrency() {
    this.binService.getCurrencyData()
      .subscribe(
        (response) => {
          this.currencyCountryList = response.list;

        }
      )
  }

  removeToList() {
    let data: any[] = this.productDefinationGroup.get('countryCurrencyList').value;
    for (let d of data) {
      if (d) {
        this.currencyCountryLists.delete(d);
      }
    }

    if (this.currencyCountryLists.size == 0) {
      this.productDefinationGroup.patchValue({ groupCompanyList: '' })
      this.productDefinationGroup.get('countryCurrencyList').setValidators(Validators.required);
      this.productDefinationGroup.get('countryCurrencyList').updateValueAndValidity();

    }
  }

  removeCard() {
    let data: any[] = this.productDefinationGroup.get('cardActivationRemove').value;
    for (let d of data) {
      if (d) {
        this.cardActivationList.delete(d);
      }
    }

    if (this.cardActivationList.size == 0) {
      this.productDefinationGroup.patchValue({ groupCompanyList: '' })
      this.productDefinationGroup.get('cardActivationRemove').setValidators(Validators.required);
      this.productDefinationGroup.get('cardActivationRemove').updateValueAndValidity();

    }
  }

  removePlasticCode() {
    let data: any[] = this.productDefinationGroup.get('plasticCodeRemove').value;
    for (let d of data) {
      if (d) {
        this.plasticCodeList.delete(d);
      }
    }
    if (this.plasticCodeList.size == 0) {
      this.productDefinationGroup.patchValue({ groupCompanyList: '' })
      this.productDefinationGroup.get('plasticCodeRemove').setValidators(Validators.required);
      this.productDefinationGroup.get('plasticCodeRemove').updateValueAndValidity();
    }
  }



  addToList() {
    let data: any[] = this.productDefinationGroup.get('countryCurrencyListDB').value;

    for (let d of data) {
      if (d) {

        this.currencyCountryLists.add(d);
      }
    }
    if (data.length > 0) {
      this.productDefinationGroup.get('countryCurrencyList').clearValidators();
      this.productDefinationGroup.get('countryCurrencyList').updateValueAndValidity();
    }

  }
  addCard() {
    let data: any[] = this.productDefinationGroup.get('cardActivationGroupAdd').value;

    for (let d of data) {
      if (d) {

        this.cardActivationList.add(d);
      }
    }
    if (data.length > 0) {
      this.productDefinationGroup.get('cardActivationRemove').clearValidators();
      this.productDefinationGroup.get('cardActivationRemove').updateValueAndValidity();
    }

  }

  addPlasticCode() {
    let data: any[] = this.productDefinationGroup.get('plasticCodeAdd').value;
    for (let d of data) {
      if (d) {
        this.plasticCodeList.add(d);
      }
    }
    if (data.length > 0) {
      this.productDefinationGroup.get('plasticCodeRemove').clearValidators();
      this.productDefinationGroup.get('plasticCodeRemove').updateValueAndValidity();
    }
  }
  selectCurrency() {
    let productCurrency = this.productDefinationGroup.get("productCurrency").value;
    let data = this.productCurrency.filter(res => res.countryCurrency == productCurrency)[0];
    this.productDefinationGroup.patchValue({
      currencyDescription: data.countryCurrencyDesc
    })
  }

  getProgramGroupDefinition() {

    this.programDefinationService.getProgramDefinationGroup(this.productDefinationGroup.get('insertedBy').value)
      .subscribe((response) => {
        this.productDefination = JSON.parse(JSON.stringify(response)).data;
      })

  }

  getProgramGroupDefinitionCurrency() {

    this.programDefinationService.getCountryCurrencyGroup()
      .subscribe((response) => {
        this.productCurrency = JSON.parse(JSON.stringify(response)).data;
      })

  }

  getBinGroup() {

    this.programDefinationService.getBinGroupDefination(this.productDefinationGroup.get('insertedBy').value)
      .subscribe((response) => {
        this.binGroupDefination = JSON.parse(JSON.stringify(response)).data;
      })

  }


  addValidation() {
    this.productDefinationGroup.get('productCode').setValidators([Validators.required]);
    this.productDefinationGroup.get('productName').setValidators([Validators.required]);
    this.productDefinationGroup.get('productDescription').setValidators([Validators.required]);
    this.productDefinationGroup.get('pairCards').setValidators([Validators.required]);
    this.productDefinationGroup.get('applicationType').setValidators([Validators.required]);
    this.productDefinationGroup.get('programType').setValidators([Validators.required]);
    this.productDefinationGroup.get('programDescription').setValidators([Validators.required]);
    this.productDefinationGroup.get('productCurrency').setValidators([Validators.required]);
    this.productDefinationGroup.get('currencyDescription').setValidators([Validators.required]);
    this.productDefinationGroup.get('serviceCode').setValidators([Validators.required]);
    this.productDefinationGroup.get('pinTryLimit').setValidators([Validators.required]);
    this.productDefinationGroup.get('cardGenerationMethod').setValidators([Validators.required]);
    this.productDefinationGroup.get('pinDeliveryMethod').setValidators([Validators.required]);
    // this.productDefinationGroup.get('expiryMonth').setValidators([Validators.required]);
    // this.productDefinationGroup.get('expiryPeriod').setValidators([Validators.required]);
    this.productDefinationGroup.get('embossingTemplateId').setValidators([Validators.required]);
    this.productDefinationGroup.get('replacementTemplateId').setValidators([Validators.required]);
    this.productDefinationGroup.get('welcomeTemplate').setValidators([Validators.required]);
    //  this.productDefinationGroup.get('issuingCurrencyCountry').setValidators([Validators.required]);
    // this.productDefinationGroup.get('cardActivationGroup').setValidators([Validators.required]);
    this.productDefinationGroup.get('deliverMethod').setValidators([Validators.required]);
    this.productDefinationGroup.get('cardActivationGroup').setValidators([Validators.required]);
    this.productDefinationGroup.get('countryCurrencyListDB').setValidators([Validators.required]);
    //   this.productDefinationGroup.get('countryCurrencyList').setValidators([Validators.required]);
    this.productDefinationGroup.get('cardActivationGroupAdd').setValidators([Validators.required]);
    //   this.productDefinationGroup.get('cardActivationRemove').setValidators([Validators.required]);
    //   this.productDefinationGroup.get('plasticCode').setValidators([Validators.required]);
    this.productDefinationGroup.get('plasticCodeAdd').setValidators([Validators.required]);
    //   this.productDefinationGroup.get('plasticCodeRemove').setValidators([Validators.required]);
    this.productDefinationGroup.get('cardExpiryMethod').setValidators([Validators.required]);
    this.productDefinationGroup.get('binGroup').setValidators([Validators.required]);
    this.productDefinationGroup.get('binCurrency').setValidators([Validators.required]);
    this.productDefinationGroup.get('binGroupDescription').setValidators([Validators.required]);
    this.productDefinationGroup.get('binRangeFrom').setValidators([Validators.required]);
    this.productDefinationGroup.get('binrangeTo').setValidators([Validators.required]);
    //this.productDefinationGroup.get('variableExpiryPeriod').setValidators([Validators.required]);
    this.productDefinationGroup.get('cardEmbossing').setValidators([Validators.required]);

  }

  updateValidation() {
    this.productDefinationGroup.get('productCode').updateValueAndValidity();
    this.productDefinationGroup.get('productName').updateValueAndValidity();
    this.productDefinationGroup.get('productDescription').updateValueAndValidity();
    this.productDefinationGroup.get('pairCards').updateValueAndValidity();
    this.productDefinationGroup.get('applicationType').updateValueAndValidity();
    this.productDefinationGroup.get('programType').updateValueAndValidity();
    this.productDefinationGroup.get('programDescription').updateValueAndValidity();
    this.productDefinationGroup.get('productCurrency').updateValueAndValidity();
    this.productDefinationGroup.get('currencyDescription').updateValueAndValidity();
    this.productDefinationGroup.get('serviceCode').updateValueAndValidity();
    this.productDefinationGroup.get('pinTryLimit').updateValueAndValidity();
    this.productDefinationGroup.get('cardGenerationMethod').updateValueAndValidity();
    this.productDefinationGroup.get('pinDeliveryMethod').updateValueAndValidity();
    this.productDefinationGroup.get('expiryMonth').updateValueAndValidity();
    this.productDefinationGroup.get('expiryPeriod').updateValueAndValidity();
    this.productDefinationGroup.get('embossingTemplateId').updateValueAndValidity();
    this.productDefinationGroup.get('replacementTemplateId').updateValueAndValidity();
    this.productDefinationGroup.get('welcomeTemplate').updateValueAndValidity();
    //   this.productDefinationGroup.get('issuingCurrencyCountry').updateValueAndValidity();
    //   this.productDefinationGroup.get('cardActivationGroup').updateValueAndValidity();
    this.productDefinationGroup.get('countryCurrencyListDB').updateValueAndValidity();
    //    this.productDefinationGroup.get('countryCurrencyList').updateValueAndValidity();
    this.productDefinationGroup.get('cardActivationGroupAdd').updateValueAndValidity();
    //   this.productDefinationGroup.get('cardActivationRemove').updateValueAndValidity();
    //   this.productDefinationGroup.get('plasticCode').updateValueAndValidity();
    this.productDefinationGroup.get('plasticCodeAdd').updateValueAndValidity();
    //   this.productDefinationGroup.get('plasticCodeRemove').updateValueAndValidity();
    this.productDefinationGroup.get('binGroup').updateValueAndValidity();
    this.productDefinationGroup.get('binCurrency').updateValueAndValidity();
    this.productDefinationGroup.get('binGroupDescription').updateValueAndValidity();
    this.productDefinationGroup.get('binRangeFrom').updateValueAndValidity();
    this.productDefinationGroup.get('binrangeTo').updateValueAndValidity();
    this.productDefinationGroup.get('variableExpiryPeriod').updateValueAndValidity();
    this.productDefinationGroup.get('cardEmbossing').updateValueAndValidity();

  }

  removeValidation() {
    this.productDefinationGroup.get('productCode').clearValidators();
    this.productDefinationGroup.get('productName').clearValidators();
    this.productDefinationGroup.get('productDescription').clearValidators();
    this.productDefinationGroup.get('pairCards').clearValidators();
    this.productDefinationGroup.get('applicationType').clearValidators();
    this.productDefinationGroup.get('programType').clearValidators();
    this.productDefinationGroup.get('programDescription').clearValidators();
    this.productDefinationGroup.get('productCurrency').clearValidators();
    this.productDefinationGroup.get('currencyDescription').clearValidators();
    this.productDefinationGroup.get('serviceCode').clearValidators();
    this.productDefinationGroup.get('pinTryLimit').clearValidators();
    this.productDefinationGroup.get('cardGenerationMethod').clearValidators();
    this.productDefinationGroup.get('pinDeliveryMethod').clearValidators();
    this.productDefinationGroup.get('expiryMonth').clearValidators();
    this.productDefinationGroup.get('expiryPeriod').clearValidators();
    this.productDefinationGroup.get('embossingTemplateId').clearValidators();
    this.productDefinationGroup.get('replacementTemplateId').clearValidators();
    this.productDefinationGroup.get('welcomeTemplate').clearValidators();
    //  this.productDefinationGroup.get('issuingCurrencyCountry').clearValidators();
    //  this.productDefinationGroup.get('cardActivationGroup').clearValidators();
    this.productDefinationGroup.get('countryCurrencyListDB').clearValidators();
    //   this.productDefinationGroup.get('countryCurrencyList').clearValidators();
    this.productDefinationGroup.get('cardActivationGroupAdd').clearValidators();
    //    this.productDefinationGroup.get('cardActivationRemove').clearValidators();
    //   this.productDefinationGroup.get('plasticCode').clearValidators();
    this.productDefinationGroup.get('plasticCodeAdd').clearValidators();
    //    this.productDefinationGroup.get('plasticCodeRemove').clearValidators();
    this.productDefinationGroup.get('binGroup').clearValidators();
    this.productDefinationGroup.get('binCurrency').clearValidators();
    this.productDefinationGroup.get('binGroupDescription').clearValidators();
    this.productDefinationGroup.get('binRangeFrom').clearValidators();
    this.productDefinationGroup.get('binrangeTo').updateValueAndValidity();
    this.productDefinationGroup.get('variableExpiryPeriod').clearValidators();
    this.productDefinationGroup.get('cardEmbossing').clearValidators();
  }
  addToTable() {

    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.confirmForm = null;
    console.log(this.productDefinationGroup)
    if (this.productDefinationGroup.invalid)
      return;
    let groupvalue = this.productDefinationGroup.value
    const iterator = this.currencyCountryLists.values();
    const cardIterator = this.cardActivationList.values();
    let selectedCountries: any[] = [];
    let issuingCountries: any[] = [];
    for (let r = 0; r < this.currencyCountryLists.size; r++) {
      selectedCountries.push(iterator.next().value)
    }
    groupvalue.countryCurrencyList = selectedCountries;

    for (let r = 0; r < this.cardActivationList.size; r++) {
      issuingCountries.push(cardIterator.next().value)
    }
    groupvalue.countryCurrencyList = issuingCountries;
    this.confirmForm = [];
    this.add(
      groupvalue.productCode,
      groupvalue.productName,
      groupvalue.productDescription,
      groupvalue.pairCards,
      groupvalue.applicationType,
      groupvalue.programType,
      groupvalue.programDescription,
      groupvalue.productCurrency,
      groupvalue.currencyDescription,
      groupvalue.serviceCode,
      groupvalue.pinTryLimit,
      groupvalue.cardGenerationMethod,
      groupvalue.pinDeliveryMethod,
      groupvalue.expiryMonth,
      groupvalue.expiryPeriod,
      groupvalue.embossingTemplateId,
      groupvalue.replacementTemplateId,
      groupvalue.welcomeTemplate,
      groupvalue.issuingCurrencyCountry,
      groupvalue.cardActivationGroup,
      groupvalue.deliverMethod,
      groupvalue.countryCurrencyListDB,
      groupvalue.countryCurrencyList,
      groupvalue.cardActivationGroupAdd,
      groupvalue.cardActivationRemove,
      groupvalue.plasticCode,
      groupvalue.plasticCodeAdd,
      groupvalue.plasticCodeRemove,
      groupvalue.cardExpiryMethod,
      groupvalue.binGroup,
      groupvalue.binCurrency,
      groupvalue.binGroupDescription,
      groupvalue.binRangeFrom,
      groupvalue.binrangeTo,
      groupvalue.variableExpiryPeriod,
      groupvalue.cardEmbossing,
      this.getProgramCode_(groupvalue.programType),
      this.getBinGroup_(groupvalue.binGroup)
    )
    this.submitted = false;
    this.confirmForm = this.productDefinationGroup.value;
    this.resetGroupEntery();
    console.log(this.confirmForm);



  }

  resetGroupEntery() {
    this.productDefinationGroup.patchValue({
      productCode: '',
      productName: '',
      productDescription: '',
      pairCards: '',
      applicationType: '',
      programType: '',
      programDescription: '',
      productCurrency: '',
      currencyDescription: '',
      serviceCode: '',
      pinTryLimit: '',
      cardGenerationMethod: '',
      cardEmbossing: '',
      pinDeliveryMethod: '',
      cardExpiryMethod: '',
      expiryMonth: '',
      expiryPeriod: '',
      variableExpiryPeriod: '',
      embossingTemplateId: '',
      replacementTemplateId: '',
      welcomeTemplate: '',
      issuingCurrencyCountry: '',
      cardActivationGroup: '',
      deliverMethod: '',
      countryCurrencyListDB: '',
      countryCurrencyList: '',
      cardActivationGroupAdd: '',
      cardActivationRemove: '',
      binGroup: '',
      binCurrency: '',
      binGroupDescription: '',
      binRangeFrom: '',
      binrangeTo: '',
      plasticCode: '',
      plasticCodeAdd: '',
      plasticCodeRemove: '',

    })
  }
  add(
    productCode: any,
    productName: any,
    productDescription: any,
    pairCards: any,
    applicationType: any,
    programType: any,
    programDescription: any,
    productCurrency: any,
    currencyDescription: any,
    serviceCode: any,
    pinTryLimit: any,
    cardGenerationMethod: any,
    pinDeliveryMethod: any,
    expiryMonth: any,
    expiryPeriod: any,
    embossingTemplateId: any,
    replacementTemplateId: any,
    welcomeTemplate: any,
    issuingCurrencyCountry: any,
    cardActivationGroup: any,
    deliverMethod: any,
    countryCurrencyListDB: any,
    countryCurrencyList: any,
    cardActivationGroupAdd: any,
    cardActivationRemove: any,
    plasticCode: any,
    plasticCodeAdd: any,
    plasticCodeRemove: any,
    cardExpiryMethod: any,
    binGroup: any,
    binCurrency: any,
    binGroupDescription: any,
    binRangeFrom: any,
    binrangeTo: any,
    variableExpiryPeriod: any,
    cardEmbossing: any,
    programCode: any,
    binGroupId: any
  ) {
    console.log(countryCurrencyList);
    console.log(countryCurrencyListDB);
    console.log(cardActivationGroupAdd);
    console.log(cardActivationRemove);
    console.log(plasticCodeAdd);
    console.log(plasticCodeRemove);


    console.log(this.getStrings(countryCurrencyList));
    console.log(this.getStrings(countryCurrencyListDB));
    console.log(this.getStrings(cardActivationGroupAdd));
    console.log(this.getStrings(cardActivationRemove));
    console.log(this.getStrings(plasticCodeAdd));
    console.log(this.getStrings(plasticCodeRemove));

    (<FormArray>this.productDefinationGroup.get("productDefinationArrayGroup")).push(this.addGroup(productCode,
      productName,
      productDescription,
      pairCards,
      applicationType,
      programType,
      programDescription,
      productCurrency,
      currencyDescription,
      serviceCode,
      pinTryLimit,
      cardGenerationMethod,
      pinDeliveryMethod,
      expiryMonth,
      expiryPeriod,
      embossingTemplateId,
      replacementTemplateId,
      welcomeTemplate,
      issuingCurrencyCountry,
      cardActivationGroup,
      deliverMethod,
      countryCurrencyListDB,
      countryCurrencyList,
      cardActivationGroupAdd,
      cardActivationRemove,
      plasticCode,
      plasticCodeAdd,
      plasticCodeRemove,
      cardExpiryMethod,
      binGroup,
      binCurrency,
      binGroupDescription,
      binRangeFrom,
      binrangeTo,
      variableExpiryPeriod,
      cardEmbossing,
      programCode,
      binGroupId));
  }
  addGroup(
    productCode: any,
    productName: any,
    productDescription: any,
    pairCards: any,
    applicationType: any,
    programType: any,
    programDescription: any,
    productCurrency: any,
    currencyDescription: any,
    serviceCode: any,
    pinTryLimit: any,
    cardGenerationMethod: any,
    pinDeliveryMethod: any,
    expiryMonth: any,
    expiryPeriod: any,
    embossingTemplateId: any,
    replacementTemplateId: any,
    welcomeTemplate: any,
    issuingCurrencyCountry: any,
    cardActivationGroup: any,
    deliverMethod: any,
    countryCurrencyListDB: any,
    countryCurrencyList: any,
    cardActivationGroupAdd: any,
    cardActivationRemove: any,
    plasticCode: any,
    plasticCodeAdd: any,
    plasticCodeRemove: any,
    cardExpiryMethod: any,
    binGroup: any,
    binCurrency: any,
    binGroupDescription: any,
    binRangeFrom: any,
    binrangeTo: any,
    variableExpiryPeriod: any,
    cardEmbossing: any,
    programCode: any,
    binGroupId: any): FormGroup {

    return this.formBuilder.group({
      productCode: [productCode],
      productName: [productName],
      productDescription: [productDescription],
      pairCards: [pairCards],
      applicationType: [applicationType],
      programType: [programType],
      programDescription: [programDescription],
      productCurrency: [productCurrency],
      currencyDescription: [currencyDescription],
      serviceCode: [serviceCode],
      pinTryLimit: [pinTryLimit],
      cardGenerationMethod: [cardGenerationMethod],
      cardExpiryMethod: [cardExpiryMethod],
      deliverMethod: [deliverMethod],
      expiryMonth: [expiryMonth],
      binGroup: [binGroup],
      binCurrency: [binCurrency],
      binGroupDescription: [binGroupDescription],
      binRangeFrom: [binRangeFrom],
      binrangeTo: [binrangeTo],
      pinDeliveryMethod: [pinDeliveryMethod],
      expiryPeriod: [expiryPeriod],
      embossingTemplateId: [embossingTemplateId],
      replacementTemplateId: [replacementTemplateId],
      welcomeTemplate: [welcomeTemplate],
      issuingCurrencyCountry: [issuingCurrencyCountry],
      countryCurrencyListDB: [countryCurrencyListDB],
      countryCurrencyList: [countryCurrencyList],
      cardActivationGroupAdd: [cardActivationGroupAdd],
      cardActivationRemove: [cardActivationRemove],
      plasticCodeAdd: [plasticCodeAdd],
      plasticCodeRemove: [plasticCodeRemove],
      insertedBy: [sessionStorage.getItem('user'), Validators.required],
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: null,
      modifiedDate: null,
      plasticCode: [plasticCode],
      variableExpiryPeriod: [variableExpiryPeriod],
      cardEmbossing: [cardEmbossing],
      programCode: programCode,
      binGroupId: binGroupId
    })
  }


  getStrings(value: any[]): string {
    let data = "";
    for (let d of value) {
      data += d + ","
    }
    return data;
  }

  remove(i) {
    this.confirmForm = null;
    (<FormArray>this.productDefinationGroup.get("productDefinationArrayGroup")).removeAt(i);

    if ((<FormArray>this.productDefinationGroup.get("productDefinationArrayGroup")).length > 0)
      this.confirmForm = this.productDefinationGroup.value;


  }

  confirmProductDefinationSetupDetails() {
    if (this.confirmForm == null) {
      this.success = "Please add Product Detail";
      $('#error').show('fast');
      return;
    }

    // this.productService.saveProductdefination(this.productDefinationGroup.get('productDefinationArrayGroup').value)
    //   .subscribe(
    //     (response) => {
    //       console.log(response);

    //     },

    //   )
  }

  addValidationForBinGroup() {
    this.productDefinationGroup.get('binCurrency').setValidators([Validators.required]);
    this.productDefinationGroup.get('binCurrency').updateValueAndValidity()
    this.productDefinationGroup.get('binGroupDescription').setValidators([Validators.required]);
    this.productDefinationGroup.get('binGroupDescription').updateValueAndValidity()
    this.productDefinationGroup.get('binRangeFrom').setValidators([Validators.required]);
    this.productDefinationGroup.get('binRangeFrom').updateValueAndValidity()
    this.productDefinationGroup.get('binrangeTo').setValidators([Validators.required]);
    this.productDefinationGroup.get('binrangeTo').updateValueAndValidity()
  }

  removeValidationForBinGroup() {
    this.productDefinationGroup.get('binCurrency').clearValidators()
    this.productDefinationGroup.get('binCurrency').updateValueAndValidity()
    this.productDefinationGroup.get('binGroupDescription').clearValidators()
    this.productDefinationGroup.get('binGroupDescription').updateValueAndValidity()
    this.productDefinationGroup.get('binRangeFrom').clearValidators()
    this.productDefinationGroup.get('binRangeFrom').updateValueAndValidity()
    this.productDefinationGroup.get('binrangeTo').clearValidators()
    this.productDefinationGroup.get('binrangeTo').updateValueAndValidity()
  }
  selectCriteria() {
    this.isFixedDate = false;
    this.isVariableDate = false;
    let criteria = this.productDefinationGroup.get('cardExpiryMethod').value.toString();
    if (criteria) {
      switch (criteria) {
        case "Fixed Date": {
          this.isFixedDate = true;
          this.isVariableDate = false;
          this.productDefinationGroup.get('expiryMonth').setValidators([Validators.required]);
          this.productDefinationGroup.get('variableExpiryPeriod').clearValidators()

          this.productDefinationGroup.get('expiryMonth').updateValueAndValidity()
          this.productDefinationGroup.get('variableExpiryPeriod').updateValueAndValidity();

        }
          break;

        case "Variable Method": {
          this.isFixedDate = false;
          this.isVariableDate = true;
          this.productDefinationGroup.get('variableExpiryPeriod').setValidators([Validators.required]);
          this.productDefinationGroup.get('expiryMonth').clearValidators()


          this.productDefinationGroup.get('expiryMonth').updateValueAndValidity()
          this.productDefinationGroup.get('variableExpiryPeriod').updateValueAndValidity();
        }
          break;
        default: {
          this.isFixedDate = false;
          this.isVariableDate = false;
          this.productDefinationGroup.get('variableExpiryPeriod').clearValidators()
          this.productDefinationGroup.get('expiryMonth').clearValidators()


          this.productDefinationGroup.get('expiryMonth').updateValueAndValidity()
          this.productDefinationGroup.get('variableExpiryPeriod').updateValueAndValidity();
        }
          break;
      }
    } else {
      this.productDefinationGroup.get('variableExpiryPeriod').clearValidators()
      this.productDefinationGroup.get('expiryMonth').clearValidators()


      this.productDefinationGroup.get('expiryMonth').updateValueAndValidity()
      this.productDefinationGroup.get('variableExpiryPeriod').updateValueAndValidity();
    }
  }

  saveProductDefination() {
    if (this.confirmForm == null) {
      this.success = "Please add Product Detail";
      $('#error').show('fast');
      return;
    }
    // this.removeValidation();
    // this.updateValidation();

    if ((<FormArray>this.productDefinationGroup.get('productDefinationArrayGroup')).length > 0) {

      this.productService.saveProductdefination(this.productDefinationGroup.get('productDefinationArrayGroup').value)
        .subscribe((response) => {

          while ((<FormArray>this.productDefinationGroup.get('productDefinationArrayGroup')).length > 0) {
            (<FormArray>this.productDefinationGroup.get('productDefinationArrayGroup')).removeAt(0);
          }
          this.resetGroupEntery()
          this.confirmForm = null;
          this.enable = true;
          this.success = response.message
          $('#success').show('fast')
          this.dataEntry = true;
          this.confirm = false;
        },
          (error) => {
            this.success = error.error.message;
            $('#error').show('fast');
            return;

          })
    } else {
      this.success = 'Please add Product definition details';
      $('#error').show('fast');
      return;
    }

  }

  closeProductDefination() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

  getProgramCode_(programType: any): String {
    return this.productDefination.filter(res => res.programDefinitionid == programType)[0].programCode;
  }

  getBinGroup_(binGroupId: any): String {
    console.log(this.binGroupDefination.filter(res => res.binGroupId == binGroupId)[0]);
    
    return this.binGroupDefination.filter(res => res.binGroupId == binGroupId)[0].binGroupCode;
  }

}

