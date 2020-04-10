import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ProgrammedefinitionService } from 'src/app/services/programmedefinition.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
@Component({
  selector: 'app-add-program-definition',
  templateUrl: './add-program-definition.component.html',
  styleUrls: ['./add-program-definition.component.css']
})
export class AddProgramDefinitionComponent implements OnInit {


  private programmedefinitionFormgroup: FormGroup;
  private submitted: boolean = false;
  private confirmForm: any = null;
  private dataEntry: boolean = true;
  private confirm: boolean = false;
  private success: string = "";
  private isExistGroup: boolean = false;
  private enable: boolean = true;
  private labelenable: boolean = false;
  private labeldisable: boolean = false;
  private disable: boolean = false;
  private isprogramCodeExist: boolean = false;
  private enterData: boolean = true;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private definitionservice: ProgrammedefinitionService) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      router.navigate(['/']);
      this.dataService.getFlag(true)
    }
  }
  ngOnInit(): void {
    this.dataService.getFlag(true)
    this.programmedefinitionFormgroup = this.formBuilder.group({
      applicationType: '',
      authorizationRule: '',
      programmeCode: '',
      programmeDescription: '',
      shortDescription: '',
      multipleProductAccount: 'yes',
      definitionArray: this.formBuilder.array([]),
      clientId: sessionStorage.getItem('user'),
      insertedBy: sessionStorage.getItem('user'),

    })
  }
  click() {

    this.addValidationForAuth();
    this.enable = true;
    this.labelenable = true;



  }
  Disableclick() {
    this.removeValidationForAuth();
    this.enable = false;
    this.labelenable = false;
    this.programmedefinitionFormgroup.patchValue({
      authorizationRule: '',
    })
  }
  addValidation() {
    this.programmedefinitionFormgroup.get('applicationType').setValidators([Validators.required]),
      //this.programmedefinitionFormgroup.get('authorizationRule').setValidators([Validators.required]),
      this.programmedefinitionFormgroup.get('programmeCode').setValidators([Validators.required, Validators.pattern(environment.letterNumber)]),
      this.programmedefinitionFormgroup.get('programmeDescription').setValidators([Validators.required, Validators.pattern(environment.singleKnown)]),
      this.programmedefinitionFormgroup.get('shortDescription').setValidators([Validators.required, Validators.pattern(environment.singleKnown)])
  }
  updateValidation() {
    this.programmedefinitionFormgroup.get('applicationType').updateValueAndValidity(),
      this.programmedefinitionFormgroup.get('authorizationRule').updateValueAndValidity(),
      this.programmedefinitionFormgroup.get('programmeCode').updateValueAndValidity(),
      this.programmedefinitionFormgroup.get('programmeDescription').updateValueAndValidity(),
      this.programmedefinitionFormgroup.get('shortDescription').updateValueAndValidity()
  }
  removeValidation() {
    this.programmedefinitionFormgroup.get('applicationType').clearValidators(),
      // this.programmedefinitionFormgroup.get('authorizationRule').clearValidators(),
      this.programmedefinitionFormgroup.get('programmeCode').clearValidators(),
      this.programmedefinitionFormgroup.get('programmeDescription').clearValidators(),
      this.programmedefinitionFormgroup.get('shortDescription').clearValidators()

  }
  addToTable() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.confirmForm = null;
    if (this.programmedefinitionFormgroup.invalid)
      return;
    let value = null;

    this.definitionservice.checkCardUsage(this.programmedefinitionFormgroup.get('insertedBy').value, this.programmedefinitionFormgroup.get('programmeCode').value)
      .subscribe((response) => {
        let dataRes = JSON.parse(JSON.stringify(response)).data
        if (dataRes) {

          $("input[name='programmeCode']").css('border', '1px solid red');
          this.isprogramCodeExist = true;
          return;
        }
        this.confirmForm = null;
        this.add(
          this.programmedefinitionFormgroup.get('applicationType').value,
          this.programmedefinitionFormgroup.get('authorizationRule').value,
          this.programmedefinitionFormgroup.get('programmeCode').value,
          this.programmedefinitionFormgroup.get('programmeDescription').value,
          this.programmedefinitionFormgroup.get('shortDescription').value,
          this.programmedefinitionFormgroup.get('multipleProductAccount').value,
        );
        this.submitted = false;
        this.confirmForm = this.programmedefinitionFormgroup.value;
        this.resetGroupEntery();
      })




  }
  resetGroupEntery() {
    this.programmedefinitionFormgroup.patchValue({
      applicationType: '',
      authorizationRule: '',
      programmeCode: '',
      programmeDescription: '',
      shortDescription: '',
      multipleProductAccount: 'yes',
    })
  }
  add(applicationType: any,
    authorizationRule: any,
    programmeCode: any,
    programmeDescription: any,
    shortDescription: any,
    multipleProductAccount: any,
  ) {
    (<FormArray>this.programmedefinitionFormgroup.get("definitionArray")).push(this.addGroup(applicationType,
      authorizationRule,
      programmeCode,
      programmeDescription,
      shortDescription,
      multipleProductAccount));
  }
  addGroup(
    applicationType: any,
    authorizationRule: any,
    programmeCode: any,
    programmeDescription: any,
    shortDescription: any,
    multipleProductAccount, ): FormGroup {
    return this.formBuilder.group({
      applicationType: applicationType,
      authorizationRule: authorizationRule,
      programmeCode: programmeCode,
      programmeDescription: programmeDescription,

      shortDescription: shortDescription,
      authorizationrule: authorizationRule,
      programmecode: programmeCode,
      programmedescription: programmeDescription,
      shortdescription: shortDescription,
      insertedBy: sessionStorage.getItem('user'),
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: sessionStorage.getItem('user'),
      modifiedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      clientId: sessionStorage.getItem('user'),
      multipleProductAccount: multipleProductAccount,
    })
  }
  remove(i) {
    this.confirmForm = null;
    (<FormArray>this.programmedefinitionFormgroup.get("definitionArray")).removeAt(i);

    if ((<FormArray>this.programmedefinitionFormgroup.get("definitionArray")).length > 0)
      this.confirmForm = this.programmedefinitionFormgroup.value;

  }
  confirmProgramDetails() {
    if (this.confirmForm == null) {
      this.success = "Please Definition Detail";
      $('#error').show('fast');
      return;
    }
    this.dataEntry = false;
    this.confirm = true;
  }
  addValidationForAuth() {
    this.programmedefinitionFormgroup.get('authorizationRule').setValidators([Validators.required]);
    this.programmedefinitionFormgroup.get('authorizationRule').updateValueAndValidity()
  }
  removeValidationForAuth() {
    this.programmedefinitionFormgroup.get('authorizationRule').clearValidators()
    this.programmedefinitionFormgroup.get('authorizationRule').updateValueAndValidity()
  }
  save() {
    this.removeValidation();
    this.updateValidation();

    if ((<FormArray>this.programmedefinitionFormgroup.get('definitionArray')).length > 0) {
      let data = {
        bean: (<FormArray>this.programmedefinitionFormgroup.get("definitionArray")).value
      }
      this.definitionservice.saveProgrammedefinition((<FormArray>this.programmedefinitionFormgroup.get("definitionArray")).value)
        .subscribe((response) => {

          while ((<FormArray>this.programmedefinitionFormgroup.get('definitionArray')).length > 0) {
            (<FormArray>this.programmedefinitionFormgroup.get('definitionArray')).removeAt(0);
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
  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }
  isInput() {
    $("input[name='programmeCode']").removeAttr('style');
    this.isprogramCodeExist = false;
  }



  cancel() {

    this.confirm = false;
    this.dataEntry = true;
  
    while ((<FormArray>this.programmedefinitionFormgroup.get('definitionArray')).length > 0) {
      (<FormArray>this.programmedefinitionFormgroup.get('definitionArray')).removeAt(0);
    }
    
    $("input[name='programmeCode']").removeAttr('style');
    this.isprogramCodeExist = false;
    this.submitted = false;
    this.enable = true;
    
  }

  back() {
    this.dataEntry = true;
    this.confirm = false;

  }

}
