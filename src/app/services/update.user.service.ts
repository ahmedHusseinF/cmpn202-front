import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from './api-service';

@Injectable()
export class UpdateService {
  subUrl: string = '/userreportEdit';
  constructor(
    private http: Http,
    private storage: LocalStorageService,
    private api: ApiService
  ) {}

  updateUser(user) {
    console.log(user);
    return this.api.postData(this.subUrl, user).map(res => {
      return { status: res.status, data: res.data };
    });
  }
}
