import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { FlashMessagesService } from "angular2-flash-messages";
import "rxjs/add/operator/map";
import { Router } from "@angular/router";

@Injectable()
export class ApiService {
  baseUrl: string;
  subUrl: string;
  subUrl2: string;
  subCommonUrl: string;
  public loading: number[];

  constructor(
    private http: Http,
    private flashMsg: FlashMessagesService,
    private router: Router
  ) {
    this.baseUrl = !/localhost/.test(document.location.host)
      ? "https://34.230.253.250"
      : "http://localhost:1337";

    this.subUrl = "/api/v1/web";
  }
  get token() {
    return localStorage.getItem("token");
  }

  postData(
    subUrl: string,
    data: any,
    contentType = "application/json",
    withToken = true
  ): Observable<any> {
    this.loading = [1];
    let headers = new Headers({ "Content-Type": contentType });

    if (withToken) headers.append("Authorization", `JWT ${this.token}`);

    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify(data);

    return this.http
      .post(this.baseUrl + this.subUrl + subUrl, body, options)
      .map(res => {
        this.loading = [];
        return { status: res.status, data: res.json() };
      })
      .catch(err => {
        return Observable.create(observer => {
          observer.next(err);
          observer.complete();
        }).map(err => {
          this.loading = [];
          if (
            err.status == 401 ||
            err.status == 403 ||
            err.status == 404 ||
            err.status == 0
          )
            return this[`handle${err.status}Status`]();

          if ((err.status < 400 || err.status > 404) && err.status != 300)
            return this.handleStatus(JSON.parse(err._body));

          return { status: err.status, data: JSON.parse(err._body) };
        });
      });
  }

  handle401Status() {
    this.router.navigateByUrl("/logout");
  }

  //500 and weird status codes
  handleStatus(data) {
    let message;
    data.message
      ? (message = data.message)
      : (message = "Something went wrong please try again later");

    this.showFlash(message, "info");
  }

  showFlash(msg, type, timeout = 4) {
    //type cane be 'danger' , 'warning', 'info' , 'success'
    let css = "alert-" + type;
    this.flashMsg.show(msg, { cssClass: css, timeout: timeout * 1000 });
  }
}
