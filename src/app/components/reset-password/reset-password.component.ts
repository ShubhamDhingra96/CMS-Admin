import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Routes, ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Passwordmatch } from '../passwordmatch';
import { DataService } from 'src/app/DataService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private changeForm: FormGroup;
  private param1: any;
  private isReset: boolean = false;
  private isNotReset: boolean = false;
  private submitted: boolean = false;
  private mail:boolean=false;

  constructor(private formBuilder: FormBuilder, private routes:Router, private route: ActivatedRoute, private loginService: LoginService,private dataService:DataService,private router: Router) {
    // if (sessionStorage.getItem('user')) {
    //   this.dataService.getFlag(true)
    // }
    // else {
    //   this.router.navigate(['/']);
    //   this.dataService.getFlag(false)
    // }
    this.changeForm = this.formBuilder.group({
      username: [''],
      confirmPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      tokenKey: ['']
    },
      {
        validators: Passwordmatch.matchPassword
      })
     
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.param1 = params['key'];
    });
    this.loginService.checkKeyLink(this.param1).subscribe(
      (response) => {
        let data = JSON.parse(JSON.stringify(response));

        if (data.flag == 0) {
          this.isReset = false;
          this.isNotReset = true;
        } else {
          this.isReset = true;
          this.isNotReset = false;
          this.changeForm.patchValue({
            tokenKey: this.param1
          })
        }

      }
    )
  }

  resetPassword() {
    this.submitted = true;
    if (this.changeForm.invalid)
      return;
    this.loginService.resetPassword(this.changeForm.value)
      .subscribe((response) => {
        this.changeForm.reset();
        alert('You have successfully reset password;');
        this.routes.navigate(['']);
      })
  }

}
