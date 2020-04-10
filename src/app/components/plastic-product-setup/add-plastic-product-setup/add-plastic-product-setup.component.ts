import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PlasticSetupServiceService } from 'src/app/services/plastic-setup/plastic-setup-service.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-plastic-product-setup',
  templateUrl: './add-plastic-product-setup.component.html',
  styleUrls: ['./add-plastic-product-setup.component.css']
})
export class AddPlasticProductSetupComponent implements OnInit {

  private plasticFieldFormgroup: FormGroup
  private submitted: boolean = false;
  private confirmForm:any= null;
  private dataEntry: boolean = true;
  private confirm: boolean = false;
  private success: string = "";
  private isExistGroup: boolean = false;



  constructor(private loginService: LoginService,private httpClient:HttpClient, private http: HttpClient, private formBuilder: FormBuilder, private plasticService: PlasticSetupServiceService, private dataService: DataService, private router: Router) {
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
    this.plasticFieldFormgroup = this.formBuilder.group({
      plasticCode: '',
      serviceCode: '',
      plasticDesc: '',
      plasticFieldFormArraygroup: this.formBuilder.array([]),
      clientId: sessionStorage.getItem('user')
    })



  }
  addValidation() {
    this.plasticFieldFormgroup.get('plasticCode').setValidators([Validators.required, Validators.pattern(environment.letterNumber), Validators.maxLength(6)]),
      this.plasticFieldFormgroup.get('serviceCode').setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(environment.threeNumber)]),
      this.plasticFieldFormgroup.get('plasticDesc').setValidators([Validators.required])
  }
  updateValidation() {
    this.plasticFieldFormgroup.get('plasticCode').updateValueAndValidity(),
      this.plasticFieldFormgroup.get('serviceCode').updateValueAndValidity(),
      this.plasticFieldFormgroup.get('plasticDesc').updateValueAndValidity()
  }
  removeValidation() {
    this.plasticFieldFormgroup.get('plasticCode').clearValidators(),
      this.plasticFieldFormgroup.get('serviceCode').clearValidators(),
      this.plasticFieldFormgroup.get('plasticDesc').clearValidators()
  }
  addToTable() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.confirmForm = null;

    // this.httpClient.post<any>(environment.base_url+"/PlasticSetup/validate",this.plasticFieldFormgroup.value)
    // .subscribe( async (response)=>{
    //   for (const fieldName of Object.keys(response)) {
    //     const serverErrors = response[fieldName];

    //     const errors = {};
    //     for (const serverError of serverErrors) {
    //       errors[serverError] = true;
    //     }

    //     const control = this.plasticFieldFormgroup.get(fieldName);
    //     control.setErrors(errors);
    //     control.markAsDirty();
    //     if (this.plasticFieldFormgroup.invalid)
    //   return;
    //   }
    // })
    if (this.plasticFieldFormgroup.invalid)
      return;

    this.plasticService.isExist(
      this.plasticFieldFormgroup.get('clientId').value,
      this.plasticFieldFormgroup.get('plasticCode').value
    )
      .subscribe(
        (response) => {

          let dataRes = JSON.parse(JSON.stringify(response)).data;
          if (dataRes) {
            $("input[name='plasticCode']").css('border', '1px solid red');
            this.isExistGroup = true;
            return;
          }
         // this.confirmForm = [];
          this.add(
            this.plasticFieldFormgroup.get('plasticCode').value,
            this.plasticFieldFormgroup.get('serviceCode').value,
            this.plasticFieldFormgroup.get('plasticDesc').value
          );
          this.submitted = false;
          this.confirmForm=this.plasticFieldFormgroup.value;
          
          this.resetGroupEntery();
        },
        (error) => {
          this.add(
            this.plasticFieldFormgroup.get('plasticCode').value,
            this.plasticFieldFormgroup.get('serviceCode').value,
            this.plasticFieldFormgroup.get('plasticDesc').value
          );
          this.submitted = false;
          this.confirmForm=this.plasticFieldFormgroup.value;

          this.resetGroupEntery();
        }
      )


  }
  resetGroupEntery() {
    this.plasticFieldFormgroup.patchValue({
      plasticCode: '',
      serviceCode: '',
      plasticDesc: ''
    })
  }
  add(plasticCode: any,
    serviceCode: any,
    plasticDesc: any
  ) {
    (<FormArray>this.plasticFieldFormgroup.get("plasticFieldFormArraygroup")).push(this.addGroup(plasticCode,
      serviceCode,
      plasticDesc));
  }
  addGroup(
    plasticCode: any,
    serviceCode: any,
    plasticDesc: any): FormGroup {
    return this.formBuilder.group({
      plasticCode: plasticCode,
      serviceCode: serviceCode,
      plasticDescription: plasticDesc,
      plasticCodeDescription: plasticCode,
      plasticServiceCodeDesc: serviceCode,
      plasticPlasticeCodeDesc: plasticDesc,
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedDate: null,
      clientId: sessionStorage.getItem('user'),
    })
  }
  remove(i) {
    this.confirmForm =null;
    (<FormArray>this.plasticFieldFormgroup.get("plasticFieldFormArraygroup")).removeAt(i);

    if((<FormArray>this.plasticFieldFormgroup.get("plasticFieldFormArraygroup")).length>0)
    this.confirmForm=this.plasticFieldFormgroup.value;

    
  }
  confirmPlasticSetupDetails() {
    if (this.confirmForm==null) {
      this.success = "Please add Plastic Detail";
      $('#error').show('fast');
      return;
    }

    this.dataEntry = false;
    this.confirm = true;
  }
  save() {
    this.removeValidation();
    this.updateValidation();

    if ((<FormArray>this.plasticFieldFormgroup.get('plasticFieldFormArraygroup')).length > 0) {
      this.plasticService.savePlasticData((<FormArray>this.plasticFieldFormgroup.get("plasticFieldFormArraygroup")).value)
        .subscribe((response) => {

          while ((<FormArray>this.plasticFieldFormgroup.get('plasticFieldFormArraygroup')).length > 0) {
            (<FormArray>this.plasticFieldFormgroup.get('plasticFieldFormArraygroup')).removeAt(0);
          }
          this.resetGroupEntery()
          this.confirmForm = null;
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
      alert('Please add Plastic set up details')
      return;
    }

  }
  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }
  isInput() {
    $("input[name='plasticCode']").removeAttr('style');
    this.isExistGroup = false;
  }
  cancel() {

    this.dataEntry = true;
    this.confirm = false;
    this.isExistGroup = false;

    $("input[name='plasticCode']").removeAttr('style');
  }
  back() {
    this.confirmForm =null;
    this.isExistGroup = false;
    $("input[name='plasticCode']").removeAttr('style');
    while ((<FormArray>this.plasticFieldFormgroup.get('plasticFieldFormArraygroup')).length > 0) {
      (<FormArray>this.plasticFieldFormgroup.get('plasticFieldFormArraygroup')).removeAt(0);
    }
  }



}



