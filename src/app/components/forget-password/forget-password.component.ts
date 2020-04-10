import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  private userForm: FormGroup;
  private errorMessage: string = "";
  private successMessage: string = '';
  private submitted: boolean = false;
  constructor(private formbuilder: FormBuilder, private loginService: LoginService, private dataService: DataService, private router: Router) {
    // if (sessionStorage.getItem('user')) {
    //   this.dataService.getFlag(true)
    // }
    // else {
    //   this.router.navigate(['/']);
    //   this.dataService.getFlag(false)
    // }
  }

  ngOnInit() {
    this.userForm = this.formbuilder.group({
      username: ['', Validators.required]
    })
  }

  submit() {
    this.submitted = true;
    if (this.userForm.invalid)
      return;
    this.loginService.getUser(this.userForm.get('username').value)
      .subscribe((response) => {
        let data = {
          username: this.userForm.get('username').value,
          tokenKey: '',
          newPassword: '',
          confirmPassword: ''
        }
        this.loginService.sendResetPasswordLink(data)
          .subscribe((response) => {
            this.submitted = false;
            this.errorMessage = ""
            this.successMessage = "Password link has been sent on registered email address."
          })
      },
        (error) => {
          this.submitted = false;
          this.successMessage = "";
          this.errorMessage = error.error.data
        });
  }

}
