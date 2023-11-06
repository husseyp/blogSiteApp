import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import  *  as CryptoJS from  'crypto-js';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder,private apiService: ApiService,
              private router : Router,private utilsService : UtilsService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {

    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.getRawValue(),'got value');

    let formValue = this.loginForm.getRawValue();

    this.apiService.createServerData('postLogin',formValue).subscribe({
      next : (resData) => {
          console.log(resData,'got my res data');
          
          let userData = { 
            first_name : resData.first_name,
            email : resData.email ,
            last_name :  resData.last_name,
          }
          localStorage.setItem('userDetails',JSON.stringify(userData));

          let encryptedToken = this.utilsService.encrypt(resData.token)
          localStorage.setItem('userToken',JSON.stringify(encryptedToken));

          this.utilsService.showSuccess('Login Successful')
          this.utilsService.login();

          this.router.navigate(['blog-data'])
      },
      error : (err) => {
        console.log(err,'got my err data');
        this.utilsService.showError('Invalid Credentials')

      },
    })
  }

  ngDestroy() {
    this.initLoginForm()
  }

}
