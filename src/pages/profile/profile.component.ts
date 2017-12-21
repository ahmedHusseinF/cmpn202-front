import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ProfileService } from '../../app/services/profile.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";
import { GlobalVariablesService } from '../../app/services/global-variables.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  Profile: FormGroup;
  errorMsg = null;
  successMsg = null;
  pinErrorMsg = null;
  pinSuccessMsg = null;
  public profileForm: FormGroup;
  profile: any = {}
  Pin: any = {}
  constructor(private title: Title, private service: ProfileService, private globals: GlobalVariablesService,
    private localStorage: LocalStorageService, private formbuilder: FormBuilder, private router: Router) {
    this.title.setTitle("profile");
  }


  getProfile(): any {
    this.globals.unSubscribe(this.service.getCurrentMerchantProfile().subscribe((res => {
      if (res.status == 200)
        this.profile = res.data.message;
      else this.errorMsg = "Something went wrong";
    })))
  }

  updateProfile() {
    console.log(this.profile)
    this.successMsg = '';
    this.errorMsg = '';
    this.globals.unSubscribe(this.service.updateCurrentProfile(this.profile).subscribe((res => {
      if (res.status != 200)
      { this.errorMsg = res.data.message; return; }
      this.profile = res.data.message;
      this.successMsg = 'Profile updated successfully'
    })));
  }
  updateProfilePin() {
    console.log(this.Pin)
    this.pinSuccessMsg = '';
    this.pinErrorMsg = '';
    this.globals.unSubscribe(this.service.updateCurrentProfilePin(this.Pin).subscribe((res => {
      if (res.status != 200)
      { this.pinErrorMsg = res.data.message; return; }
      this.profile = res.data.message;
      this.pinSuccessMsg = 'Pin updated successfully'
    })));
  }



  ngOnInit() {
    // this.profile.Fname = "";
    // this.profile.Lname = "";
    // this.profile.Mname = "";
    // this.profile.mail = "";
    // this.profile.number = "";
    // this.profile.address = "";
    // this.profile.code = "";
    this.getProfile();
  }
  ngOnDestroy() {
    this.globals.unSubscribe(null);
  }


}
