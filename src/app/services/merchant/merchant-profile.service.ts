import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from '../api-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MerchantProfileService {
    listPermissionUrl: string = '/merchantProfiles/permission/list';
    addProfile: string = '/merchantProfiles/create';
    exportUrl = '/bulk/export';

    constructor(private http: Http, private localStorage: LocalStorageService, private api: ApiService) {
    }

    getPermissions() {
        return this.api.postData(this.listPermissionUrl, {}, 'application/json', true).map((res) => {
            return { status: res.status, data: res.data };
        });
    }
    submit(name, arrayOfActions) {
        console.log(arrayOfActions);
        return this.api.postData(this.addProfile, { name: name, actions: arrayOfActions }, 'application/json', true).map((res) => {
            return { status: res.status, data: res.data };
        });
    }

}