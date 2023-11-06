import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from "../../../_helpers/must-match.validator";
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {
  submitted = false;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private apiService:ApiService,
              private router : Router,private utilsService : UtilsService) {
    
  }

  ngOnInit(): void {

    this.initRegisterForm()


  }

  initRegisterForm() {

    this.registerForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
    },{ validator: MustMatch("password", "confirmPassword") } );

  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.getRawValue(),'got value');

    let formValue = this.registerForm.getRawValue();
    this.apiService.createServerData('postRegister',formValue).subscribe({
      next : (resData) => {

        this.utilsService.showSuccess('Register Successful')
          this.router.navigate(['login'])
      },
      error : (err) => {
        console.log(err,'got my err')
        this.utilsService.showError(err.message)

        this.router.navigate(['login'])
      },
    })
  }

  ngDestroy() {
    this.initRegisterForm()
  }

}
