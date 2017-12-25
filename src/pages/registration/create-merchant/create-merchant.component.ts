import { Component, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "../../../app/services/api-service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
declare var $: any;

import { FormsModule } from "@angular/forms";
import { GlobalVariablesService } from "../../../app/services/global-variables.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-create-merchant",
  templateUrl: "./create-merchant.component.html",
  styleUrls: ["./create-merchant.component.css"]
})
export class CreateMerchantComponent implements OnInit {
  staffForm: FormGroup;
  validationErrors: any;
  profiles: any;
  mobileNotFound: any;
  validationMesseges: any;
  nationalId: string;
  factories: any;
  foundErr: boolean;
  natIDNotFound: boolean;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private globals: GlobalVariablesService,
    private router: Router
  ) {
    this.title.setTitle("Create Staff");
  }

  search(nationalID) {
    const request = this.apiService
      .postData(`/user/checkNationalID`, { nationalID })
      .map(res => res.data);

    const sub = request.subscribe(res => {
      this.natIDNotFound = false;
      this.foundErr = true;

      if (res.userNotExist) {
        this.natIDNotFound = true;
        this.foundErr = false;
        this.staffForm.patchValue({
          national_id: nationalID
        });
        this.staffForm.controls.national_id.disable();
      }
    });
  }

  staff(body, valid, form) {
    //console.log(body, valid, "body");
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

    const request = this.apiService
      .postData(`/user/staff/create`, body)
      .map(res => res.data);

    request.subscribe(res => {
      //console.log(res, "res");
      if (res.status === 200) {
        this.globals.showModal(`Staff Created Successfully`);
      }
    });
  }

  ngOnInit() {
    this.initForm();

    const request = this.apiService
      .postData(`/getAllFactories`, {})
      .map(res => res.data);

    request.subscribe(res => {
      console.log(res);
      this.factories = res.results;
    });
  }

  initForm() {
    this.staffForm = this.formBuilder.group({
      MobileNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      ],
      FirstName: ["", [Validators.required]],
      MiddleName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      national_id: [
        "",
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      NationalID: [
        "",
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      Password: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ],
      Email: ["", [Validators.required, Validators.email]],
      Occupation: ["", [Validators.required]],
      City: ["", []],
      Governorate: ["", []],
      Building: ["", []],
      FactoryID: ["", Validators.required]
    });

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
      },
      FactoryID: {
        required: "This Field is required"
      }
    };
  }

  reset() {
    this.validationErrors = null;
    this.mobileNotFound = null;
    this.initForm();
  }

  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
