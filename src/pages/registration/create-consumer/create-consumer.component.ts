import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { Title } from "@angular/platform-browser";
import { LocalStorageService } from "angular-2-local-storage";
import { GlobalVariablesService } from "../../../app/services/global-variables.service";
import { ApiService } from "../../../app/services/api-service";

@Component({
  selector: "app-create-consumer",
  templateUrl: "./create-consumer.component.html",
  styleUrls: ["./create-consumer.component.css"]
})
export class CreateConsumerComponent implements OnInit {
  public customerForm: FormGroup;
  alreadyExist: boolean = false;
  nationalId: string;
  openView: boolean;
  validationMesseges: any;
  validationErrors: any;
  profiles: any;
  natIDNotFound: boolean = false;
  foundErr: boolean = false;
  searchMobileSubscribe: any;
  message: any;
  getProfilesSubscribe: any;

  //birthday : string = this.nationalId.slice(2,10);

  constructor(
    private title: Title,
    private localStorage: LocalStorageService,
    private formbuilder: FormBuilder,
    private api: ApiService,
    private globals: GlobalVariablesService
  ) {
    this.title.setTitle("Create Customer");
  }

  initForm() {
    let formvalidation = {
      MobileNumber: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(11),
          <any>Validators.maxLength(11)
        ]
      ],
      FirstName: ["", [<any>Validators.required]],
      MiddleName: ["", [<any>Validators.required]],
      LastName: ["", [<any>Validators.required]],
      national_id: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(14),
          <any>Validators.maxLength(14)
        ]
      ],
      NationalID: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(14),
          <any>Validators.maxLength(14)
        ]
      ],
      Password: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(6),
          <any>Validators.maxLength(20)
        ]
      ],
      Email: ["", [<any>Validators.required, <any>Validators.email]],
      Specialization: ["", [<any>Validators.required]],
      OrgTelNo: ["", []],
      City: ["", []],
      Governorate: ["", []],
      Building: ["", []],
      OrgName: ["", [<any>Validators.required]],
      OrgAddress: ["", [<any>Validators.required]]
    };

    this.validationMesseges = {
      MobileNumber: {
        required: "This Field is required"
      },
      Password: {
        required: "This Field is required",
        minLength: "Password has to be at least 6 characters long",
        maxLength: "Password has to be at most 20 characters long"
      },
      Email: {
        required: "This Field is required",
        email: "This isn't a proper Email"
      },
      OrgName: {
        required: "This Field is required"
      },
      OrgAddress: {
        required: "This Field is required"
      },
      Specialization: {
        required: "This Field is required"
      },
      NationalID: {
        required: "This Field is required"
      },
      FirstName: {
        required: "This Field is required"
      },
      MiddleName: {
        required: "This Field is required"
      },
      LastName: {
        required: "This Field is required"
      }
    };

    this.customerForm = this.formbuilder.group(formvalidation);
  }

  ngOnInit() {
    this.initForm();
  }

  search(nationalID) {
    const request = this.api
      .postData(`/user/checkNationalID`, { nationalID })
      .map(res => res.data);

    request.subscribe(res => {
      this.natIDNotFound = false;
      this.foundErr = true;

      if (res.userNotExist) {
        this.natIDNotFound = true;
        this.foundErr = false;
        this.customerForm.patchValue({
          national_id: nationalID
        });
        this.customerForm.controls.national_id.disable();
      }
    });
  }

  customer(body: any, valid: boolean, form: FormGroup) {
    console.log(body, valid, "body");
    this.validationErrors = null;

    if (!valid) {
      //console.log(form.controls);
      this.validationErrors = [];
      for (let key of Object.keys(form.controls)) {
        if (form.controls[key].errors) {
          this.validationErrors[key] = [];

          for (let keyy of Object.keys(form.controls[key].errors)) {
            this.validationErrors[key].push(this.validationMesseges[key][keyy]);
          }
        }
      }
      //console.log(this.validationErrors);
      return;
    }

    for (let param of body) {
      body[param].trim();
    }

    const request = this.api
      .postData(`/user/customer/create`, body)
      .map(res => res.data);

    request.subscribe(res => {
      //console.log(res, "res");
      if (res.status === 200) {
        this.globals.showModal(`Customer Created Successfully`);
      }
    });
  }

  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
