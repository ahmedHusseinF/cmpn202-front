import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoginService } from '../../app/services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMsg = null;
  successMsg = null;
  public loginForm: FormGroup;
  get token() {
    return localStorage.getItem('token');
  }
  error:any;
  error_msgs:any;
  constructor(private title: Title, private service: LoginService,
    private localStorage: LocalStorageService, private formbuilder: FormBuilder,
    private router: Router) {
      if (this.token) this.router.navigate(['/dashboard/home'], { replaceUrl: true });
    this.title.setTitle("Login");
  }


  initForm() {
    let formvalidation = {
      user: ['', [<any>Validators.required, <any>Validators.minLength(9), <any>Validators.maxLength(11)]],
      mpin: ['', [<any>Validators.required, <any>Validators.minLength(6), <any>Validators.maxLength(9)]]
    };

    this.loginForm = this.formbuilder.group(formvalidation);

    this.error_msgs = {
      user:{
        required:'this field is required',
        minlength:'this field must be 9 to 11 digits long',
        maxlength:'his field must be 9 to 11 digits long'
      },
      mpin:{
        required:'this field is required',
        minlength:'this field must be 6 to 9 digits long',
        maxlength:'his field must be 6 to 9 digits long'
      }
    }
    this.initErrorObj();
  }

  ngOnInit() {
    this.initForm();
  }

  initErrorObj(){
    this.error = {
      user:[],
      mpin:[]
    }
  }


  public login(body, valid,form) {
    this.initErrorObj()
    if (!valid) {
      let errors_user = form.controls.user.errors;
      let errors_mpin = form.controls.mpin.errors;
      if(errors_user)
        for (let key in errors_user) {
          this.error.user.push(this.error_msgs.user[key]);
        };
      if(errors_mpin)
        for (let key in errors_mpin) {
          this.error.mpin.push(this.error_msgs.mpin[key]);
        };  
      return;
    }

    this.service.userLogin(body).subscribe((res) => {

      if (res.status == 200) {
        this.successMsg = "Logged in Successfully";
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('parent', res.data.parent);
        if(res.data.merchantActions)
          localStorage.setItem('merchantActions', JSON.stringify(res.data.merchantActions));
        this.router.navigateByUrl('/dashboard/home');
      }

      if (res.status != 200) {
        if (!res.data.message)
          return this.errorMsg = "Wrong Username or mPin";

        return this.errorMsg = res.data.message;
      }

    });
  }

}
