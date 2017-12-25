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
  selector: "create-machine",
  templateUrl: "./create-machine.component.html",
  styleUrls: ["./create-machine.component.css"]
})
export class CreateMachineComponent implements OnInit {
  public machineForm: FormGroup;
  validationMesseges: any;
  validationErrors: any;
  factories: any;
  message: any;

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
      ManufDuration: ["", []],
      AssembledOn: ["", []],
      AssembledBy: ["", [Validators.required]],
      MachType: ["", [Validators.required]],
      MachAvailability: ["", [Validators.required]],
      MachPrice: ["", [Validators.required]],
      MachProductivity: ["", [Validators.required]],
      MachWeight: ["", [Validators.required]],
      MachSize: ["", [Validators.required]],
      MachName: ["", [Validators.required]],
      FactoryID: ["", [Validators.required]]
    };

    this.validationMesseges = {
      FactoryID: {
        required: "This Field is required"
      },
      MachName: {
        required: "This Field is required"
      },
      MachSize: {
        required: "This Field is required"
      },
      MachWeight: {
        required: "This Field is required"
      },
      MachProductivity: {
        required: "This Field is required"
      },
      MachPrice: {
        required: "This Field is required"
      },
      MachAvailability: {
        required: "This Field is required"
      },
      MachType: {
        required: "This Field is required"
      },
      AssembledBy: {
        required: "This Field is required"
      },
      AssembledOn: {
        required: "This Field is required"
      },
      ManufDuration: {
        required: "This Field is required"
      }
    };

    this.machineForm = this.formbuilder.group(formvalidation);
  }

  ngOnInit() {
    this.initForm();
    const request = this.api
      .postData(`/getAllFactories`, {})
      .map(res => res.data);

    const sub = request.subscribe(res => {
      console.log(res);
      this.factories = res.results;
      sub.unsubscribe();
    });
    this.globals.unSubscribe();
  }

  create(body: any, valid: boolean, form: FormGroup) {
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
      .postData(`/machine/create`, body)
      .map(res => res.data);

    request.subscribe(res => {
      //console.log(res, "res");
      if (res.status === 200) {
        this.globals
          .showModal(`Customer Created Successfully`)
          .subscribe(() => {
            console.log(`went in`);
          });
        setTimeout(document.location.reload, 1000); // refresh after 1 second
      }
      this.globals.showModal(`Something went wrong`).subscribe(() => {
        console.log(`went in`);
      });
    });
  }

  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
