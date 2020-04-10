import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from 'src/app/DataService';
import { TransactiongroupService } from 'src/app/services/transactiongroup.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-add-transaction-grouping',
  templateUrl: './add-transaction-grouping.component.html',
  styleUrls: ['./add-transaction-grouping.component.css']
})
export class AddTransactionGroupingComponent implements OnInit {

  private transactionGroup: FormGroup;
  private submitted = false;
  private transactionData: [];
  private confirmForm: any = null;
  private confirmTrans: boolean = false;
  private enterData:boolean = true;
  private success:string="";
  private isExistGroup: boolean = false;

  constructor(private dataService: DataService,private router: Router,private fromBuilder: FormBuilder,private transactionService: TransactiongroupService)
   {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }

   }

  ngOnInit() {
    this.getTransaction();
    this.transactionGroup = this.fromBuilder.group(
      {
        groupTransactionCode: '',
        groupTransactionName: '',
        transactions: '',
        insertedBy: sessionStorage.getItem('user'),
        transactiongroupTable: this.fromBuilder.array([])
      }
    )
  }

  getTransaction()
  {
    this.transactionService.getTransactionData().subscribe(
      (response) => {
        this.transactionData = JSON.parse(JSON.stringify(response)).list;
        console.log(this.transactionData);

      })
  }

  add() {

 this.submitted = true;
 this.addValidation();
 this.updateValidation();
    if (this.transactionGroup.invalid)
      return;

  this.transactionService.isExist(this.transactionGroup.get('insertedBy').value,
  this.transactionGroup.get('groupTransactionCode').value).subscribe(
    (response) => {
      let dataRes = JSON.parse(JSON.stringify(response)).data;
      console.log(dataRes)
      if (dataRes) {
        $("input[name='groupTransactionCode']").css('border', '1px solid red');
        this.isExistGroup = true;
        return;
      }

      let groupTransactionCode = this.transactionGroup.get('groupTransactionCode').value;
      let groupTransactionName = this.transactionGroup.get('groupTransactionName').value;
      let transactions = this.transactionGroup.get('transactions').value;
    
    (<FormArray>this.transactionGroup.get('transactiongroupTable')).push(this.addTransaction(groupTransactionCode, groupTransactionName, transactions))
      this.confirmForm = this.transactionGroup.value;
      
      console.log(this.confirmForm);
      this.submitted=false;
      this.resetTransactionEntry();

    },
    (error) => {
      let groupTransactionCode = this.transactionGroup.get('groupTransactionCode').value;
          let groupTransactionName = this.transactionGroup.get('groupTransactionName').value;
          let transactions = this.transactionGroup.get('transactions').value;
        
        (<FormArray>this.transactionGroup.get('transactiongroupTable')).push(this.addTransaction(groupTransactionCode, groupTransactionName, transactions))
          this.confirmForm = this.transactionGroup.value;
          
          console.log(this.confirmForm);
          this.submitted=false;
          this.resetTransactionEntry();
    }
  )
     
  }

  addTransaction(groupTransactionCode: any, groupTransactionName: any, transactions: any): FormGroup {
    return this.fromBuilder.group({
      groupTransactionCode: groupTransactionCode,
      groupTransactionName: groupTransactionName,
      transactions: transactions,
      insertedBy: sessionStorage.getItem('user'),
      modifiedby: '',
      modifiedon: '',
    })

}

resetTransactionEntry() {
  this.transactionGroup.patchValue({
    groupTransactionCode: '',
    groupTransactionName: '',
    transactions: '',
    insertedBy: sessionStorage.getItem('user'),
       
  })
}

remove(i) {
  (<FormArray>this.transactionGroup.get("transactiongroupTable")).removeAt(i);
}

confirmTransaction()
{
  if((<FormArray>this.transactionGroup.get('transactiongroupTable')).length==0)
 {
this.success="Please Add data.";
$('#error').show('fast')
   return ;
 }
 console.log(this.transactionGroup.get('insertedBy').value)
console.log(this.transactionGroup.get('groupTransactionCode').value)
  
 
this.confirmTrans=true;
this.enterData=false;
}

save()
{
 this.removeValidation();
 this.updateValidation();
 if((<FormArray>this.transactionGroup.get('transactiongroupTable')).length==0)
 {
this.success="Please Add data.";
$('#error').show('fast')
   return ;
 }

 
  let groupdata= JSON.parse(JSON.stringify(this.transactionGroup.get('transactiongroupTable').value))
  console.log(groupdata);
  this.transactionService.saveTransaction(groupdata).subscribe(data => {
    while ((<FormArray>this.transactionGroup.get('transactiongroupTable')).length > 0) {
      (<FormArray>this.transactionGroup.get('transactiongroupTable')).removeAt(0);
    }
  })
  this.confirmTrans=false;
  this.enterData=true;
  this.resetTransactionEntry();
}

cancel() {
  this.confirmForm = null;
  this.enterData = true;
  this.confirmTrans = false;
  this.submitted = false;
}

addValidation() {

    this.transactionGroup.get('groupTransactionCode').setValidators([Validators.required]),
    this.transactionGroup.get('groupTransactionName').setValidators([Validators.required,Validators.pattern(environment.nospecialchar)]),
    this.transactionGroup.get('transactions').setValidators([Validators.required])
  
}

removeValidation() {

  this.transactionGroup.get('groupTransactionCode').clearValidators();
  this.transactionGroup.get('groupTransactionName').clearValidators();
  this.transactionGroup.get('transactions').clearValidators();

}

updateValidation() {
 
     this.transactionGroup.get('groupTransactionCode').updateValueAndValidity();
     this.transactionGroup.get('groupTransactionName').updateValueAndValidity();
     this.transactionGroup.get('transactions').updateValueAndValidity();
   
 }
 close() {
  $('#success').hide('fast')
  $('#error').hide('fast')
}
}