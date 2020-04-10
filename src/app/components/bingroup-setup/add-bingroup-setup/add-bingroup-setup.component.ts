import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
//import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PlasticSetupServiceService } from 'src/app/services/plastic-setup/plastic-setup-service.service';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/DataService';

import * as $ from 'jquery';
import { BinGroupService } from 'src/app/services/bin-group.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-add-bingroup-setup',
  templateUrl: './add-bingroup-setup.component.html',
  styleUrls: ['./add-bingroup-setup.component.css']
})
export class AddBingroupSetupComponent implements OnInit {

  binGroupSetup: FormGroup;
  submitted = false;
  binGroupData: any = {};
  private binData: any[] = [];
  private isConfirm: boolean = false;
  private isDataEntry: boolean = true;
  private rangeError: boolean = false;
  binCurrency = [];
  transactionCurrency = [];
  plasticCodeName = [];
  bindetails: any[] = null;
  binGroupDetails: any = {};
  private binConfirm = null;
  private binRangeTo = null;
  private binRangeFrom = null;

  
  private success: string = "";
  private isgroupCodeExist: boolean = false;

  private confirmData = {
    binCode: '',
    binGroupDesc: '',
    binGroupName: '',
    bin: '',
    binDesc: '',
    binCurrency: '',
    binSettlementCurrency: '',
    settlementType: '',
    rangeFrom: '',
    rangeTo: '',
    totalCard: '',
    transactionSettlementCurrency: [],
    plasticCode: []
  }

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private plasticService: PlasticSetupServiceService, private bingroupService: BinGroupService) {

    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }

  }

  ngOnInit() {
    this.getBinCurrency();
    this.getBinData();
    this.getTransactionSettlementCurrency();
    this.getPlasticCodelist();
    this.binGroupSetup = this.formBuilder.group({
      groupCode: ['', [Validators.required, Validators.minLength(6)]],
      binGroupDescription: ['', Validators.required],
      binGroupName: ['', Validators.required],
      bin: ['', Validators.required],
      binDesc: ['', Validators.required],
      binCurrency: ['', Validators.required],
      binSettlement: ['', Validators.required],
      binSettlementType: ['', Validators.required],
      binRangeFrom: ['', Validators.required],
      binRangeFrom1: ['', [Validators.required, Validators.minLength(2)]],
      binRangeFrom2: ['', [Validators.required, Validators.minLength(4)]],
      binRangeFrom3: ['', [Validators.required, Validators.minLength(3)]],
      binRangeFrom4: ['0', Validators.required],
      binRangeTo: ['', Validators.required],
      binRangeTo1: ['', [Validators.required, Validators.minLength(2)]],
      binRangeTo2: ['', [Validators.required, Validators.minLength(4)]],
      binRangeTo3: ['', [Validators.required, Validators.minLength(3)]],
      binRangeTo4: ['9', Validators.required],
      totalNumberOfCards: ['', Validators.required],
      transactionSettlementCurrency: ['', Validators.required],
      plasticCode: ['', Validators.required],
      insertedBy: sessionStorage.getItem('user'),
      insertedDate:[formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedBy:null,
      modifiedDate:null,
      grouptable: this.formBuilder.array([])

    });
  }

  inputValue() {
    let data: string = this.binGroupSetup.get('binRangeTo3').value;
    this.rangeError = false;
    $("input[name='binRangeTo1']").removeAttr('style')
    $("input[name='binRangeTo2']").removeAttr('style')
    $("input[name='binRangeTo3']").removeAttr('style')
    if (data.length == 3) {
      let rangeFrom = this.binGroupSetup.get('binRangeFrom').value;
      rangeFrom += this.binGroupSetup.get('binRangeFrom1').value;
      rangeFrom += this.binGroupSetup.get('binRangeFrom2').value;
      rangeFrom += this.binGroupSetup.get('binRangeFrom3').value;
      rangeFrom += this.binGroupSetup.get('binRangeFrom4').value;
      let rangeTo = this.binGroupSetup.get('binRangeTo').value;
      rangeTo += this.binGroupSetup.get('binRangeTo1').value;
      rangeTo += this.binGroupSetup.get('binRangeTo2').value;
      rangeTo += data;
      rangeTo += this.binGroupSetup.get('binRangeTo4').value;

      let numOfCard = Number(rangeTo) - Number(rangeFrom);

      if (numOfCard <= 0) {
        this.rangeError = true;
        $("input[name='binRangeTo1']").css('border', '1px solid red');
        $("input[name='binRangeTo2']").css('border', '1px solid red');
        $("input[name='binRangeTo3']").css('border', '1px solid red');
        return;
      } else {
        this.binRangeTo = rangeTo;
        this.binRangeFrom = rangeFrom;
        this.binGroupSetup.patchValue({
          totalNumberOfCards: numOfCard
        })
      }

    }

  }

  removeStyle() {
    this.rangeError = false;
    $("input[name='binRangeTo1']").removeAttr('style')
    $("input[name='binRangeTo2']").removeAttr('style')
    $("input[name='binRangeTo3']").removeAttr('style')
  }
  getTransactionSettlementCurrency() {
    this.plasticService.getCurrencyData().subscribe(data => {
      this.transactionCurrency = data.list;
    },
      error => {

      });
  }

  getPlasticCodelist() {
    this.plasticService.getPlasticCodelist().subscribe(data => {
      this.plasticCodeName = data.list;
    });
  }
  getBinCurrency() {
    this.plasticService.getCurrencyData().subscribe(data => {
      this.binCurrency = data.list;
    });
  }



  getBindetails() {
    let binnumber = this.binGroupSetup.get('bin').value
    this.resetes();
    if(binnumber){
    this.plasticService.getBinDetails(binnumber).subscribe(response => {
      let bindetails = JSON.parse(JSON.stringify(response.data));
      this.binGroupSetup.patchValue({
        binDesc: bindetails.cmsBinDiscription,
        binCurrency: bindetails.cmsBinCurrency,
        binSettlement: bindetails.cmsSettlementCurrency,
        binRangeFrom: bindetails.cmsBinrangeFrom,
        binRangeTo: bindetails.cmsBinrangeTo
      })

    },
    (error)=>{
      this.resetes();
    })
  }else{
    this.resetes();
  }
  }
  get f() { return this.binGroupSetup.controls; }
  submitBinGroupData() {
    this.submitted = true;
    if (this.binGroupSetup.invalid) {
      return false;
    }
    let groupdata = JSON.parse(JSON.stringify(this.binGroupSetup.value))
    groupdata.binRangeTo = this.binRangeTo;
    groupdata.binRangeFrom = this.binRangeFrom;
    groupdata.bin = this.binData.filter(res => res.binSetupId == groupdata.bin)[0].binNumber

    this.plasticService.submitBinGroupData(groupdata).subscribe(data => {
      this.success=JSON.parse(JSON.stringify(data)).message;
      this.binGroupSetup.reset();     
      this.cancel()
      this.submitted = false;
      $("#success").show('fast');
    },
      error => {
        this.success = JSON.parse(JSON.stringify(error)).error.message;
        $("#error").show('fast')
        return;
      });

  }



  confirmForm() {

    this.submitted = true;
    if (this.binGroupSetup.invalid) {
      return false;
    }
   
    this.bingroupService.isExist(
      this.binGroupSetup.get('insertedBy').value,
      this.binGroupSetup.get('groupCode').value
      
    )
      .subscribe(
        (response) => {
          let dataRes=JSON.parse(JSON.stringify(response)).data
          if(dataRes){
            $("input[name='groupCode']").css('border', '1px solid red');
            this.isgroupCodeExist = true;
            return;
          }
          this.isDataEntry = false;
          this.isConfirm = true;
          this.binConfirm = this.binGroupSetup.value;
          this.binConfirm.binRangeFrom = this.binRangeFrom;
          this.binConfirm.binRangeTo = this.binRangeTo;
        },
        (error) => {
          this.isDataEntry = false;
          this.isConfirm = true;
          this.binConfirm = this.binGroupSetup.value;
          this.binConfirm.binRangeFrom = this.binRangeFrom;
          this.binConfirm.binRangeTo = this.binRangeTo;
        }
      )


  }




  submitFormGroup() {
    this.binGroupData.selectBin = this.binGroupSetup.get('bin').value;
    this.plasticService.addBinGroup(this.binGroupData).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).message);
      this.binGroupSetup.reset();
      this.binGroupData = null;
    },
      error => {

      });
  }

  getBinData() {
    var requestData = {
      "cmsBinNumber": '8888888'
    }
    this.plasticService.getBinData(requestData).subscribe(data => {
      this.binData = data.list;
    },
      error => {

      });
  }


resetes(){
  this.binGroupSetup.patchValue({
    binDesc: '',
    binCurrency: '',
    binSettlement: '',
    binRangeFrom: '',
    binRangeTo: ''
  }) 
}

  reset() {
    this.getBinCurrency();
    this.getBinData();
    this.getTransactionSettlementCurrency();
    this.getPlasticCodelist();
    this.binGroupSetup = this.formBuilder.group({
      groupCode: ['', [Validators.required, Validators.minLength(6)]],
      binGroupDescription: ['', Validators.required],
      binGroupName: ['', Validators.required],
      bin: ['', Validators.required],
      binDesc: ['', Validators.required],
      binCurrency: ['', Validators.required],
      binSettlement: ['', Validators.required],
      binSettlementType: ['', Validators.required],
      binRangeFrom: ['', Validators.required],
      binRangeFrom1: ['', [Validators.required, Validators.minLength(2)]],
      binRangeFrom2: ['', [Validators.required, Validators.minLength(4)]],
      binRangeFrom3: ['', [Validators.required, Validators.minLength(3)]],
      binRangeFrom4: ['0', Validators.required],
      binRangeTo: ['', Validators.required],
      binRangeTo1: ['', [Validators.required, Validators.minLength(2)]],
      binRangeTo2: ['', [Validators.required, Validators.minLength(4)]],
      binRangeTo3: ['', [Validators.required, Validators.minLength(3)]],
      binRangeTo4: ['9', Validators.required],
      totalNumberOfCards: ['', Validators.required],
      transactionSettlementCurrency: ['', Validators.required],
      plasticCode: ['', Validators.required],
      insertedBy: sessionStorage.getItem('user'),
      insertedDate:[formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'), Validators.required],
      modifiedBy:null,
      modifiedDate:null,
      grouptable: this.formBuilder.array([])

    });
  }
  cancel() {
    this.confirmData = {
      binCode: '',
      binGroupDesc: '',
      binGroupName: '',
      bin: '',
      binDesc: '',
      binCurrency: '',
      binSettlementCurrency: '',
      settlementType: '',
      rangeFrom: '0',
      rangeTo: '9',
      totalCard: '',
      transactionSettlementCurrency: [],
      plasticCode: []
    }
    this.isConfirm = false;
    this.isDataEntry = true;
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
    this.submitted = false;
  }
  
  isInput() {
    $("input[name='groupCode']").removeAttr('style');
    this.isgroupCodeExist = false;
  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

}
