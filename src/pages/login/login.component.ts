import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { LoginService } from "../../app/services/login.service";
import { LocalStorageService } from "angular-2-local-storage";
import { Router } from "@angular/router";
import { ApiService } from "../../app/services/api-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  errorMsg = null;
  successMsg = null;
  public loginForm: FormGroup;
  get token() {
    return localStorage.getItem("token");
  }
  error: any;
  error_msgs: any;
  constructor(
    private title: Title,
    private api: ApiService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    localStorage.setItem('token', '');
    if (this.token)
      this.router.navigate(["/dashboard/home"], { replaceUrl: true });
    this.title.setTitle("Login");
  }

  initForm() {
    let formvalidation = {
      email: ["", [<any>Validators.required]],
      password: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(6),
          <any>Validators.maxLength(20)
        ]
      ]
    };

    this.loginForm = this.formbuilder.group(formvalidation);

    this.error_msgs = {
      email: {
        required: "this field is required"
      },
      password: {
        required: "this field is required",
        minlength: "this field must be 6 to 20 characters long",
        maxlength: "his field must be 6 to 20 characters long"
      }
    };
    this.initErrorObj();
  }

  ngOnInit() {
    this.initForm();
  }

  initErrorObj() {
    this.error = {
      email: [],
      password: []
    };
  }

  public login(body, valid, form) {
    this.initErrorObj();
    if (!valid) {
      let errors_email = form.controls.email.errors;
      let errors_password = form.controls.password.errors;
      if (errors_email)
        for (let key in errors_email) {
          this.error.email.push(this.error_msgs.email[key]);
        }
      if (errors_password)
        for (let key in errors_password) {
          this.error.password.push(this.error_msgs.password[key]);
        }
      return;
    }

    const request = this.api
      .postData(`/user/login`, body, "application/json", false)
      .map(res => {
        localStorage.setItem("token", res.data["token"]);
        localStorage.setItem("username", res.data["username"]);
        //localStorage.setItem("logoUrl", res.data["logoUrl"]);
        console.log(res);
        return { status: res.status, data: res.data };
      });

    request.subscribe(res => {
      if (res.status === 200) {
        this.successMsg = "Logged in Successfully";
        localStorage.setItem("token", res.data.token);
        this.router.navigateByUrl("/dashboard/home");
      }

      if (res.status != 200) {
        if (!res.data.message)
          return (this.errorMsg = "Wrong Email or Password");

        return (this.errorMsg = res.data.error);
      }
    });
  }
}
