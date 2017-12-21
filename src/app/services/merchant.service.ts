import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MerchantService {
  subUrl: string = '/create-merchant';

  constructor(private http: Http, private localStorage: LocalStorageService, private api: ApiService) {
  }

  merchant(user) {
    return this.api.postData(this.subUrl, user).map((res) => {
      return { status: res.status, data: res.data };
    });
  }

}