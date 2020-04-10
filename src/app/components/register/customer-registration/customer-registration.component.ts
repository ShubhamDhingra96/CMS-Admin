import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormArray, FormGroup } from '@angular/forms';
import { CustomerRegistrationService } from 'src/app/services/customer-registration.service';
import { Route, Router } from '@angular/router';
import { CountryStateCityService } from 'src/app/services/country-state-city.service';
import { Alert } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  customerRegistration: FormGroup;
  identificationTable:FormArray;
  private submitted = false;
  private confirmForm: any[] = [];
  private countries: any[] = this.fetchCountry();
  private states: any[] = null;
  private cities: any[] = null;
  private _countries: any[] = this.fetchCountry_();
  private _states: any[] = null;
  private _cities: any[] = null;
  private officestates: any[] = null;
  private officecities: any[] = null;
  private checked: boolean = false;
  private isReadOnly: boolean = false;
  private isConfirmfield: boolean = false;
  private isConfirmlabel: boolean = false;
  private isFormConfirmlabel: boolean = false;
  private isFormConfirmfield: boolean = false;
  private isKycAdd: boolean = false;
  constructor(private countryService: CountryStateCityService,private router: Router,private formBuilder: FormBuilder,private customerService: CustomerRegistrationService) { }

  ngOnInit() {

    this.customerRegistration = this.formBuilder.group({
    
      firstName: ['',Validators.required],
      middleName: ['',Validators.required],
      lastName: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      motherName: ['',Validators.required],
      gender: ['',Validators.required],
      nationality: ['',Validators.required],
      maritalStatus: ['',Validators.required],
      residenceAddress1: ['',Validators.required],
      residenceAddress2: ['',Validators.required],
      residenceAddress3: ['',Validators.required],
      residenceAddress4: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      pinCode: ['',[Validators.required,Validators.pattern(environment.onlyNumber)]],
      phoneNumber: ['',[Validators.required,Validators.minLength(10),Validators.pattern(environment.onlyNumber)]],
      officeAddress1: ['',Validators.required],
      officeAddress2: ['',Validators.required],
      officeAddress3: ['',Validators.required],
      officeAddress4: ['',Validators.required],
      officeCity: ['',Validators.required],
      officeState: ['',Validators.required],
      officeCountry: ['',Validators.required],
      officePinCode: ['',Validators.required],
      officePhoneNumber: ['',[Validators.required,Validators.minLength(10),Validators.pattern(environment.onlyNumber)]],
      officeExtensionNumber: ['',[Validators.required,Validators.pattern(environment.onlyNumber)]],
      mobileNumber: ['',[Validators.required,Validators.minLength(10),Validators.pattern(environment.onlyNumber)]],
      mailTo: ['',Validators.required],
      emailAddress: ['',[Validators.required,Validators.pattern(environment.email)]],
      alternativeEmailAddress: ['',[Validators.required,Validators.pattern(environment.email)]],
      applicationDate: ['',Validators.required],
      passportNumber: ['',[Validators.required,Validators.pattern(environment.nospecialchar)]],
      passportIssueDate:['',Validators.required],
      passportExpiryDate: ['',Validators.required],
      panOrForm: ['',Validators.required],
      panNumber:['',[Validators.required,Validators.pattern(environment.nospecialchar)]],
      //form60:[''],
      documentType:['',Validators.required],
      identificationTable:this.formBuilder.array([])

    });

    }
    
    confirmRegisterForm(){
     
     this.submitted = true;
      console.log(this.customerRegistration.value);
      console.log(this.customerRegistration.invalid)
      if (this.customerRegistration.invalid) {
        return false;
      } 
      let groupdata= JSON.parse(JSON.stringify(this.customerRegistration.value))
      if(this.checked)
      {
       
        groupdata.officeAddress1=this.customerRegistration.get('officeAddress1').value;
        groupdata.officeAddress2=this.customerRegistration.get('officeAddress2').value;
        groupdata.officeAddress3=this.customerRegistration.get('officeAddress3').value;
        groupdata.officeAddress4=this.customerRegistration.get('officeAddress4').value;
        groupdata.city = this.getCityName(groupdata.city);
        groupdata.state = this.getStateName(groupdata.state);
        groupdata.country = this.getCountryName(groupdata.country);
        groupdata.officeCity =  groupdata.city;
        groupdata.officeState = groupdata.state;
        groupdata.officeCountry = groupdata.country;
        groupdata.officePinCode=this.customerRegistration.get('officePinCode').value;
     }
      else
      {
        groupdata.city = this.getCityName(groupdata.city);
        groupdata.state = this.getStateName(groupdata.state);
        groupdata.country = this.getCountryName(groupdata.country);
        groupdata.officeCity = this.getCityName_(groupdata.officeCity);
        groupdata.officeState = this.getStateName_(groupdata.officeState);
        groupdata.officeCountry = this.getCountryName_(groupdata.officeCountry);

      }
    
      console.log(groupdata);
     
       this.customerService.addCustomerRegistration(groupdata).subscribe(data => {
        alert(JSON.parse(JSON.stringify(data)).message);
        this.customerRegistration.get('officeAddress1').enable();
        this.customerRegistration.get('officeAddress2').enable();
        this.customerRegistration.get('officeAddress3').enable();
        this.customerRegistration.get('officeAddress4').enable();
        this.customerRegistration.get('officeCountry').enable();
        this.customerRegistration.get('officeState').enable();
        this.customerRegistration.get('officeCity').enable();
        this.customerRegistration.get('officePinCode').enable();
        this.customerRegistration.reset();
        this.checked=false;
        
        while ((<FormArray>this.customerRegistration.get('identificationTable')).length > 0) {
          (<FormArray>this.customerRegistration.get('identificationTable')).removeAt(0);
        }
       })
       this.submitted=false;
  }

  add(){
    alert("in add");

    let docName=this.customerRegistration.get('documentType').value;

    (<FormArray>this.customerRegistration.get('identificationTable')).push(this.addLimit(docName))
      this.confirmForm.push(this.customerRegistration.value);
     console.log(this.confirmForm)
    
  }

  addLimit(docName:any):FormGroup{
         return this.formBuilder.group({
           documentName:docName,
           idNumber:['',Validators.required],
           expiryDate:['',Validators.required]
         })
    }

    getValidity(i) {
      console.log(i)
    }

    test(r){
      console.log(r)
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
          return this._countries = JSON.parse(JSON.stringify(this.countries));
        })
    }

    selectState() {
      let countryId = this.customerRegistration.get('country').value;
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
      if (this.customerRegistration.get('state').value) {
        let data = this.states.filter(item => item.cities.filter(res => res.stateId == this.customerRegistration.get('state').value))
        for (let city of data) {
          if (city)
            if (city.cities[0])
              this.cities.push(city.cities[0])
        }
  
      }
    }

    selectOfficeState() {
      let countryId = this.customerRegistration.get('officeCountry').value;
      if (countryId) {
        this.officestates = [];
        this.countryService.getStatesAndCities(Number(countryId)).subscribe
          ((response) => {
            let data = JSON.parse(JSON.stringify(response));
            for (let state of data.states) {
              if (state)
                this.officestates.push(state);
            }
  
          })
  
      }
    }

    selectOfficeCity() {
      this.officecities = [];
      if (this.customerRegistration.get('officeState').value) {
        let data = this.states.filter(item => item.cities.filter(res => res.stateId == this.customerRegistration.get('state').value))
        for (let city of data) {
          if (city)
            if (city.cities[0])
              this.officecities.push(city.cities[0])
        }
  
      }
    }
    
    checkAddress()
    {
      console.log(this.customerRegistration.get('country').value);
      console.log(this.customerRegistration.get('state').value);
      console.log(this.customerRegistration.get('city').value);
      //this.checked=true;
      this.checked =!this.checked;
     
      if(this.checked)
      {
        this.isReadOnly=true;
     
       let countryId = this.customerRegistration.get('country').value;
      if (countryId) {
        this.officestates = [];
        this.countryService.getStatesAndCities(Number(countryId)).subscribe
          ((response) => {
            let data = JSON.parse(JSON.stringify(response));
            for (let state of data.states) {
              if (state)
                this.officestates.push(state);

                this.officecities = [];
                if (this.customerRegistration.get('state').value) {
                  let data = this.states.filter(item => item.cities.filter(res => res.stateId == this.customerRegistration.get('state').value))
                  for (let city of data) {
                    if (city)
                      if (city.cities[0])
                        this.officecities.push(city.cities[0])
                  }
            
                }

                  this.customerRegistration.patchValue({
                  officeAddress1:this.customerRegistration.get('residenceAddress1').value,
                  officeAddress2:this.customerRegistration.get('residenceAddress2').value,
                  officeAddress3:this.customerRegistration.get('residenceAddress3').value,
                  officeAddress4:this.customerRegistration.get('residenceAddress4').value,
                  officeCountry:this.customerRegistration.get('country').value,
                  officeState:this.customerRegistration.get('state').value,
                  officeCity:this.customerRegistration.get('city').value,
                  officePinCode:this.customerRegistration.get('pinCode').value,
              })
            }
            this.customerRegistration.get('officeAddress1').disable();
            this.customerRegistration.get('officeAddress2').disable();
            this.customerRegistration.get('officeAddress3').disable();
            this.customerRegistration.get('officeAddress4').disable();
            this.customerRegistration.get('officeCountry').disable();
            this.customerRegistration.get('officeState').disable();
            this.customerRegistration.get('officeCity').disable();
            this.customerRegistration.get('officePinCode').disable();
          
          })
  
      }
      }
      else{
       
        this.customerRegistration.patchValue({
          officeAddress1:'',
          officeAddress2:'',
          officeAddress3:'',
          officeAddress4:'',
          officeCountry:'',
          officeState:'',
          officeCity:'',
          officePinCode:'',
      })
      this.customerRegistration.get('officeAddress1').enable();
      this.customerRegistration.get('officeAddress2').enable();
      this.customerRegistration.get('officeAddress3').enable();
      this.customerRegistration.get('officeAddress4').enable();
      this.customerRegistration.get('officeCountry').enable();
      this.customerRegistration.get('officeState').enable();
      this.customerRegistration.get('officeCity').enable();
      this.customerRegistration.get('officePinCode').enable();

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

  return this.countries.filter(res => res.countryId == countryID)[0].countryName;
}
getStateName_(stateid: any): String {
  return this.officestates.filter(res => res.stateId == stateid)[0].stateName;
}
getCityName_(cityid: any): String {
  return this.officecities.filter(res => res.cityId == cityid)[0].cityName;
}

hide()
{
  
  let panOrForm=this.customerRegistration.get('panOrForm').value;
  console.log(panOrForm);
 if(panOrForm=="Form 60")
 {
   alert("form 60");
   this.isConfirmfield=false;
   this.isConfirmlabel=false;
   this.isFormConfirmlabel=true;
   this.isFormConfirmfield=true;
 }
 if(panOrForm=="Pan card")
 {
  
   this.isFormConfirmlabel=false;
   this.isFormConfirmfield=false;
   this.isConfirmfield=true;
   this.isConfirmlabel=true;
 }

}

kycAdd()
    {
      this.isKycAdd=true;
    }
    remove(i) {
      (<FormArray>this.customerRegistration.get("identificationTable")).removeAt(i);
    }
  
}
