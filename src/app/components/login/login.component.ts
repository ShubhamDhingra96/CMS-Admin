import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Message } from '../../domain/Message';
import * as $ from 'jquery';
import { JSONFilter } from '../../filters/JSONFilter';
import { environment } from 'src/environments/environment.prod';
import { Errors } from '../../filters/Errors';
import { Route, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { DialogService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public message_title: string = "";
  public message_body: string = "";
  public submitted: boolean = false;
  public loading: string = "";
  public message: Message = null;
  private error: Errors;
  private errors: any = [];
  private display: string = "none";
  private errorss: string = "";
  private isError: boolean = false;
  constructor(private fb: FormBuilder,
    private loginService: LoginService, private router: Router, public dialogService: DialogService,
  ) {
    sessionStorage.clear();
    this.error = new Errors();

    $(document).ready(function () {
      $('.report-child').show();
      $('.reports').on('click', function () {
        $(this).toggleClass('active-menuitem');
        $('.report-child').toggle('fast');
      });


      $('.close').on('click', function () {
        $("#message").hide('fast');
      });

      $('#close').on('click', function () {
        $("#message").hide('fast');
      })

      $('input').focus(function () {
        $(this).parents('.form-group').addClass('focused');
      });

      $('input').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
          $(this).removeClass('filled');
          $(this).parents('.form-group').removeClass('focused');
        } else {
          $(this).addClass('filled');
        }
      })
    });

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(environment.alphaNumAt), Validators.minLength(6), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.pattern(environment.alphaNumAt), Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  public checkLogin() {
    if (this.loginForm.valid) {
      let username: string = this.loginForm.get('username').value;
      let password: string = this.loginForm.get('password').value;
      //var encrypt = CryptoJS.AES.encrypt(username,'sanjeev');

      let filter = new JSONFilter();
      this.loginService.login(username, password)
        .subscribe(
          (response) => {
            this.message = filter.parseJSON(filter.stringifyJSON(response))
            sessionStorage.setItem('access_token', this.message.access_token);
            sessionStorage.setItem('session', this.message.session);
            sessionStorage.setItem('role', this.message.role);
            sessionStorage.setItem('user', this.message.message)
            this.router.navigate(['/dashboard'])
          },
          (error) => {
            this.isError = true;
            this.errorss = error.error.message

          })

    } else {


      this.submitted = true;
      this.message_body = "Please enter valid data.";
      this.message_title = "SERVER ERROR";
      $("#message").show('fast');

    }
  }
  enterData() {
    this.isError = false;
  }



}
