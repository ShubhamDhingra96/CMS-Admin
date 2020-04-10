import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AccessrightsService } from 'src/app/services/accessrights.service';
import { ClientService } from 'src/app/services/client.service';
import { LoginService } from 'src/app/services/login.service';
import { DialogService } from 'primeng/api';
import { SuccessMessageComponent } from '../../success-message/success-message.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assign-entity-right',
  templateUrl: './assign-entity-right.component.html',
  styleUrls: ['./assign-entity-right.component.css'],
  providers: [DialogService]
})
export class AssignEntityRightComponent implements OnInit {
  private roles: any[] = [];
  private checked: boolean = false;
  private checked1: boolean = false;
  private accessRight: FormGroup;
  private isEntity = false;
  private createUser = false;
  private entity: any[] = [];
  private client: any = {};
  private entityName: string;
  private entityCountry: string;
  private entityState: string;
  private entityCity: string;
  private selectEntityForm: FormGroup;
  private clientId = null;
  private display: string = "none";

  private success: string = "";

  //private display:boolean=false;

  constructor(private dataServce: DataService, private router: Router, private successService: DialogService, private loginService: LoginService, private formBuilder: FormBuilder, private accessrightService: AccessrightsService) {
    if (sessionStorage.getItem('user')) { }
    else {
      this.router.navigate(['/']);
      this.dataServce.getFlag(false)
    }

    this.selectEntityForm = this.formBuilder.group({
      entity: ['']
    })
    this.dataServce.rolesDataObject.subscribe(data => {
      this.accessRight = this.formBuilder.group({
        roles: this.formBuilder.array([])
      })
      this.roles = data;
      this.addMenu(this.roles)
    })


    this.loginService.getAllUser().subscribe
      ((response) => {
        this.entity = JSON.parse(JSON.stringify(response)).list;
      })

    this.isEntity = true;

  }

  ngOnInit() {
    this.dataServce.getFlag(true)
  }

  check(value) {
    alert(value)
  }

  changeRoles(rolesid, flag) {
    (<FormArray>this.accessRight.get('roles')).at(rolesid).patchValue({
      isChecked: flag
    })
  }

  changeFunctions(pid, id, flag) {
    (<FormArray>(<FormArray>this.accessRight.get('roles')).at(pid).get('functions')).at(id).patchValue({
      isChecked: flag
    })
  }

  changejobs(pid, sid, cid, flag) {
    (<FormArray>(<FormArray>(<FormArray>this.accessRight.get('roles')).at(pid).get('functions')).at(sid).get('cmsMJobsMappingList')).at(cid).patchValue({
      isChecked: flag
    })
  }

  change() {
    this.checked = !this.checked;
  }

  addMenu(data) {
    let menuIndex = 0;

    for (let menu of data) {
      (<FormArray>this.accessRight.get('roles')).push(this.addMenuArray(menu));
      let subMenuIndex = 0;
      for (let submenu of menu.cmsFunctionsList) {
        (<FormArray>(<FormArray>this.accessRight.get('roles')).at(menuIndex).get('functions')).push(this.addSubmenuArray(submenu));
        for (let url of submenu.cmsJobsList) {
          (<FormArray>(<FormArray>(<FormArray>this.accessRight.get('roles')).at(menuIndex).get('functions')).at(subMenuIndex).get('cmsMJobsMappingList')).push(this.addSubSubmenuArray(url, url.jobUrl));
        }
        subMenuIndex++;
      }
      menuIndex++;
    }

    console.log(this.accessRight.value);

  }

  addMenuArray(data): FormGroup {
    return this.formBuilder.group({
      moduleName: data.moduleName,
      moduleId: data.moduleId,
      assignuser: data.clientUser,
      user: sessionStorage.getItem('user').toString(),
      clientid: data.clientId,
      isChecked: data.isChecked,
      mId: data.mId,
      insertedDate: data.insertedDate,
      modifiedDate: data.modifiedDate,
      insertedBy: data.insertedBy,
      modifiedBy: data.modifiedBy,
      status: data.status,
      functions: this.formBuilder.array([])
    })
  }


  addSubmenuArray(data): FormGroup {
    return this.formBuilder.group({
      cmsMFunctionName: data.functionName,
      cmsMFunctionId: data.functionId,
      isChecked: data.isChecked,
      mId: data.mId,
      insertedDate: data.insertedDate,
      modifiedDate: data.modifiedDate,
      insertedBy: data.insertedBy,
      modifiedBy: data.modifiedBy,
      status: data.status,
      fId: data.fId,
      cmsMJobsMappingList: this.formBuilder.array([])
    })
  }


  addSubSubmenuArray(data, url): FormGroup {
    return this.formBuilder.group({
      isChecked: data.isChecked,
      jobName: data.jobName,
      jobId: data.jobId,
      jobUrl: url,
      insertedDate: data.insertedDate,
      modifiedDate: data.modifiedDate,
      insertedBy: data.insertedBy,
      modifiedBy: data.modifiedBy,
      status: data.status,
      fId: data.fId,
      jId: data.jId
    })
  }

  save() {
    let data = this.accessRight.value;
    for (let singleData of data.roles) {
      singleData.clientid = this.clientId;
      singleData.assignuser = this.entityName;

    }
    this.accessrightService.save(data)
      .subscribe((response) => {
        response = JSON.parse(JSON.stringify(response));
        while ((<FormArray>this.accessRight.get('roles')).length > 0) {
          (<FormArray>this.accessRight.get('roles')).removeAt(0);
        }
        this.success = response.message
        this.roles = response.data;
        this.addMenu(this.roles)
        $('#success').show('fast')
      }, (error) => {
        this.success = error.error.message;
        $('#error').show('fast');
        return;
      })
  }
  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

  selectEntity() {
    let entity = this.entity.filter(res => res.username == this.selectEntityForm.get('entity').value);
    this.client = entity[0];
    this.isEntity = false;
    this.createUser = true;
    this.entityName = entity[0].username;
    this.entityCountry = entity[0].country;
    this.entityState = entity[0].state;
    this.entityCity = entity[0].city;
    this.clientId = entity[0].cmsClientId.cmsClientId;
    this.updateListOfAccess(this.entityName);
    this.setJquery();

  }

  updateListOfAccess(username) {
    this.accessrightService.getMenu(username)
      .subscribe((response) => {
        let data = JSON.parse(JSON.stringify(response)).list
        for (let menu of data) {

          for (let x = 0; x < this.roles.length; x++) {
            if (this.roles[x].moduleId == menu.moduleId) {

              this.roles[x].moduleId = menu.moduleId;
              this.roles[x].assignuser = menu.clientUser;
              this.roles[x].clientid = menu.clientId;
              this.roles[x].insertedBy = menu.insertedBy;
              this.roles[x].insertedDate = menu.insertedDate;
              this.roles[x].isChecked = menu.isChecked;
              this.roles[x].mId = menu.mId;
              this.roles[x].modifiedBy = menu.modifiedBy;
              this.roles[x].modifiedDate = menu.modifiedDate;
              this.roles[x].moduleId = menu.moduleId;
              this.roles[x].moduleName = menu.moduleName;
              this.roles[x].status = menu.status;
              this.roles[x].cmsFunctionsList = this.getFunctions(menu, this.roles[x].cmsFunctionsList)
              break;
            }
          }
        }

        while ((<FormArray>this.accessRight.get('roles')).length > 0) {
          (<FormArray>this.accessRight.get('roles')).removeAt(0);
        }
        this.addMenu(this.roles)
      })
  }
  getFunctions(menu: any, submenus: any[]): any[] {
    let data: any[] = [];
    let set = new Set();

    for (let sub of submenus) {

      for (let submenu of menu.cmsFunctionsList) {

        if (submenu.functionId === sub.functionId) {
          sub.cmsMFunctionName = submenu.functionName,
            sub.cmsMFunctionId = submenu.functionId,
            sub.isChecked = submenu.isChecked,
            sub.mId = submenu.mId,
            sub.insertedDate = submenu.insertedDate,
            sub.modifiedDate = submenu.modifiedDate,
            sub.insertedBy = submenu.insertedBy,
            sub.modifiedBy = submenu.modifiedBy,
            sub.status = submenu.status,
            sub.fId = submenu.fId,
            sub.cmsJobsList = this.setjobs(sub.cmsJobsList, submenu.cmsJobsList);

          if (!set.has(sub.functionId)) {
            set.add(sub.functionId)
            data.push(sub)
          }
          break;
        } else {
          if (!set.has(sub.functionId)) {
            set.add(sub.functionId)
            data.push(sub)
          }

        }

      }
    }

    return data;
  }
  setjobs(cmsJobsList: any[], menucmsJobsList: any[]): any[] {
    let data: any[] = [];
    let set = new Set();

    for (let sub of cmsJobsList) {

      for (let submenu of menucmsJobsList) {

        if (submenu.jobId === sub.jobId) {
          sub.jobName = submenu.jobName,
            sub.jobId = submenu.jobId,
            sub.isChecked = submenu.isChecked,
            sub.insertedDate = submenu.insertedDate,
            sub.modifiedDate = submenu.modifiedDate,
            sub.insertedBy = submenu.insertedBy,
            sub.modifiedBy = submenu.modifiedBy,
            sub.status = submenu.status,
            sub.fId = submenu.fId,
            sub.jId = submenu.jId;

          if (!set.has(sub.jobId)) {
            set.add(sub.jobId)
            data.push(sub)
          }

        } else {
          if (!set.has(sub.jobId)) {
            set.add(sub.jobId)
            data.push(sub)
          }

        }

      }
    }

    return data;
  }

  setJquery() {
    var self = this;
    $(document).ready(function () {
      $('.menu').on('click', function () {

        let flag = this.checked;
        let parent = $(this).attr('name');
        let parentId = $(this).attr('value');
        if (parent === "roles") {
          self.changeRoles(parentId, flag);
        }
        let subparent;
        let subparentId;
        $(this).parent().find("ul li input[type='checkbox']").each(function (index) {
          this.checked = flag;
          let child = $(this).attr('name');
          let childId = $(this).attr('value');
          if (child === "functions") {
            subparent = child;
            subparentId = childId;
            self.changeFunctions(parentId, subparentId, flag);
          } else if (child === "cmsMJobsMappingList") {
            self.changejobs(parentId, subparentId, childId, flag);
          }
        })
      });

      $('.submenu').on('click', function () {

        let flag = this.checked;
        let subparent = $(this).attr('name');
        let subparentId = $(this).attr('value');
        $(this).parent().parent().parent().find("input[name='roles']").each(function (index) {
          this.checked = true;
          self.changeRoles($(this).attr('value'), true);
        })

        $(this).parent().find("input[name='roles']").each(function (index) {

          let parent = $(this).attr('name');
          let parentId = $(this).attr('value');
          $(this).parent().find("ul li input[type='checkbox']").each(function (index) {
            this.checked = flag;
            let child = $(this).attr('name');
            let childId = $(this).attr('value');
            //console.log(parent + " " + parentId + " " + subparent + " " + subparentId + " " + child + " " + childId);
            self.changejobs(parentId, subparentId, childId, flag);
          })
        });


      });

    });
  }

  openModalDialog() {
    this.display = 'block'; //Set block css
  }

  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
  }





}
