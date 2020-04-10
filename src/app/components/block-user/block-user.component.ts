import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.css']
})
export class BlockUserComponent implements OnInit {

  private userFormSearch: FormGroup;
  private loginUser: any = {};
  private isUserSelect: boolean = true;
  private isUser: boolean = false;
  private status: string;
  private submitted: boolean = false;
  private showConfirm: boolean = false;
  private message: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService, private dataService: DataService) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
    this.userFormSearch = this.formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.dataService.getFlag(true);
  }


  submit() {
    this.submitted = true;
    if (this.userFormSearch.invalid)
      return;

    this.loginService.getUser(this.userFormSearch.get('username').value).subscribe
      ((response) => {
        this.loginUser = JSON.parse(JSON.stringify(response));
        if (this.loginUser.username) {
          this.isUserSelect = false;
          this.isUser = true;

          if (this.loginUser.passwordStatus == -1) this.status = 'Inactive';
          else if (this.loginUser.passwordStatus == 0) this.status = 'Active';
          else if (this.loginUser.passwordStatus == 1) this.status = 'Blocked';
          this.showConfirm = true;
        } else {
          this.isUserSelect = true;
          this.isUser = false;
        }
      }, (error) => {
        this.message = JSON.parse(JSON.stringify(error)).error.message;
        $("input[name='username']").css('border', '1px solid red');
        $("#error").show('fast');
        return;
      }


      )
  }

  save() {
    this.submitted = true;
    if (this.userFormSearch.invalid)
      return;
    this.showConfirm = false;
    if (this.loginUser.passwordStatus == -1) this.loginUser.passwordStatus = Number(-1);
    else if (this.loginUser.passwordStatus == 0) this.loginUser.passwordStatus = 1;
    else if (this.loginUser.passwordStatus == 1) this.loginUser.passwordStatus = 0;

    this.loginService.updateUser(this.loginUser)
      .subscribe((response) => {
        this.message = response.message;
        $("#success").show('fast');
        this.userFormSearch.reset();
      })

  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }

  typed() {
    $("input[name='username']").removeAttr('style');
  }


  cancel() {
    this.userFormSearch.reset();
    this.showConfirm = false;
  }

}
