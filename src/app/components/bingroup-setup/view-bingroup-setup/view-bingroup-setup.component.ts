import { Component, OnInit } from '@angular/core';
import { PlasticSetupServiceService } from 'src/app/services/plastic-setup/plastic-setup-service.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { BinGroupService } from 'src/app/services/bin-group.service';


@Component({
  selector: 'app-view-bingroup-setup',
  templateUrl: './view-bingroup-setup.component.html',
  styleUrls: ['./view-bingroup-setup.component.css']
})
export class ViewBingroupSetupComponent implements OnInit {

  cmsbingroupsetup = [];
  private error: boolean = false;
  private message: string = "";
  private isEntity = false;
  private isView = false;
  private entity: any[] = [];
  private selectEntityForm: FormGroup;
  binGroupData = [];

  constructor(private loginService: LoginService,private formBuilder: FormBuilder,private dataService: DataService, private router: Router,private plasticService: PlasticSetupServiceService,private binGroupService: BinGroupService) { 

    if (sessionStorage.getItem('user')) { 
      this.isEntity = true;
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
  }

  selectEntity(){
    
    let data = this.selectEntityForm.get('entity').value;
    if(data){
      this.isEntity = false;
      this.isView = true;
      this.binGroupService.getSpecificBinGroupDetails(data)
        .subscribe((response) => {
         
          this.binGroupData = JSON.parse(JSON.stringify(response)).list
          if(this.binGroupData.length<=0){
            this.error = true;
            this.message = "No record found.";
           }
          console.log(this.binGroupData)
        })
    }
  }

  ngOnInit() {
   //this.getBinGroupSetUpDetails();
   this.selectEntityForm = this.formBuilder.group({
    entity: ['']
  })
  this.dataService.getFlag(true)

    if (sessionStorage.getItem('user') === 'cmsadmin') {
      console.log('yes admin')
      this.loginService.getAllUser().subscribe
        ((response) => {
          this.entity = JSON.parse(JSON.stringify(response)).list;
        })

      this.isEntity = true;
      this.isView = false;
    } else {
      this.isEntity = false;
      this.isView = true;
      this.binGroupService.getSpecificBinGroupDetails(sessionStorage.getItem('user'))
        .subscribe((response) => {
          this.binGroupData = response.list
          if(this.binGroupData.length<=0){
            this.error = true;
            this.message = "No record found.";
          }
        })
    }
  }

  getBinGroupSetUpDetails() {
    this.plasticService.getBinGroupSetUpDetails().subscribe(data => {
       this.cmsbingroupsetup = data.list;
       if(this.cmsbingroupsetup.length<=0){
        this.error = true;
        this.message = "No record found.";
      }
     },
       error => {
        this.error = true;
        this.message = error.error.message;
       });
   }
}
