import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  ListUrl: string = '/profile/list';
  currentUser: string = '/profile/currentMerchant';
  updateProfile: string = '/profile/currentMerchantUpdate';
  updatePin: string = '/profile/currentMerchantUpdatePin';

  constructor(
    private http: Http,
    private localStorage: LocalStorageService,
    private api: ApiService
  ) {}

  listProfile(type) {
    return this.api.postData(this.ListUrl, { type: type }).map(res => {
      return { status: res.status, data: res.data };
    });
  }

  getCurrentMerchantProfile() {
    return this.api
      .postData(this.currentUser, {}, 'application/json', true)
      .map(res => {
        return { status: res.status, data: res.data };
      });
  }

  updateCurrentProfile(body: any) {
    return this.api
      .postData(this.updateProfile, body, 'application/json', true)
      .map(res => {
        return { status: res.status, data: res.data };
      });
  }

  updateCurrentProfilePin(body: any) {
    return this.api
      .postData(this.updatePin, body, 'application/json', true)
      .map(res => {
        return { status: res.status, data: res.data };
      });
  }
}
