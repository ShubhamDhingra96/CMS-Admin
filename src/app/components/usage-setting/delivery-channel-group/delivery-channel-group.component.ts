import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UsagesService } from 'src/app/services/usages.service';
import { formatDate } from '@angular/common';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-delivery-channel-group',
  templateUrl: './delivery-channel-group.component.html',
  styleUrls: ['./delivery-channel-group.component.css']
})
export class DeliveryChannelGroupComponent implements OnInit {

  private deliveryGroupComponent: FormGroup;
  private submitted: boolean = false;
  private confirmform: any[] = [];
  private entrData: boolean = true;
  private confirm: boolean = false;

  private channelsForm: any[] = [];
  private success: string = "";
  private isgroupCodeExist: boolean = false;
  private deliveryChannelId: any[] = [];
  private transactions: any[] = [];

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
    this.deliveryGroupComponent = this.formBuilder.group({
      groupCode: '',
      groupName: '',
      groupDescription: '',
      groupDeliveryChannel: '',
      groupTransactionChannel: '',
      groupDeliveryChannelDesc: '',
      groupTransactionChannelDesc:'',
      insertedBy: [sessionStorage.getItem('user'), Validators.required],
      modifiedBy: '',
      insertedDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedDate: '',
      deliveryGroups: this.formBuilder.array([])
    })
    this.getDeliveryChannel();
  }
  addValidation() {
    this.deliveryGroupComponent.get('groupCode').setValidators([Validators.required]),
      this.deliveryGroupComponent.get('groupName').setValidators([Validators.required]),
      this.deliveryGroupComponent.get('groupDescription').setValidators([Validators.required]),
      this.deliveryGroupComponent.get('groupDeliveryChannel').setValidators([Validators.required]),
      this.deliveryGroupComponent.get('groupTransactionChannel').setValidators([Validators.required])
  }

  updateValidation() {
    this.deliveryGroupComponent.get('groupCode').updateValueAndValidity(),
      this.deliveryGroupComponent.get('groupName').updateValueAndValidity(),
      this.deliveryGroupComponent.get('groupDescription').updateValueAndValidity(),
      this.deliveryGroupComponent.get('groupDeliveryChannel').updateValueAndValidity(),
      this.deliveryGroupComponent.get('groupTransactionChannel').updateValueAndValidity()
  }

  removeValidation() {
    this.deliveryGroupComponent.get('groupCode').clearValidators(),
      this.deliveryGroupComponent.get('groupName').clearValidators(),
      this.deliveryGroupComponent.get('groupDescription').clearValidators(),
      this.deliveryGroupComponent.get('groupDeliveryChannel').clearValidators(),
      this.deliveryGroupComponent.get('groupTransactionChannel').clearValidators()

  }

  selectDeliveryChannel() {
    let deliveryCode = this.deliveryGroupComponent.get("groupDeliveryChannel").value;
    let data = this.deliveryChannelId.filter(res => res.delId == deliveryCode)[0]
   
    if(data){
      this.transactions=data.transactions;
      this.deliveryGroupComponent.patchValue({
        groupDeliveryChannelDesc: data.delDescription
      })
    }else{
      this.deliveryGroupComponent.patchValue({
        groupDeliveryChannelDesc: ''
      })
    }
   
  }

  selectTransaction(){
    let transCode = this.deliveryGroupComponent.get("groupTransactionChannel").value;
    console.log(transCode)
    let data=this.transactions.filter(res => res.transId == transCode)[0];
    if(data){
      this.deliveryGroupComponent.patchValue({
        groupTransactionChannelDesc: data.transGroupName
      })
    }else{
      this.deliveryGroupComponent.patchValue({
        groupTransactionChannelDesc:''
      })
    }
   
  }
  getDeliveryChannelName(deliveryCode:any):string{
    return  this.deliveryChannelId.filter(res => res.delId == deliveryCode)[0].delCode
  }

  getTransactionName(transCode:any):string{
    return  this.transactions.filter(res => res.transId == transCode)[0].transGroupName
  }

  addToTable() {
    this.addValidation();
    this.updateValidation();
    this.submitted = true;
    this.channelsForm = [];

    if (this.deliveryGroupComponent.invalid)
      return;
    this.usageService.checkDeliveryChannelGroup(this.deliveryGroupComponent.get('insertedBy').value, this.deliveryGroupComponent.get('groupCode').value)
      .subscribe(
        (response) => {
          let resp = JSON.parse(JSON.stringify(response)).data;
          if (resp) {
            $("input[name='groupCode']").css('border', '1px solid red');
            console.log($("input[name='groupCode']"))
            this.isgroupCodeExist = true;
            return;
          }


          this.add(
            this.deliveryGroupComponent.get('groupCode').value,
            this.deliveryGroupComponent.get('groupName').value,
            this.deliveryGroupComponent.get('groupDescription').value,
            this.deliveryGroupComponent.get('groupDeliveryChannel').value,
            this.deliveryGroupComponent.get('groupTransactionChannel').value,
          );

          this.submitted = false;
          this.confirmform.push(this.deliveryGroupComponent.value);
          let data = {
            groupCode: this.deliveryGroupComponent.get('groupCode').value,
            groupName: this.deliveryGroupComponent.get('groupName').value,
            groupDesc: this.deliveryGroupComponent.get('groupDescription').value,
            deliveryChannels: this.getDeliveryChannelName(this.deliveryGroupComponent.get('groupDeliveryChannel').value),
            transactions: this.getTransactionName(this.deliveryGroupComponent.get('groupTransactionChannel').value)
          }
          this.channelsForm.push(data);
          this.resetGroupEntry();
        },
        (error) => {
          this.add(
            this.deliveryGroupComponent.get('groupCode').value,
            this.deliveryGroupComponent.get('groupName').value,
            this.deliveryGroupComponent.get('groupDescription').value,
            this.deliveryGroupComponent.get('groupDeliveryChannel').value,
            this.deliveryGroupComponent.get('groupTransactionChannel').value,
          );

          this.submitted = false;
          this.confirmform.push(this.deliveryGroupComponent.value);
          let data = {
            groupCode: this.deliveryGroupComponent.get('groupCode').value,
            groupName: this.deliveryGroupComponent.get('groupName').value,
            groupDesc: this.deliveryGroupComponent.get('groupDescription').value,
            deliveryChannels: this.getDeliveryChannelName(this.deliveryGroupComponent.get('groupDeliveryChannel').value),
            transactions: this.getTransactionName(this.deliveryGroupComponent.get('groupTransactionChannel').value)
          }
          this.channelsForm.push(data);
          this.resetGroupEntry();
        }

      );

  }
  resetGroupEntry() {
    this.deliveryGroupComponent.patchValue({
      groupCode: '',
      groupName: '',
      groupDescription: '',
      groupDeliveryChannel: '',
      groupTransactionChannel: ''
    })
  }

  add(groupCode: any,
    groupName: any,
    groupDescription: any,
    groupDeliveryChannel: any,
    groupTransactionChannel: any) {

    (<FormArray>this.deliveryGroupComponent.get("deliveryGroups")).push(this.addGroup(groupCode,
      groupName,
      groupDescription,
      groupDeliveryChannel,
      groupTransactionChannel));

    console.log((<FormArray>this.deliveryGroupComponent.get("deliveryGroups")).value);

  }

  addGroup(groupCode: any,
    groupName: any,
    groupDescription: any,
    groupDeliveryChannel: any,
    groupTransactionChannel: any): FormGroup {
    return this.formBuilder.group({
      groupId: '',
      groupCode: groupCode,
      groupName: groupName,
      groupDescription: groupDescription,
      groupDeliveryChannel: this.getDeliveryChannelName(groupDeliveryChannel),
      groupTransactionChannel: this.getTransactionName(groupTransactionChannel),
      insertedBy: sessionStorage.getItem('user'),
      insertedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      modifiedBy: '',
      modifiedDate: '',
    })
  }
  remove(i) {
    (<FormArray>this.deliveryGroupComponent.get("deliveryGroups")).removeAt(i);
  }

  confirmDelivery() {
    if (this.channelsForm.length == 0) {
      this.success = 'No data available.';
      $("#error").show('fast')
      return;
    }
    this.entrData = false;
    this.confirm = true;
  }

  getDeliveryChannel() {
    this.usageService.getDeliveryChannel()
      .subscribe((response) => {
        this.deliveryChannelId = JSON.parse(JSON.stringify(response)).data;

      })

  }

  save() {
    this.removeValidation();
    this.updateValidation();


    if ((<FormArray>this.deliveryGroupComponent.get('deliveryGroups')).length > 0) {
      this.usageService.saveDel((<FormArray>this.deliveryGroupComponent.get('deliveryGroups')).value)
        .subscribe((response) => {
          this.success = JSON.parse(JSON.stringify(response)).message
          while ((<FormArray>this.deliveryGroupComponent.get('deliveryGroups')).length > 0) {
            (<FormArray>this.deliveryGroupComponent.get('deliveryGroups')).removeAt(0);
          }
          this.entrData = true;
          this.confirm = false;
          this.submitted = false;
          $("#success").show('fast');
          this.reset();
        },
          (error) => {
            this.success = JSON.parse(JSON.stringify(error)).error.message;
            this.entrData = true;
            this.confirm = false;
            $("#error").show('fast')
            return;
          }

        )
    } else {

      return;
    }

  }

  isInput() {
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
  }

  cancel() {
    this.entrData = true;
    this.confirm = false;
  }

  reset() {
    this.deliveryGroupComponent = this.formBuilder.group({
      groupCode: '',
      groupName: '',
      groupDescription: '',
      groupDeliveryChannel: '',
      groupTransactionChannel: '',
      groupDeliveryChannelDesc: '',
      groupTransactionChannelDesc:'',
      insertedBy: [sessionStorage.getItem('user'), Validators.required],
      modifiedBy: '',
      insertedDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedDate: '',
      deliveryGroups: this.formBuilder.array([])
    })

    while ((<FormArray>this.deliveryGroupComponent.get('deliveryGroups')).length > 0) {
      (<FormArray>this.deliveryGroupComponent.get('deliveryGroups')).removeAt(0);
    }
  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

}
