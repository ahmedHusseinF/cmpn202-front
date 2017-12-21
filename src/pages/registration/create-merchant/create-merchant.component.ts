import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../../app/services/api-service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { SearchService } from '../../../app/services/search-service';
declare var $: any;

import { FormsModule } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { MerchantService } from '../../../app/services/merchant.service';
import { ProfileService } from '../../../app/services/profile.service';
import { GlobalVariablesService } from '../../../app/services/global-variables.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.css'],
  providers: [ProfileService]
})
export class CreateMerchantComponent implements OnInit {
  createMerchantForm: FormGroup;
  @ViewChild('img') img;
  createUrl: any = '/merchants/create';
  searchMobileUrl: any = '/wallet_users/searchByPhone';
  getProfilesUrl: any = '/merchants/listProfile';
  createmerchantSubscribe: any;
  searchMobileSubscribe: any;
  getProfilesSubscribe: any;
  message: string;
  validationErrors: any;
  profiles: any;
  mobileNotFound: any;
  nationalId: string;
  merchantProfiles: any;
  public merchantForm: FormGroup;

  constructor(
    private title: Title,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private service: MerchantService,
    private apiService: ApiService,
    private profileService: ProfileService,
    private globals: GlobalVariablesService,
    private searchService: SearchService,
    private router: Router
  ) {
    this.title.setTitle('Create Merchant');
  }
  search(mobile) {
    this.mobileNotFound = null;
    this.validationErrors = null;
    this.globals.unSubscribe(this.searchService
      .checkIfRegistered(mobile)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.mobileNotFound = !res.data.mobileFound;
        } else if (res.status == 300) {
          this.validationErrors = res.data.validationErrors;
        } else {
          this.globals.showModal(res.data.message);
        }
        //this.toasterService.pop('success', 'Args Title', 'Args Body');
      }));
  }
  create(merchant: any) {
    this.message = null;
    this.validationErrors = null;
    merchant.type = 'merchant';
    console.log(merchant)
    this.globals.unSubscribe(this.apiService
      .postData(this.createUrl, merchant)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.reset();
          this.globals.showModal(
            'Merchant created with code ' + res.data.merchantCode
          );
          window.scrollTo(0, 0);
        } else if (res.status == 300) {
          this.validationErrors = res.data.validationErrors;
        } else {
          this.globals.showModal(res.data.message);
        }
      }));
  }

  ngOnInit() {
    this.initForm();
    this.globals.unSubscribe(this.profileService
      .listProfile('Merchant')
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.profiles = res.data.profiles;
          this.merchantProfiles = res.data.merchantProfiles;
          if (this.merchantProfiles.length === 0) {
            this.globals.showModal("please add one profile at least to create child merchant");
            this.router.navigateByUrl('/dashboard/merchant/profile/create');
          }
        }
      }));
  }
  uploadImage(event) {
    let file: File = event.target.files[0];
    if (file && (file.type.split('/')[0] !== 'image')) {
      this.img.nativeElement.value = null;
      return this.globals.showModal('You can only upload images', 'danger')
    }
    this.createMerchantForm.controls['imageExt'].setValue(file.type.split('/')[1]);

    let myReader: FileReader = new FileReader();
    myReader.onload = readerEvt => {
      const binaryString = myReader.result;
      this.createMerchantForm.controls['merchantImage'].setValue(btoa(binaryString));
    };
    myReader.readAsBinaryString(file);

  }
  initForm() {
    this.createMerchantForm = this.formBuilder.group({
      // here
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      national_id: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      mobile_number: ['', Validators.required],
      profile_id: ['', Validators.required],
      email: [''],
      can_register: [false],
      can_perform_kyc: [false],
      parent: ['', Validators.required],
      balance_type: [''],
      merchant_parent_code: [''],
      birthdate: [''],
      gender: [''],
      marital_status: [''],
      phone: [''],
      license_type: ['', [<any>Validators.required]],
      license_value: ['', [<any>Validators.required]],
      occupation: [''],
      merchant_profile_id: [''],
    });
  }
  reset() {
    this.validationErrors = null;
    this.mobileNotFound = null;
    this.initForm();
  }

  public birth() {
    this.createMerchantForm.patchValue({
      birthdate: this.generateBirthDateFromNationalID(this.nationalId)
    })
  }

  generateBirthDateFromNationalID(id) {
    return id.slice(5, 7) + '-' + id.slice(3, 5) + '-' + id.slice(1, 3);
  }
  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
