import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { CountryStateCityService } from 'src/app/services/country-state-city.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-corporate-user',
  templateUrl: './corporate-user.component.html',
  styleUrls: ['./corporate-user.component.css']
})
export class CorporateUserComponent implements OnInit {

  private isEntity: boolean = true;
  private createUser: boolean = false;
  private entity: any[] = [];
  private selectEntityForm: FormGroup;
  private client: any = {};
  private errorMessage: string;
  private show: boolean = false;
  private entityName: string;
  private entityCountry: string;
  private entityState: string;
  private entityCity: string;
  private isConfirm = false;
  private userids: string;
  private countries: any[] = this.fetchCountry();
  private states: any[] = null;
  private cities: any[] = null;
  private submitted=false;


  private userid: string;
  private employeeno: string;
  private firstname: string;
  private lastname: string;
  private designation: string;
  private passport: string;
  private telephoneRes: string;
  private telephoneOff: string;
  private mobile: string;
  private fax: string;
  private country: string;
  private state: string;
  private city: string;
  private region: string;
  private postcode: string;
  private email: string;
  private currencyAgent: string;
  private expirtDate: string;
  private corporateType: string;
  private userCreated:string;

  private createUserForm: FormGroup;

  constructor(private clientService: ClientService, private formbuilder: FormBuilder, private loginService: LoginService, private countryService: CountryStateCityService) { }

  ngOnInit() {
    this.selectEntityForm = this.formbuilder.group({
      entity: ['']
    })

    this.createUserForm = this.formbuilder.group({
      userID: ['',[Validators.required,Validators.pattern(environment.letterNumber)]],
      employeeNo: ['',[Validators.required,Validators.pattern(environment.letterNumber)]],
      firstName: ['',[Validators.required,Validators.pattern(environment.singleKnown)]],
      lastName: ['',[Validators.required,Validators.pattern(environment.singleKnown)]],
      designation: ['',[Validators.required,Validators.pattern(environment.known)]],
      passportNo: ['',[Validators.required,Validators.pattern(environment.letterNumber)]],
      telephoneRes: ['',[Validators.required,Validators.pattern(environment.phone)]],
      telephoneOff: ['',[Validators.required,Validators.pattern(environment.phone)]],
      mobile: ['',[Validators.required,Validators.pattern(environment.mobile)]],
      faxno: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      country: ['',[Validators.required]],
      region: ['',[Validators.required,Validators.pattern(environment.singleKnown)]],
      postCode: ['',[Validators.required,Validators.pattern(environment.pincodeRegex)]],
      email: ['',[Validators.required,Validators.pattern(environment.email)]],
      currencyAgent: ['',[Validators.required]],
      expiryDate: ['',[Validators.required]],
      cmsClient: [''],
      user:[sessionStorage.getItem('user').toString()]
    })


    this.clientService.getAllCorporate().subscribe
      ((response) => {       
        this.entity = JSON.parse(JSON.stringify(response));
      })
  }

  fetchCountry(): any {
    this.countryService.getCountries().subscribe
      ((response) => {
        return this.countries = JSON.parse(JSON.stringify(response)).countries;

      })
  }
  selectState() {
    let countryId = this.createUserForm.get('country').value;
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

  selectCity() {
    this.cities = [];
    if (this.createUserForm.get('state').value) {
      let data = this.states.filter(item => item.cities.filter(res => res.stateId == this.createUserForm.get('state').value))
      for (let city of data) {
        if (city)
          if (city.cities[0])
            this.cities.push(city.cities[0])
      }

    }
  }

  selectEntity() {
    let entity = this.entity.filter(res => res.cmsClientId == this.selectEntityForm.get('entity').value);
    this.client = entity[0];
      if (entity[0].ref1 == null) {
      this.isEntity = false;
      this.createUser = true;
      this.entityName = entity[0].cmsCompanyName;
      this.entityCountry = entity[0].cmsCompanyCountry;
      this.entityState = entity[0].cmsCompanystate;
      this.entityCity = entity[0].cmsCompanyCity;

    } else {  
      this.show = true;
      this.errorMessage = "Entity already have registered user."
    }
  }


  confirm() {
    this.submitted=true;
    console.log(this.createUserForm.value)
    if(this.createUserForm.invalid)
    return;
    // alert('hi')
    this.isEntity = false;
    this.createUser = false;
    this.isConfirm = true;
    this.userid = this.createUserForm.get('userID').value;
    this.employeeno = this.createUserForm.get('employeeNo').value;
    this.firstname = this.createUserForm.get('firstName').value;
    this.lastname = this.createUserForm.get('lastName').value;
    this.designation = this.createUserForm.get('designation').value;
    this.passport = this.createUserForm.get('passportNo').value;
    this.telephoneRes = this.createUserForm.get('telephoneRes').value;
    this.telephoneOff = this.createUserForm.get('telephoneOff').value;
    this.mobile = this.createUserForm.get('mobile').value;
    this.fax = this.createUserForm.get('faxno').value;
    this.country = this.getCountryName(this.createUserForm.get('country').value);
    this.state = this.getStateName(this.createUserForm.get('state').value);
    this.city = this.getCityName(this.createUserForm.get('city').value);
    this.region = this.createUserForm.get('region').value;
    this.postcode = this.createUserForm.get('postCode').value;
    this.email = this.createUserForm.get('email').value;
    this.currencyAgent = this.createUserForm.get('currencyAgent').value;
    this.expirtDate = this.createUserForm.get('expiryDate').value;

  }
  save() {
    this.submitted=true;
    if(this.createUserForm.invalid)
    return;
    let data = this.createUserForm.value;
    data.cmsClient = this.client;
    data.city = this.getCityName(data.city);
    data.state = this.getStateName(data.state);
    data.country = this.getCountryName(data.country);
    data.corporateType='Y';
    data.userCreated='N';
    console.log(data);
    alert(data);
    this.loginService.save(data)
      .subscribe((response) => {
        this.isConfirm = false;
        this.createUser = false;
        this.createUserForm.reset();
        this.isEntity=true;
        this.userids = "User id is created : " + this.userid;
        alert(this.userids)
      })
  }

  cancel(){
    this.isConfirm = false;
    this.createUser = true;
    this.isEntity=false;
  }

  reset(){
    this.isConfirm = false;
    this.createUser = false;
    this.createUserForm.reset();
    this.isEntity=true;
  }

  getCountryName(countryID: any): string {
    return this.countries.filter(res => res.countryId == countryID)[0].countryName;
  }
  getStateName(stateid: any): string {
    return this.states.filter(res => res.stateId == stateid)[0].stateName;
  }
  getCityName(cityid: any): string {
    return this.cities.filter(res => res.cityId == cityid)[0].cityName;
  }

}