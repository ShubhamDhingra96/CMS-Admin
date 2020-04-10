import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  private selectUserForm: FormGroup;
  private mail: boolean = false;
  private submitted: boolean = false;
  private message: string = "";



  constructor(private formbuilder: FormBuilder, private loginService: LoginService, private dataService: DataService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.dataService.getFlag(true)
    }
    else {
      this.router.navigate(['/']);
      this.dataService.getFlag(false)
    }
    this.selectUserForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      confirmPassword: [''],
      newPassword: [''],
      tokenKey: ['']
    })
  }

  ngOnInit() {
    this.dataService.getFlag(true)
  }

  submit() {
    this.submitted = true;
    if (this.selectUserForm.invalid)
      return;
    this.loginService.sendResetPasswordLink(this.selectUserForm.value).subscribe(
      (response) => {
        this.selectUserForm.reset();
        this.submitted = false;
        //this.mail = true;
        this.message = response.message;
        $("#success").show('fast');
      },
      (error) => {
        this.message = JSON.parse(JSON.stringify(error)).error.message;        
        if(error.error.flag==1)
        $("input[name='username']").css('border','1px solid red')

        $("#error").show('fast');        
        return;
      }
    )
  }
  typed() {
    $("input[name='username']").removeAttr('style')
    //this.mail = false;
  }

  close() {
    $('#success').hide('fast')
    $('#error').hide('fast')
  }



}
