import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UsagesService } from 'src/app/services/usages.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-merchant-category',
  templateUrl: './merchant-category.component.html',
  styleUrls: ['./merchant-category.component.css']
})
export class MerchantCategoryComponent implements OnInit {
  private merchantFromGroup: FormGroup;
  private submitted: boolean = false;
  private confirmForm: any[] = [];
  private enterData: boolean = true;
  private confirm: boolean = false;
  private mccGroup: any[] = [];
  private mccCode: any[] = [];

  private success: string = "";
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

  ngOnInit() {
    this.merchantFromGroup = this.formBuilder.group({
      groupCode: '',
      groupName: '',
      groupDescription: '',
      groupNetworkType: '',
      groupMccGroupDesc: '',
      groupMccCodeDesc: '',
      groupMccGroup: '',
      groupMccCode: '',
      mccCodeDesc: '',
      mccGroupDesc: '',
      insertedBy: sessionStorage.getItem('user'),
      merchantGroups: this.formBuilder.array([])

    })

    this.usageService.getMerchantMCCGroup()
      .subscribe(
        (response) => {
          this.mccGroup = JSON.parse(JSON.stringify(response)).data;
        }
      )
  }
  addValidation() {
    this.merchantFromGroup.get('groupCode').setValidators([Validators.required]),
      this.merchantFromGroup.get('groupName').setValidators([Validators.required]),
      this.merchantFromGroup.get('groupDescription').setValidators([Validators.required]),
      this.merchantFromGroup.get('groupNetworkType').setValidators([Validators.required]),
      // this.merchantFromGroup.get('groupMccGroupDesc').setValidators([Validators.required]),
      //this.merchantFromGroup.get('groupMccCodeDesc').setValidators([Validators.required]),
      this.merchantFromGroup.get('groupMccGroup').setValidators([Validators.required]),
      this.merchantFromGroup.get('groupMccCode').setValidators([Validators.required])
  }
  updateValidation() {
    this.merchantFromGroup.get('groupCode').updateValueAndValidity(),
      this.merchantFromGroup.get('groupName').updateValueAndValidity(),
      this.merchantFromGroup.get('groupDescription').updateValueAndValidity(),
      this.merchantFromGroup.get('groupNetworkType').updateValueAndValidity(),
      this.merchantFromGroup.get('groupMccGroupDesc').updateValueAndValidity(),
      this.merchantFromGroup.get('groupMccCodeDesc').updateValueAndValidity(),
      this.merchantFromGroup.get('groupMccGroup').updateValueAndValidity(),
      this.merchantFromGroup.get('groupMccCode').updateValueAndValidity()
  }
  removeVlidation() {
    this.merchantFromGroup.get('groupCode').clearValidators(),
      this.merchantFromGroup.get('groupName').clearValidators(),
      this.merchantFromGroup.get('groupDescription').clearValidators(),
      this.merchantFromGroup.get('groupNetworkType').clearValidators(),
      this.merchantFromGroup.get('groupMccGroupDesc').clearValidators(),
      this.merchantFromGroup.get('groupMccCodeDesc').clearValidators(),
      this.merchantFromGroup.get('groupMccGroup').clearValidators(),
      this.merchantFromGroup.get('groupMccCode').clearValidators()
  }

  addToTable() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    if (this.merchantFromGroup.invalid)
      return;

    this.usageService.checkMerchantGroup(
      this.merchantFromGroup.get('insertedBy').value,
      this.merchantFromGroup.get('groupCode').value
    )
      .subscribe((response) => {
        let dataRes = JSON.parse(JSON.stringify(response)).data
        if (dataRes) {
          $("input[name='groupCode']").css('border', '1px solid red');
          this.isgroupCodeExist = true;
          return;
        }
        this.add(
          this.merchantFromGroup.get('groupCode').value,
          this.merchantFromGroup.get('groupName').value,
          this.merchantFromGroup.get('groupDescription').value,
          this.merchantFromGroup.get('groupNetworkType').value,
          this.merchantFromGroup.get('groupMccGroupDesc').value,
          this.merchantFromGroup.get('groupMccCodeDesc').value,
          this.merchantFromGroup.get('groupMccGroup').value,
          this.merchantFromGroup.get('groupMccCode').value
        );
        this.submitted = false;
        this.confirmForm.push(this.merchantFromGroup.value);

        this.resetGroupEntry();
      })

  }
  resetGroupEntry() {
    this.merchantFromGroup.patchValue({
      groupCode: '',
      groupName: '',
      groupDescription: '',
      groupNetworkType: '',
      groupMccGroupDesc: '',
      groupMccCodeDesc: '',
      groupMccGroup: '',
      groupMccCode: '',
      mccCodeDesc: '',
      mccGroupDesc: '',
      insertedBy: sessionStorage.getItem('user')
    })
  }

  add(groupCode: any,
    groupName: any,
    groupDescription: any,
    groupNetworkType: any,
    groupMccGroupDesc: any,
    groupMccCodeDesc: any,
    groupMccGroup: any,
    groupMccCode: any) {

    (<FormArray>this.merchantFromGroup.get("merchantGroups")).push(this.addGroup(groupCode,
      groupName,
      groupDescription,
      groupNetworkType,
      groupMccGroupDesc,
      groupMccCodeDesc,
      groupMccGroup,
      groupMccCode));

    console.log((<FormArray>this.merchantFromGroup.get("merchantGroups")).value)


  }

  addGroup(groupCode: any,
    groupName: any,
    groupDescription: any,
    groupNetworkType: any,
    groupMccGroupDesc: any,
    groupMccCodeDesc: any,
    groupMccGroup: any,
    groupMccCode: any): FormGroup {
    return this.formBuilder.group({
      merchantGroupCode: groupCode,
      merchantGroupName: groupName,
      merchantGroupDescription: groupDescription,
      merchantNetworkType: groupNetworkType,
      groupMccGroupDesc: groupMccGroupDesc,
      groupMccCodeDesc: groupMccCodeDesc,
      merchantMCCGroup: this.getMCCGroup(groupMccGroup),
      merchantMCCCode: this.getMCCCode(groupMccCode),
      groupId: '',
      insertedBy: sessionStorage.getItem('user'),
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: '',
      modifiedDate: '',
    })
  }

  remove(i) {
    (<FormArray>this.merchantFromGroup.get("merchantGroups")).removeAt(i);
  }

  confirmMerchant() {
    if(this.confirmForm.length==0){
      this.success = "Please add Merchant details";
      $("#error").show('fast')
      return;
    }
    this.enterData = false;
    this.confirm = true;
  }

  save() {
    this.removeVlidation();
    this.updateValidation();
    if ((<FormArray>this.merchantFromGroup.get('merchantGroups')).length > 0) {
      this.usageService.saveMerchantGroup((<FormArray>this.merchantFromGroup.get('merchantGroups')).value)
        .subscribe((response) => {
          this.success = JSON.parse(JSON.stringify(response)).message;
          while ((<FormArray>this.merchantFromGroup.get('merchantGroups')).length > 0) {
            (<FormArray>this.merchantFromGroup.get('merchantGroups')).removeAt(0);
          }

          this.confirm = false;
          this.enterData = true;
          this.submitted = false;
          this.cancel()
          this.submitted = false;
          $("#success").show('fast');
        },
          (error) => {
            this.success = JSON.parse(JSON.stringify(error)).error.message;
            $("#error").show('fast')
          }

        )
    } else {
      alert('Please add merchant')
      return;
    }

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


  selectMCCGroup() {
    let mccGroup = this.merchantFromGroup.get('groupMccGroup').value;
    let group = this.mccGroup.filter(res => res.groupId == mccGroup)[0];
    this.merchantFromGroup.patchValue({
      mccGroupDesc: group.mccCodeDescription
    })
    this.mccCode = group.groupCode;
  }

  getMCCGroup(mccGroup): string {
    return this.mccGroup.filter(res => res.groupId == mccGroup)[0].mccCodeName;
  }

  getMCCCode(mccCode): string {
    return this.mccCode.filter(res => res.mccId == mccCode)[0].mccName;
  }

  selectMCCCode() {
    let mccCode = this.merchantFromGroup.get('groupMccCode').value;
    let desc = this.mccCode.filter(res => res.mccId == mccCode)[0].mccDescription;
    this.merchantFromGroup.patchValue({
      mccCodeDesc: desc
    })
  }

  close() {
    $('#success').hide('fast')
    $("#error").hide('fast')
  }

}
