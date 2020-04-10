import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactiongroupService } from 'src/app/services/transactiongroup.service';
import { DataService } from 'src/app/DataService';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-view-transaction-grouping',
  templateUrl: './view-transaction-grouping.component.html',
  styleUrls: ['./view-transaction-grouping.component.css']
})
export class ViewTransactionGroupingComponent implements OnInit {

  private transactionGroup: FormGroup;
  private submitted = false;
  private isEntity:boolean = false;
  private isView:boolean = false;
  private transactionGroupData: [];
  private error: boolean = false;
  private message: string = "";
  private entity: any[] = [];

  constructor(private loginService: LoginService,private dataService: DataService,private router: Router,private fromBuilder: FormBuilder,private transactionService: TransactiongroupService)
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
    this.isEntity=true;
    this.transactionGroup = this.fromBuilder.group(
      {
        transactions: ['', Validators.required]
      }
    )

    if (sessionStorage.getItem('user') === 'cmsadmin') {
      console.log('yes admin')
      this.loginService.getAllUser().subscribe
        ((response) => {
          this.entity = JSON.parse(JSON.stringify(response)).list;
        })

      this.isEntity = true;
      this.isView = false;
    }
    else {
      this.isEntity = false;
      this.isView = true;
      this.transactionService.getSpecificTransactionGroupDetails(sessionStorage.getItem('user'))
        .subscribe((response) => {
          this.transactionGroupData = response.list
          if(this.transactionGroupData.length<=0){
            this.error = true;
            this.message = "No record found.";
          }
        })
    }

  }

  viewTransaction()
  {
    this.submitted = true;
    if (this.transactionGroup.invalid)
      return;
      
    let data = this.transactionGroup.get('transactions').value;
    console.log(data);
    if(data){
      this.isEntity = false;
      this.isView = true;

      //this.transactionService.getTransactionGrouping()
      this.transactionService.getSpecificTransactionGroupDetails(data)
      .subscribe((response) => {
       
        this.transactionGroupData = JSON.parse(JSON.stringify(response)).list
        console.log(this.transactionGroupData)
        if(this.transactionGroupData.length<=0){
          this.error = true;
          this.message = "No record found.";
         }
        console.log(this.transactionGroupData)
      })

  }
}

}
