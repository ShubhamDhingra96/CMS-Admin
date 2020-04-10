import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CountryStateCityService } from 'src/app/services/country-state-city.service';
import { ClientService } from 'src/app/services/client.service';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { environment } from 'src/environments/environment.prod';
import { Pattern } from '@amcharts/amcharts4/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';



export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}


@Component({
  selector: 'app-add-register',
  templateUrl: './add-register.component.html',
  styleUrls: ['./add-register.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class AddRegisterComponent implements OnInit {
  //Accordion
  isFirstOpen = true;

  private data: any = null;
  private registerCompany: FormGroup;
  private countries: any[] = this.fetchCountry();
  private states: any[] = null;
  private cities: any[] = null;
  private _countries: any[] = this.fetchCountry_();
  private _states: any[] = null;
  private _cities: any[] = null;
  private submitted = false;
  private show: boolean = false;
  private showTable: boolean = false

  private companyCheck: boolean = false;
  private success: string = "";


  constructor(private dataService: DataService, private formBuilder: FormBuilder, private countryService: CountryStateCityService, private clientService: ClientService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }

    $(document).ready(function () {

      $('.report-child').show();
      $('.reports').on('click', function () {
        $(this).toggleClass('active-menuitem');
        $('.report-child').toggle('fast');
      });


      $('.close').on('click', function () {
        $("#message").hide('fast');
      });

      $('#close').on('click', function () {
        $("#message").hide('fast');
      })

      $('input').focus(function () {
        $(this).parents('.form-group').addClass('focused');
      });

      $('input').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
          $(this).removeClass('filled');
          $(this).parents('.form-group').removeClass('focused');
        } else {
          $(this).addClass('filled');
        }
      })
    });




  }



  ngOnInit() {
    this.dataService.getFlag(true);
    this.registerCompany = this.formBuilder.group({
      cmsCompanyName: ['', [Validators.required, Validators.pattern(environment.entity)]],
      cmsCompanylocation: [''],
      cmsCompanyAddress1: ['', [Validators.required, Validators.pattern(environment.address)]],
      cmsCompanyAddress2: ['', [Validators.pattern(environment.address)]],
      cmsCompanyCity: ['', [Validators.required]],
      cmsCompanyState: ['', [Validators.required]],
      cmsCompanyCountry: ['', [Validators.required]],
      cmsCompanyCode: [''],
      cmsCompanyPincode: ['', [Validators.required, Validators.pattern(environment.pincodeRegex)]],
      cmsCompanyPhone1: ['', [Validators.required]],
      clientID: [''],
      companyid: [''],
      cmsCompanyCPFname: [''],
      cmsCompanyCPLname: [''],
      cmsCompanyCPMailingAddress: [''],
      cmsCompanyCPTelOff: [''],
      cmsCompanyCPTelRes: [''],
      cmsCompanyCPEmail: [''],
      cmsCompanyCPMobile: [''],
      cmsCompanyCPfax: [''],
      cmsCompanyCPlocation: [''],
      cmsCompanyCPCity: [''],
      cmsCompanyCPState: [''],
      cmsCompanyCPCountry: [''],
      cmsCompanyCPPincode: [''],
      contactPersons: this.formBuilder.array([])
    })
    this.setInfo();

  }
  checked(i) {
    (<FormArray>this.registerCompany.get('contactPersons')).at(i).patchValue({
      selected: true
    });



  }
  addvalidation() {
    this.registerCompany.get('cmsCompanyCPFname').setValidators([Validators.required, Validators.pattern(environment.singleKnown)]);
    this.registerCompany.get('cmsCompanyCPLname').setValidators([Validators.required, Validators.pattern(environment.singleKnown)]);
    this.registerCompany.get('cmsCompanyCPMailingAddress').setValidators([Validators.required, Validators.pattern(environment.address)]);
    this.registerCompany.get('cmsCompanyCPTelOff').setValidators([Validators.required, Validators.pattern(environment.phone)]);
    this.registerCompany.get('cmsCompanyCPTelRes').setValidators([Validators.required, Validators.pattern(environment.phone)]);
    this.registerCompany.get('cmsCompanyCPEmail').setValidators([Validators.required, Validators.pattern(environment.email)]);
    this.registerCompany.get('cmsCompanyCPMobile').setValidators([Validators.required, Validators.pattern(environment.mobile)]);
    this.registerCompany.get('cmsCompanyCPCity').setValidators([Validators.required]);
    this.registerCompany.get('cmsCompanyCPState').setValidators([Validators.required]);
    this.registerCompany.get('cmsCompanyCPCountry').setValidators([Validators.required]);
    this.registerCompany.get('cmsCompanyCPPincode').setValidators([Validators.required, Validators.pattern(environment.pincodeRegex)]);
  }

  updateValidation() {
    this.registerCompany.get('cmsCompanyCPFname').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPLname').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPMailingAddress').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPTelOff').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPTelRes').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPEmail').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPMobile').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPCity').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPState').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPCountry').updateValueAndValidity();
    this.registerCompany.get('cmsCompanyCPPincode').updateValueAndValidity();
  }

  removeValidation() {
    this.registerCompany.get('cmsCompanyCPFname').clearValidators();
    this.registerCompany.get('cmsCompanyCPLname').clearValidators();
    this.registerCompany.get('cmsCompanyCPMailingAddress').clearValidators();
    this.registerCompany.get('cmsCompanyCPTelOff').clearValidators();
    this.registerCompany.get('cmsCompanyCPTelRes').clearValidators();
    this.registerCompany.get('cmsCompanyCPEmail').clearValidators();
    this.registerCompany.get('cmsCompanyCPMobile').clearValidators();
    this.registerCompany.get('cmsCompanyCPCity').clearValidators();
    this.registerCompany.get('cmsCompanyCPState').clearValidators();
    this.registerCompany.get('cmsCompanyCPCountry').clearValidators();
    this.registerCompany.get('cmsCompanyCPPincode').clearValidators();
  }

  addPerson() {
    this.addvalidation();
    this.updateValidation();
    this.submitted = true;

    if (this.registerCompany.invalid) {
      this.show = true;
      return;
    }

    let cmsCompanyCPFname = this.registerCompany.get("cmsCompanyCPFname").value;
    let cmsCompanyCPLname = this.registerCompany.get("cmsCompanyCPLname").value;
    let cmsCompanyCPMailingAddress = this.registerCompany.get("cmsCompanyCPMailingAddress").value;
    let cmsCompanyCPTelOff = this.registerCompany.get("cmsCompanyCPTelOff").value;
    let cmsCompanyCPTelRes = this.registerCompany.get("cmsCompanyCPTelRes").value;
    let cmsCompanyCPEmail = this.registerCompany.get("cmsCompanyCPEmail").value;
    let cmsCompanyCPMobile = this.registerCompany.get("cmsCompanyCPMobile").value;
    let cmsCompanyCPfax = this.registerCompany.get("cmsCompanyCPfax").value;
    let cmsCompanyCPlocation = this.registerCompany.get("cmsCompanyCPlocation").value;
    let cmsCompanyCity = this.registerCompany.get("cmsCompanyCPCity").value;
    let cmsCompanyState = this.registerCompany.get("cmsCompanyCPState").value;
    let cmsCompanyCountry = this.registerCompany.get("cmsCompanyCPCountry").value;
    let cmsCompanyCPPincode = this.registerCompany.get("cmsCompanyCPPincode").value;
    (<FormArray>this.registerCompany.get('contactPersons')).push(this.addContactPersion(
      cmsCompanyCPFname, cmsCompanyCPLname, cmsCompanyCPMailingAddress,
      cmsCompanyCPTelOff, cmsCompanyCPTelRes, cmsCompanyCPEmail, cmsCompanyCPMobile,
      cmsCompanyCPfax, cmsCompanyCPlocation, cmsCompanyCity, cmsCompanyState,
      cmsCompanyCountry, cmsCompanyCPPincode, false
    ));
    this.submitted = false;
    this.resetPerson();

    this.showTable = true;
  }
  resetPerson() {
    this.registerCompany.patchValue({
      cmsCompanyCPFname: '',
      cmsCompanyCPLname: '',
      cmsCompanyCPMailingAddress: '',
      cmsCompanyCPTelOff: '',
      cmsCompanyCPTelRes: '',
      cmsCompanyCPEmail: '',
      cmsCompanyCPMobile: '',
      cmsCompanyCPfax: '',
      cmsCompanyCPlocation: '',
      cmsCompanyCPCity: '',
      cmsCompanyCPState: '',
      cmsCompanyCPCountry: '',
      cmsCompanyCPPincode: ''

    })
    this.removeValidation();
    this.updateValidation();
  }

  addContactPersion(cmsCompanyCPFname, cmsCompanyCPLname, cmsCompanyCPMailingAddress,
    cmsCompanyCPTelOff, cmsCompanyCPTelRes, cmsCompanyCPEmail, cmsCompanyCPMobile,
    cmsCompanyCPfax, cmsCompanyCPlocation, cmsCompanyCity, cmsCompanyState,
    cmsCompanyCountry, cmsCompanyCPPincode, selected
  ): FormGroup {
    return this.formBuilder.group({
      cmsCompanyCPfullName: cmsCompanyCPFname + " " + cmsCompanyCPLname,
      cmsCompanyCPFname: cmsCompanyCPFname,
      cmsCompanyCPLname: cmsCompanyCPLname,
      cmsCompanyCPMailingAddress: cmsCompanyCPMailingAddress,
      cmsCompanyCPTelOff: cmsCompanyCPTelOff,
      cmsCompanyCPTelRes: cmsCompanyCPTelRes,
      cmsCompanyCPEmail: cmsCompanyCPEmail,
      cmsCompanyCPMobile: cmsCompanyCPMobile,
      cmsCompanyCPfax: cmsCompanyCPfax,
      cmsCompanyCPlocation: cmsCompanyCPlocation,
      cmsCompanyCity: cmsCompanyCity,
      cmsCompanyState: cmsCompanyState,
      cmsCompanyCountry: cmsCompanyCountry,
      cmsCompanyCPPincode: cmsCompanyCPPincode,
      selected: selected
    })
  }

  fetchCountry(): any {
    this.countryService.getCountries().subscribe
      ((response) => {
        return this.countries = JSON.parse(JSON.stringify(response)).countries;

      })
  }
  fetchCountry_(): any {
    this.countryService.getCountries().subscribe
      ((response) => {
        return this._countries = JSON.parse(JSON.stringify(this.countries));      })
  }

  selectState() {
    let countryId = this.registerCompany.get('cmsCompanyCountry').value;
    if (countryId) {
      this.states = [];
      this.countryService.getStatesAndCities(Number(countryId)).subscribe
        ((response) => {
          let data = JSON.parse(JSON.stringify(response));
          for (let state of data.states) {
            if (state)
              this.states.push(state);
          }

        })

    }
  }




  selectCPState() {

    let countryId = this.registerCompany.get('cmsCompanyCPCountry').value;
    if (countryId) {
      this._states = [];
      this.countryService.getStatesAndCities(Number(countryId)).subscribe
        ((response) => {
          let data = JSON.parse(JSON.stringify(response));
          for (let state of data.states) {
            if (state)
              this._states.push(state);
          }

        })

    }
  }

  selectCity() {
    this.cities = [];
    if (this.registerCompany.get('cmsCompanyState').value) {
      let data = this.states.filter(item => item.cities.filter(res => res.stateId == this.registerCompany.get('cmsCompanyState').value))
      for (let city of data) {
        if (city)
          if (city.cities[0])
            this.cities.push(city.cities[0])
      }

    }
  }

  selectCPCity() {
    this._cities = [];
    if (this.registerCompany.get('cmsCompanyCPState').value) {
      let data = this._states.filter(item => item.cities.filter(res => res.stateId == this.registerCompany.get('cmsCompanyCPState').value))
      for (let city of data) {
        if (city)
          if (city.cities[0])
            this._cities.push(city.cities[0])
      }

    }
  }



  save() {
    this.removeValidation();
    this.updateValidation();
    this.submitted = true;
    if (this.registerCompany.invalid) {
      this.show = true;
      return;
    }
    this.clientService.ckeckEntity(this.registerCompany.get('cmsCompanyName').value)
      .subscribe((res) => {

        let response = JSON.parse(JSON.stringify(res));
        if (response.data) {
          this.success = "Entity you have entered is already exist.";
          $("#error").show('fast');
          this.companyCheck = true;
          return;
        } else {

          if (this.registerCompany.invalid) {
            this.show = true;
            return;
          }

          if (this.registerCompany.valid) {
            let data = JSON.parse(JSON.stringify(this.registerCompany.value));
            data.cmsCompanyCity = this.getCityName(data.cmsCompanyCity);
            data.cmsCompanyState = this.getStateName(data.cmsCompanyState);
            data.cmsCompanyCountry = this.getCountryName(data.cmsCompanyCountry);
            data.contactPersons = data.contactPersons.filter(res => res.selected === true);

            for (let x = 0; x < data.contactPersons.length; x++) {
              if (data.contactPersons[x].selected) {
                data.contactPersons[x].cmsCompanyCity = this.getCityName_(data.contactPersons[x].cmsCompanyCity);
                data.contactPersons[x].cmsCompanyState = this.getStateName_(data.contactPersons[x].cmsCompanyState);
                data.contactPersons[x].cmsCompanyCountry = this.getCountryName_(data.contactPersons[x].cmsCompanyCountry)
              }
            }

            this.clientService.save(data)
              .subscribe(
                (response) => {
                  this.showTable = false;
                  this.registerCompany.reset();
                  this.setInfo();
                  this.submitted = false;
                  this.success = response.message;
                  $("#success").show('fast');

                },
                (error) => {
                  this.success = JSON.parse(JSON.stringify(error)).error.message;
                  $("#error").show('fast')
                  return;
                }
              )
          }
        }

      })


  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

  update() {
    if (this.registerCompany.valid) {
      this.clientService.update(JSON.parse(JSON.stringify(this.registerCompany.value)))
        .subscribe(
          (response) => {
            this.registerCompany.reset();
            this.setInfo();


          }
        )
    }
  }

  view() {
    if (this.registerCompany.valid) {
      this.clientService.view(this.registerCompany.get('companyid').value)
        .subscribe(
          (response) => {
            this.setInfo();
          }
        )
    }
  }

  setInfo() {
    let clientID = sessionStorage.getItem('role');
    if (clientID) {
      this.registerCompany.patchValue({ clientID: clientID });
    }
  }
  getCountryName(countryID: any): String {

    return this.countries.filter(res => res.countryId == countryID)[0].countryName;
  }
  getStateName(stateid: any): String {
    return this.states.filter(res => res.stateId == stateid)[0].stateName;
  }
  getCityName(cityid: any): String {
    return this.cities.filter(res => res.cityId == cityid)[0].cityName;
  }

  getCountryName_(countryID: any): String {

    return this._countries.filter(res => res.countryId == countryID)[0].countryName;
  }
  getStateName_(stateid: any): String {
    return this._states.filter(res => res.stateId == stateid)[0].stateName;
  }
  getCityName_(cityid: any): String {
    return this._cities.filter(res => res.cityId == cityid)[0].cityName;
  }


}
