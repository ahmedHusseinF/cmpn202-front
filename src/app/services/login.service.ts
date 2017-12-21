import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
import { ApiService } from './api-service';
import { GlobalVariablesService } from './global-variables.service';

@Injectable()
export class LoginService {
  subUrl: string = '/login';
  baseUrl: string;

  constructor(private http: Http, private api: ApiService,
    private globals:GlobalVariablesService) {
    this.baseUrl = api.subUrl2 + this.subUrl;

  }

  userLogin(user) {

    return this.api.postData(this.subUrl, user, 'application/json', true).map((res) => {
      localStorage.setItem('token', res.data['token']);
      localStorage.setItem('username', res.data['username']);
      localStorage.setItem('logoUrl', res.data['logoUrl']);
      this.globals.update('walletId',res.data['walletId'])
      this.globals.update('current_balance',res.data['current_balance']);
     console.log(res)
      return { status: res.status, data: res.data };

    });
  }
}

