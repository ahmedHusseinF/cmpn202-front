import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class dashBoardService {
  subUrl: string = '/dashBoard';

  constructor(private http: Http, private api: ApiService) {
  }

  dashBoard() {
    return this.api.postData(this.subUrl, {}, 'application/json', true).map((res) => {
      return { status: res.status, data: res.data };
    });
  }


}