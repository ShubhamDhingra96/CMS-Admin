import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsagesService } from 'src/app/services/usages.service';
import { CountryStateCityService } from 'src/app/services/country-state-city.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-country-group',
  templateUrl: './country-group.component.html',
  styleUrls: ['./country-group.component.css']
})
export class CountryGroupComponent implements OnInit {
  private countryGroupForm: FormGroup;

  private countries: any[] = this.fetchCountry();
  private countriesList = new Set();
  private enterData: boolean = true;
  private confirm: boolean = false;
  private submitted: boolean = false;
  private selected: boolean = false;

  private groupCode: string;
  private groupName: string;
  private groupDescription: string;
  private groupSelectedCompanies: string;
  private success: string = "";
  private isgroupCodeExist: boolean = false;

  constructor(private formbuilder: FormBuilder, private usageService: UsagesService, private countryService: CountryStateCityService, private dataService: DataService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  ngOnInit() {
    this.dataService.getFlag(true)
    this.countryGroupForm = this.formbuilder.group({
      groupCode: ['', [Validators.required, Validators.pattern(environment.letterNumber)]],
      groupName: ['', [Validators.required, Validators.pattern(environment.letterNumber)]],
      groupDescription: ['', [Validators.required, Validators.pattern(environment.address)]],
      groupCompanyListS: '',
      groupId: '',
      groupCompanyList: ['', [Validators.required]],
      insertedBy: [sessionStorage.getItem('user'), Validators.required],
      modifiedBy: '',
      insertedDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedDate: ''
    })
  }

  fetchCountry(): any {
    this.countryService.getCountries().subscribe
      ((response) => {
        return this.countries = JSON.parse(JSON.stringify(response)).countries;
      })
  }


  confirmForm() {

    this.submitted = true;
    let data = this.countryGroupForm.value
    const iterator = this.countriesList.values();
    let selectedCountries: any[] = [];
    for (let r = 0; r < this.countriesList.size; r++) {
      selectedCountries.push(iterator.next().value)

    }
    data.groupCompanyList = selectedCountries;
    if (selectedCountries.length > 0) {
      this.countryGroupForm.get('groupCompanyList').clearValidators();
      this.countryGroupForm.get('groupCompanyList').updateValueAndValidity();
    }

    if (this.countryGroupForm.invalid)
      return;

    this.usageService.checkCountryGroup(this.countryGroupForm.get('insertedBy').value, this.countryGroupForm.get('groupCode').value)
      .subscribe(
        (response) => {
          let dataRes = JSON.parse(JSON.stringify(response)).data;
          if (dataRes) {
            $("input[name='groupCode']").css('border', '1px solid red');
            
            this.isgroupCodeExist = true;
            return;
          }
          this.confirm = true;
          this.enterData = false;
          

          this.groupCode = data.groupCode;
          this.groupName = data.groupName;
          this.groupDescription = data.groupDescription;
          this.groupSelectedCompanies = data.groupCompanyList;
        },
        (error) => {
          this.confirm = true;
          this.enterData = false;

          this.groupCode = data.groupCode;
          this.groupName = data.groupName;
          this.groupDescription = data.groupDescription;
          this.groupSelectedCompanies = data.groupCompanyList;
        }
      )




  }

  save() {
    this.submitted = true;
    let data = this.countryGroupForm.value
    const iterator = this.countriesList.values();
    let selectedCountries: any[] = [];
    for (let r = 0; r < this.countriesList.size; r++) {
      selectedCountries.push(iterator.next().value)
    }
    data.groupCompanyList = selectedCountries;

    this.usageService.save(data)
      .subscribe((response) => {
        this.success = JSON.parse(JSON.stringify(response)).message;
        this.confirm = false;
        this.enterData = true;
        this.submitted = false;
        this.cancel()
        this.submitted = false;
        $("#success").show('fast');
        this.reset();
      }, (error) => {
        this.success = JSON.parse(JSON.stringify(error)).error.message;
        $("#error").show('fast')
      })
  }
  cancel() {
    this.confirm = false;
    this.enterData = true;
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
    this.submitted = false;
  }
  isInput() {
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
  }
  reset() {
    this.countryGroupForm = this.formbuilder.group({
      groupCode: ['', [Validators.required, Validators.pattern(environment.letterNumber)]],
      groupName: ['', [Validators.required, Validators.pattern(environment.letterNumber)]],
      groupDescription: ['', [Validators.required, Validators.pattern(environment.address)]],
      groupCompanyListS: '',
      groupId: '',
      groupCompanyList: ['', [Validators.required]],
      insertedBy: [sessionStorage.getItem('user'), Validators.required],
      modifiedBy: '',
      insertedDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedDate: ''
    })
    this.countriesList = new Set();
    this.isgroupCodeExist = false;
  }

  add() {
    let data: any[] = this.countryGroupForm.get('groupCompanyListS').value;
    for (let d of data) {
      if (d) {
        this.countriesList.add(d);
      }
    }
    if (data.length > 0) {
      this.countryGroupForm.get('groupCompanyList').clearValidators();
      this.countryGroupForm.get('groupCompanyList').updateValueAndValidity();
    }

  }
  remove() {
    let data: any[] = this.countryGroupForm.get('groupCompanyList').value;
    for (let d of data) {
      if (d) {
        this.countriesList.delete(d);
      }
    }

    if (this.countriesList.size == 0) {
      this.countryGroupForm.patchValue({ groupCompanyList: '' })
      this.countryGroupForm.get('groupCompanyList').setValidators(Validators.required);
      this.countryGroupForm.get('groupCompanyList').updateValueAndValidity();

    }
  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

}
